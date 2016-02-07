class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :url
      t.string :time
      t.string :poster
      t.boolean :watching

      t.timestamps null: false
    end
  end
end
