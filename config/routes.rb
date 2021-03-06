Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
   resources :users, only: [:index, :show, :create, :update]
   resource :session, only: [:create, :destroy]
   resources :tracks, only: [:index]
 end

 resources :users, only: [:show]

  namespace :soundcloud do
    get '/connected', to: 'sessions#connected'
    get '/signin', to: 'sessions#signin'
  end
end
