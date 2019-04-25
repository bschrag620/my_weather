class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.float :lat
      t.float :lng
      t.string :forecast_api
      t.string :hourly_forecast_api
      t.string :observation_api
      t.integer :zip
      t.string :city
      t.string :state

      t.timestamps
    end
  end
end
