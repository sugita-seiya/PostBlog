Rails.application.routes.draw do
  root to: "top#index"
  devise_for :users
  # namespace :posts do
  #   resources :searches, only: :index
  # end
  resources :posts do
    resources :comments, only: :create
    collection do
      get 'search'
    end
    namespace :api do
      resources :comments, only: :index, defaults: { format: 'json' }
    end
  end
  resources :users, only: :show
end
