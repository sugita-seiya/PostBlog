# studybolg
勉強用ブログサイト。
https://powerful-mountain-68781.herokuapp.com

## Description
Qiitaのクローンサイトを作成。
いつもQiitaを使っていてトップページが最新の記事になっていて使いにくさを感じていたので、トップページを改良したアプリを作成。

## 苦労した点
コメント機能をajaxを用いて自動更新を行ったが、反映されませんでした。そこで原因を調べ尽くし、トライ&エラーを繰り返して反映させる事が出来ました。

## Features
- haml/SASS記法と、命名規則BEMを使ったマークアップ
- ユーザー登録フォーム
- 投稿機能
- 投稿機能の検索機能
- ajaxを使用したコメントの非同期処理
- ajaxを使用したコメントの自動更新
- RSpecを使った単体テスト

## Requirement
- Ruby 2.5.1
- Rails 5.2.4



## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :posts
- has_many :comments

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|content|text||
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :comments

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|post_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :post




