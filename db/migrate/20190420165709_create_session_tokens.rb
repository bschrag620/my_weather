class CreateSessionTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :session_tokens do |t|
      t.string :token
      t.integer :user_id

      t.timestamps
    end
  end
end
