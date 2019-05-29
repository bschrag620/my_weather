# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_24_114917) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "location_aliases", force: :cascade do |t|
    t.integer "location_id"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.float "lat"
    t.float "lng"
    t.string "forecast_api"
    t.string "hourly_forecast_api"
    t.string "station_list_api"
    t.integer "zip"
    t.string "city"
    t.string "state"
    t.string "preferred_observation_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "observation_site_locations", force: :cascade do |t|
    t.integer "observation_site_id"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "observation_sites", force: :cascade do |t|
    t.string "code"
    t.string "name"
    t.string "observation_api"
    t.float "lat"
    t.float "lng"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "session_tokens", force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_locations", force: :cascade do |t|
    t.integer "user_id"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.text "session_message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
