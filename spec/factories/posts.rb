FactoryBot.define do
  factory :post do
    title {"hello!"}
    content {"kookkoo!!!"}
    created_at { Faker::Time.between(from: DateTime.now - 2, to: DateTime.now) }
    user
  end
end