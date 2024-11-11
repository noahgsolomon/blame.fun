module Types

  class RepositoryType < Types::BaseObject
    field :id, GraphQL::Types::ID, null: false
    field :name, String, null: true
    field :description, String, null: true
    field :slug, String, null: true
    field :git_url, String, null: false
    field :bare, Boolean, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :tree, [Types::GitTreeEntryType], null: true do
      argument :path, String, required: false, default_value: ""
      argument :ref, String, required: false, default_value: "main"
    end

    field :file_content, String, null: true do
        argument :path, String, required: true
        argument :ref, String, required: false, default_value: "main"
    end

    field :tree_entry_details, [Types::GitTreeEntryDetailType], null: true do
      argument :path, String, required: false, default_value: ""
      argument :ref, String, required: false, default_value: "main"
    end

    def tree(path: "", ref: "main")
      return [] unless object.git_repository

      entries = []
      begin
        # Get the commit object for the given ref
        commit = object.git_repository.rev_parse(ref)
        # Get the tree for the commit
        tree = commit.tree
        
        # If path is provided, traverse to that directory
        unless path.empty?
          path.split('/').each do |segment|
            tree = object.git_repository.lookup(tree[segment][:oid])
          end
        end

        # Iterate over each entry in the tree
        tree.each_entry do |entry|
          entries << {
            name: entry[:name],
            type: entry[:type].to_s,
            oid: entry[:oid],
            path: path.empty? ? entry[:name] : File.join(path, entry[:name])
          }
        end
      rescue => e
        Rails.logger.error "Failed to get tree: #{e.message}"
        []
      end
      
      entries
    end

    def file_content(path:, ref: "main")
      return nil unless object.git_repository

      begin
        commit = object.git_repository.rev_parse(ref)
        tree = commit.tree

        current_tree = tree
        path_parts = path.split('/')
        file_name = path_parts.pop

        path_parts.each do |part|

            entry = current_tree[part]
            return nil unless entry
            current_tree = object.git_repository.lookup(entry[:oid])
        end
        file_entry = current_tree[file_name]
        return nil unless file_entry

        blob = object.git_repository.lookup(file_entry[:oid])
        blob.content
      rescue => e
        Rails.logger.info "Failed to get file content: #{e.message}"
        nil
      end
    end

    def tree_entry_details(path: "", ref: "main")
      return [] unless object.git_repository
      Rails.logger.info "Starting tree_entry_details for path: #{path}, ref: #{ref}"

      entries = []
      begin
        commit = object.git_repository.rev_parse(ref)
        Rails.logger.info "Found commit: #{commit.oid[0..7]} - #{commit.message.split("\n").first}"
        tree = commit.tree

        # Handle the case where path points to a file
        if !path.empty?
          begin
            entry = tree.path(path)
            if entry[:type] == :blob
              Rails.logger.info "Path points to a file, returning empty array"
              return []
            end
          rescue Rugged::TreeError
            Rails.logger.info "Path not found, returning empty array"
            return []
          end
        end

        current_tree = tree
        # If path is provided, traverse to that directory
        unless path.empty?
          Rails.logger.info "Traversing path: #{path}"
          path.split('/').each do |segment|
            entry = current_tree[segment]
            return [] unless entry
            current_tree = object.git_repository.lookup(entry[:oid])
            Rails.logger.info "Traversed to #{segment}: #{entry[:oid][0..7]}"
          end
        end

        current_tree.each_entry do |entry|
          Rails.logger.info "Processing entry: #{entry[:name]} (#{entry[:type]})"
          
          size = nil
          if entry[:type] == :blob
            blob = object.git_repository.lookup(entry[:oid])
            size = blob.size
            Rails.logger.info "Blob size for #{entry[:name]}: #{size} bytes"
          end

          entry_path = path.empty? ? entry[:name] : File.join(path, entry[:name])
          Rails.logger.info "Looking for commits for path: #{entry_path}"
          
          # Initialize walker for each entry
          walker = Rugged::Walker.new(object.git_repository)
          walker.sorting(Rugged::SORT_DATE | Rugged::SORT_TOPO)
          walker.push(commit.oid)
          
          # Find last commit that modified this path
          last_commit = nil
          commit_count = 0
          walker.each do |c|
            commit_count += 1
            Rails.logger.debug "Checking commit #{c.oid[0..7]}: #{c.message.split("\n").first}"
            begin
              c.tree.path(entry_path)
              last_commit = c
              Rails.logger.info "Found last commit for #{entry_path}: #{c.oid[0..7]} - #{c.message.split("\n").first}"
              break
            rescue Rugged::TreeError
              next
            end
          end
          
          Rails.logger.info "Checked #{commit_count} commits for #{entry_path}"
          if last_commit.nil?
            Rails.logger.warn "No commit found for #{entry_path}"
          end

          Rails.logger.info "Last commit: #{last_commit.inspect}"

          entries << {
            size: size,
            file: entry[:name],
            path: entry_path,
            type: entry[:type].to_s,
            msg: last_commit.message,
            name: last_commit.author[:name],
            date: last_commit.author[:time],
            oid: last_commit.oid[0..7]
          }
        end
      rescue => e
        Rails.logger.error "Failed to get tree entry details: #{e.message}"
        Rails.logger.error e.backtrace.join("\n")
        []
      end
      
      Rails.logger.info "Completed tree_entry_details, found #{entries.length} entries"
      Rails.logger.info "Entries: #{entries}"
      entries
    end
  end
end