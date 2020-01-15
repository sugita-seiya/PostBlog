Rails.application.routes.draw do
  devise_for :users
  root to: "posts#index"
  namespace :posts do
    resources :searches, only: :index
  end
  resources :posts, except: :index do
    resources :comments, only: :create
  end
  resources :users, only: :show
end
