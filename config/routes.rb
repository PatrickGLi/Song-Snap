Rails.application.routes.draw do
  root to: "static_pages#root"

  get '/callback', to: 'static_pages#callback'
  get '/signin', to: 'static_pages#signin'
end
