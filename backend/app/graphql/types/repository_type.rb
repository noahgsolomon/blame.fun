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

    field :stars_count, Integer, null: false
    field :is_starred_by_me, Boolean, null: false
    field :stargazers, [Types::UserType], null: false
    
    field :search_files, [Types::GitTreeEntryDetailType], null: true do
      argument :query, String, required: true
    end

    field :user, Types::UserType, null: false

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

    def user
      object.user
    end

    def search_files(query:)
      return [] unless object.git_repository
      return [] if query.blank?

      entries = []
      begin
        commit = object.git_repository.rev_parse('main')
        tree = commit.tree

        # Recursively search through all files
        search_tree(tree, '', query.strip.downcase, entries)
      rescue => e
        Rails.logger.error "Failed to search files: #{e.message}"
        []
      end
      entries
    end

    def search_tree(tree, current_path, query, entries)
      tree.each_entry do |entry|
        entry_path = current_path.empty? ? entry[:name] : File.join(current_path, entry[:name])
        
        if entry[:type] == :tree
          subtree = object.git_repository.lookup(entry[:oid])
          search_tree(subtree, entry_path, query, entries)
        elsif entry[:name].downcase.include?(query) || entry_path.downcase.include?(query)
          # Get commit info for the file
          cmd = ["git", "--git-dir=#{object.git_path}", "log", "-1", "--format=%H", "--follow", "main", "--", entry_path]
          commit_sha = `#{cmd.join(' ')}`.strip
          
          if !commit_sha.empty?
            last_commit = object.git_repository.lookup(commit_sha)
            blob = object.git_repository.lookup(entry[:oid])
            
            entries << {
              size: blob.size,
              file: entry[:name],
              path: entry_path,
              type: entry[:type].to_s,
              msg: last_commit.message,
              name: last_commit.author[:name],
              date: last_commit.author[:time],
              oid: last_commit.oid[0..7]
            }
          end
        end
      end
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
        unless path.empty?
          Rails.logger.info "Traversing path: #{path}"
          path.split('/').each do |segment|
            entry = current_tree[segment]
            return [] unless entry
            current_tree = object.git_repository.lookup(entry[:oid])
          end
        end

        current_tree.each_entry do |entry|
          size = nil
          if entry[:type] == :blob
            blob = object.git_repository.lookup(entry[:oid])
            size = blob.size
          end

          entry_path = path.empty? ? entry[:name] : File.join(path, entry[:name])
          
          # Use git log with --follow to get the actual last commit for this file
          last_commit = nil
          cmd = ["git", "--git-dir=#{object.git_path}", "log", "-1", "--format=%H", "--follow", "#{ref}", "--", entry_path]
          commit_sha = `#{cmd.join(' ')}`.strip
          
          if !commit_sha.empty?
            last_commit = object.git_repository.lookup(commit_sha)
          end

          if last_commit
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
        end
      rescue => e
        Rails.logger.error "Failed to get tree entry details: #{e.message}"
        Rails.logger.error e.backtrace.join("\n")
        []
      end
      
      entries
    end

    def stars_count
      object.stars.count
    end
    
    def is_starred_by_me
      return false unless context[:current_user]
      object.starred_by?(context[:current_user])
    end
    
    def stargazers
      object.stargazers
    end

  end
end