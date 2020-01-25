class Api::CommentsController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    post = Post.find(params[:post_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_comment_id = params[:id].to_i
    # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    @comments = post.comments.includes(:user).where('id > ?', last_comment_id)
  end
end


  # def index
  #   @post = Post.find(params[:post_id]) #今いるグループの情報をパラムスの値を元にDBから取得。
  #   @comments = @post.comments.where('id > ?', params[:last_id]) #グループが所有しているメッセージの中から、params[:last_id]よりも大きいidがないかMessageから検索して、@messagesに代入。
  # end




  # def index
  #   @comments = Comment.all
  #   # ここから追記
  #   respond_to do |format|
  #     format.html # html形式でアクセスがあった場合は特に何もなし(@messages = Message.allして終わり）
  #     format.json { @new_comment = Comment.where('id > ?', params[:comment][:id]) } # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する
  # end