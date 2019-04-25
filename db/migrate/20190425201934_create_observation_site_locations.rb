class CreateObservationSiteLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :observation_site_locations do |t|
      t.integer :observation_site_id
      t.integer :location_id
      t.timestamps
    end
  end
end
