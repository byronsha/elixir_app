defmodule MyCoolAppWeb.Schema.FriendRequestSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  @desc "A friend request"
  object :friend_request do
    field :entity_id, :string
    field :message, :string
  end

  object :friend_request_mutations do
    field :send_friend_request, :friend_request do
      arg(:email, non_null(:string))
      arg(:message, :string)

      resolve(&Resolvers.FriendRequestResolver.send_friend_request/3)
    end
  end
end