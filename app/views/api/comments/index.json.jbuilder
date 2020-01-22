json.array! @comments do |comment|
  json.text  comment.text
  json.user_id  comment.user.id
  json.user_name  comment.user.nickname
  json.id comments.id
end





# if @new_comment.present? # @new_messageに中身があれば
#   json.array! @new_comment # 配列かつjson形式で@new_messageを返す
# end









