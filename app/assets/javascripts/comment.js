$(function(){
  function buildHTML(comment){
    var html = `<p class="comment" data-comment-id="${comment.id}">
                  <strong>
                    <a href=/users/${comment.user_id}>${comment.user_name}</a>

                  </strong>
                  ${comment.text}
                </p>`
    return html;
  };

// 非同期通信
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.comments').append(html);
      $('.textbox').val('')
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('通信失敗しました');
    });
  })
  // / コメント機能の自動更新
  var reloadComments = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_comment_id = $('.comment:last').data("comment-id");
    var url = window.location.pathname;
    var post_id = url.match(/\d+/);
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: post_id+"/api/comments",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_comment_id}
    })
    .done(function(comments) {
      console.log("新規コメントなし");
      if (comments.length !== 0) {
        console.log("新規コメントあり");
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(comments, function(i, comment) {
          insertHTML += buildHTML(comment)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.comments').append(insertHTML);
        $('.comments').animate({ scrollTop: $('.comments')[0]});
        $(".textbox").val("");
      }
    })
    .fail(function() {
      console.log('自動更新に失敗しました。');
    });
  };
  if (document.location.href.match(/\/posts\/\d+/)) {
    setInterval(reloadComments, 7000);
  }
});