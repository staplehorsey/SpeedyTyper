class WelcomeController < ApplicationController
  included WelcomeHelper

  def index
  end

  #adds a player to the database and attempts to find them
  #someone to play with if none are found they are still added
  #but their game id is set to -1 so they can keep trying
  def join_game

    respond_to do |format|

      if params[:first_try] == 'true'
        new_id = Players.add_user(params[:name])
      else
        new_id = params[:me]
      end

      Players.gen_game(new_id)
      game_id = Players.find_by_id(new_id)[:game_id]

      responce = {my_id:new_id,
                  g_id:game_id,
                  opposition:WelcomeHelper.get_game_info(game_id),
                  g_text:WelcomeHelper.get_game_text(game_id)}

      format.json{render :json => responce}

    end

  end

  def get_status

  end

  def do_update
    respond_to do |format|
      format.json{render :json => WelcomeHelper.get_update(
                             params[:my_id],
                             params[:game_id],
                             params[:my_won],
                             params[:my_pos]
                          )}
    end
  end

  def ready
    respond_to do |format|
      player = params[:my_id]
      unless player.nil?
        format.json{ render :json => {ready:WelcomeHelper.is_ready(player)} }
      end
    end
  end

end
