# studybolg
勉強用ブログサイト。
https://powerful-mountain-68781.herokuapp.com

## Description
トップページにQiitaのリンが設定されているので、そこで勉強した事をブログにアップするサイト。

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



