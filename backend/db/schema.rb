# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_10_23_225728) do
  create_table "environment_files", force: :cascade do |t|
    t.integer "environment_id", null: false
    t.string "filename"
    t.text "content"
    t.string "file_extension"
    t.integer "file_size"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["environment_id"], name: "index_environment_files_on_environment_id"
  end

  create_table "environment_user_joins", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "environment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["environment_id"], name: "index_environment_user_joins_on_environment_id"
    t.index ["user_id"], name: "index_environment_user_joins_on_user_id"
  end

  create_table "environments", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invites", force: :cascade do |t|
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "environment_id", null: false
    t.index ["environment_id"], name: "index_invites_on_environment_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.string "email", null: false
    t.string "password_digest"
    t.string "username", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "environment_files", "environments"
  add_foreign_key "environment_user_joins", "environments"
  add_foreign_key "environment_user_joins", "users"
  add_foreign_key "invites", "environments"
end
