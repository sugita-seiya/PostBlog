Rails.application.routes.draw do
  root to: "top#index"
  devise_for :users
  namespace :posts do
    resources :searches, only: :index
  end
  resources :posts do
    resources :comments, only: :create
  end
  resources :users, only: :show
end
