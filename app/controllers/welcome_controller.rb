class WelcomeController < ApplicationController
  included WelcomeHelper

  def index
  end

  # rout when called makes a new user and attempts to add them to a game
  #  or tries to find a game for a waiting user
  # @param Ajax request indicating either a new user to create or find a waiting user a game
  # @return the game text and opponent id and server generated id and game id or
  #  if no game ready -1 game id and the new user id
  def join_game

    respond_to do |format|

      if params[:first_try] == 'true'
        new_id = Players.add_user(params[:name])
      elsif params[:me] == '-2'
        new_id = Players.add_user("-2")
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

  # Takes in user information and gets information about the
  #   current game including: other player position and if they have won or not
  #   also adds current user win status to the db
  #
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

  # Determines if all users are ready to play
  def ready
    respond_to do |format|
      player = params[:my_id]
      unless player.nil?
        format.json{ render :json => {ready:WelcomeHelper.is_ready(player)} }
      end
    end
  end

end
