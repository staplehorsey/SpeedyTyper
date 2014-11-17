module WelcomeHelper

  #gets all of the users in a specified game and their status
  def self.get_game_info(game_id)
    users = []
    Players.where(:game_id => game_id).each do |user|
      users.append({name:user[:player_id], g_id:user[:game_id], g_o:user[:game_outcome], p:user[:pos], i:user[:id]})
    end
  end

  def self.is_ready(game_id)
    to_ret = false
    if Players.where(:game_id => game_id).where(:awk => true).count == @game_size
      to_ret = true
    end
    return to_ret
  end

end
