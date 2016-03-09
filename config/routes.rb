Rails.application.routes.draw do
  root to: "static_pages#root"

  get '/signin', to: 'static_pages#signin'
  get '/request_access_token', to: 'static_pages#request_access_token'

  namespace :api, defaults: {format: :json} do

  end
end
