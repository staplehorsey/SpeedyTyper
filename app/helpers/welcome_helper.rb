module WelcomeHelper

  @game_size = 2

  #gets all of the users in a specified game and their status
  def self.get_game_info(game_id)
    users = []
    Players.where(:game_id => game_id).each do |user|
      users.append({name:user[:player_id], g_id:user[:game_id], g_o:user[:game_outcome], p:user[:pos], i:user[:id]})
    end
  end

  def self.get_update(id, game_id, win, pos)
    current_player = Players.find_by_id(id)
    current_player.game_outcome = win
    current_player.pos = pos
    current_player.save

    to_ret = nil
    Players.where(:game_id => game_id).where.not(:id => id).each {
      |p| to_ret = {op:p.id, pos:p.pos, win:p.game_outcome}
    }

    puts(to_ret[:pos])

    return to_ret
  end

  def self.is_ready(player)

    p = Players.find_by_id(player)
    game_Id = p.game_id
    p.awk = true
    p.save

    to_ret = false
    if Players.where(:game_id => game_Id ).where(:awk => true).count == @game_size
      to_ret = true
    end
    return to_ret
  end

  #only give games text so keep track of seed for text
  def self.get_game_text(seed)
    if seed != -1
      lines = File.open(Rails.public_path + 'Foo_text').readlines
      ngen = Random.new(seed)
      ngen.seed
      start_idx = ngen.rand(lines.length-5)
      game_raw = lines.slice(start_idx, start_idx+5)
      game_raw = game_raw.map {|element| element.strip}
      return game_raw.join(' ')
    end
  end

end
