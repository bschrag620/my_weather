class CreateObservationSites < ActiveRecord::Migration[5.2]
  def change
    create_table :observation_sites do |t|
      t.string :code
      t.string :name
      t.string :observation_api
      t.float :lat
      t.float :lng
      t.timestamps
    end
  end
end
