require 'rails_helper'

describe PostsController, type: :controller do

  describe 'GET #new' do
    it "new.html.erbに遷移するか" do
      get :new
      expect(response).to render_template :new
    end
  end

  describe 'GET #edit' do
    it "インスタンス変数の値が期待したものになるか" do
      post = create(:post)
      get :edit, params:{ id: post }
      expect(assigns(:post)).to eq post
    end

    it "edit.html.erbに遷移するか" do
      post = create(:post)
      get :edit,params: { id: post }
      expect(response).to render_template :edit
    end
  end

  describe 'GET #index' do
    it "配列の読み込み of 降順にソート" do
      posts = create_list(:post, 3)
      get :index
      expect(assigns(:posts)).to match(posts.sort{ |a, b| b.created_at <=> a.created_at } )
    end

    it "index.html.erbに遷移するか" do
      get :index
      expect(response).to render_template: index
    end
  end
end

