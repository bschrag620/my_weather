class CreateLocationAliases < ActiveRecord::Migration[5.2]
  def change
    create_table :location_aliases do |t|
      t.integer :location_id
      t.string :city
      t.string :state
      t.integer :zip
      t.timestamps
    end
  end
end
