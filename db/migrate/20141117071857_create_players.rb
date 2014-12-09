class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string     :player_id
      t.integer    :pos
      t.integer    :game_id
      t.boolean    :game_outcome
      t.boolean    :awk
      t.timestamps
    end
  end
end
