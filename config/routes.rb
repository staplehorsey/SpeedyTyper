Rails.application.routes.draw do

  patch 'join_game', to:'welcome#join_game'

  patch 'do_update', to:'welcome#do_update'

  get 'get_status', to:'welcome#get_status'

  get 'ready', to:'welcome#ready'

  get 'static_pages', to: 'about'

  get 'user_profile', to: 'profile'

  root 'welcome#index'

end
