defmodule MyCoolAppWeb.Schema.FriendRequestSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  @desc "A friend request"
  object :friend_request do
    field :message, :string
    field :sender, :user do
      resolve(&Resolvers.FriendRequestResolver.sender/3)
    end
    field :created_at, :string do
      resolve(&Resolvers.FriendRequestResolver.created_at/3)
    end
  end

  object :friend_request_mutations do
    field :send_friend_request, :friend_request do
      arg(:email, non_null(:string))
      arg(:message, :string)

      resolve(&Resolvers.FriendRequestResolver.send_friend_request/3)
    end
  end

  object :friend_request_subscriptions do
    field :friend_request_sent, :friend_request do
      config(fn _, _ ->
        {:ok, topic: "friend_requests"}  
      end)

      trigger(:send_friend_request,
        topic: fn _ ->
          "friend_requests"
        end
      )
    end
  end
end