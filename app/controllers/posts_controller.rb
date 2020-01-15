class PostsController < ApplicationController

  def index
    @posts = Post.includes(:user).order("created_at desc")
  end

  def new
    @post = Post.new
  end

  def create
     @post = Post.create(post_params)
    if @post.save
      redirect_to root_path, notice: '投稿が送信されました'
    else
      render :new
    end
  end

  def show
    @post= Post.find(params[:id])
    @comment = Comment.new
    @comments = @post.comments.includes(:user)
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
    if post.save
      redirect_to root_path, notice: "投稿内容を更新しました"
    else
      render :edit
    end
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    redirect_to root_path
  end

  private
  def post_params
    params.require(:post).permit(:title, :content).merge(user_id: current_user.id)
  end
end
