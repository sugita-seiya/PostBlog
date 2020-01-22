$(function(){
  function buildHTML(comment){
    var html = `<p class="comment" data-id="${comment.id}">
                  <strong>
                    <a href=/users/${comment.user_id}>${comment.user_name}</a>
                    ：
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
    console.log(last_comment_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/comment",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_comment_id}
    })
    .done(function(comments) {
      if (comments.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(comments, function(i, comment) {
          insertHTML += buildHTML(comment)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.comments').append(insertHTML);
        $('.comments').animate({ scrollTop: $('.comments')[0]});
        $(".textbox")[0].reset();
        $(".form__submit").prop("disabled", false);
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






//  var reloadCommets = function () {
//     if (window.location.href.match(/\/posts\/\d+/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
//       var last_comment_id = $('.comment:last').data("comment-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
//       // var group_id = $(".group").data("group-id");

//       $.ajax({ //ajax通信で以下のことを行う
//         url: "api/comments", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
//         type: 'get', //メソッドを指定
//         dataType: 'json', //データはjson形式
//         data: {last_id: last_comment_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
//       })
//       .done(function (comments) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
//         var insertHTML = '';//追加するHTMLの入れ物を作る
//         comments.forEach(function (comment) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
//           insertHTML = buildHTML(comment); //メッセージが入ったHTMLを取得
//           $('.comments').append(insertHTML);//メッセージを追加
//         })
//         $('.comments').animate({scrollTop: $('.comments')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
//       })
//       .fail(function () {
//         alert('自動更新に失敗しました');//ダメだったらアラートを出す
//       });
//     }
//   };
//   setInterval(reloadCommets, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。















   // コメント 自動更新
//   $(function(){
//     $(function(){
//       setInterval(update, 7000);
//       //10000ミリ秒ごとにupdateという関数を実行する
//     });
//     function update(){ //この関数では以下のことを行う
//       if($('.comment')[0]){ //もし'messages'というクラスがあったら
//         var comment_id = $('.comment:last').data('id');//一番最後にある'messages'というクラスの'id'というデータ属性を取得し、'message_id'という変数に代入
//       } else { //ない場合は
//         var comment_id = 0 //0を代入
//       }
//     $.ajax({ //ajax通信で以下のことを行う
//       url: "api/comments", //urlは現在のページを指定
//       type: 'GET', //メソッドを指定
//       data: { //railsに引き渡すデータは
//         comment: { id: comment_id } //このような形(paramsの形をしています)で、'id'には'message_id'を入れる
//       },
//       dataType: 'json' //データはjson形式
//     })
//     //ここから追記
//     .always(function(data){ //通信したら、成功しようがしまいが受け取ったデータ（@new_message)を引数にとって以下のことを行う
//       $.each(data, function(i, data){ //'data'を'data'に代入してeachで回す
//         buildHTML(data); //buildMESSAGEを呼び出す
//       });
//     });
//   }});