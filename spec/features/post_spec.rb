require 'rails_helper'

feature 'post', type: :feature do
  let(:user) { create(:user) }

  scenario 'ユーザーがログインしてツイートを投稿出来るか' do
    # ログイン前には投稿ボタンがない
    visit posts_path
    expect(page).to have_no_content('新規投稿')

    #ログイン処理
    visit new_user_session_path
    fill_in 'user_email',with: user.email
    fill_in 'user_password',with: user.user_password
    find('input[name= "commit" ]').click
    expect(current_path).to eq posts_path
    expect(page).to have_content('新規投稿')

    # ツイートの投稿
    expect {
      click_link('投稿する')
      expect(current_path).to eq new_tweet_path
      fill_in 'title', with: 'フィーチャスペックのテスト'
      fill_in 'content', with: 'aaaaa'
      find('input[type="submit"]').click
    }.to change(Post, :count).by(1)
  end
end