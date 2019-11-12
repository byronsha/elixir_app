defmodule MyCoolAppWeb.Schema.FriendRequestSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  alias MyCoolApp.Repo
  alias MyCoolApp.Accounts.User

  @desc "A friend request"
  object :friend_request do
    field :entity_id, :string
    field :message, :string
    field :sender, :user do
      resolve(&Resolvers.FriendRequestResolver.sender/3)
    end
    field :recipient, :user do
      resolve(&Resolvers.FriendRequestResolver.recipient/3)
    end
    field :accepted_at, :string
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

    field :accept_friend_request, :friend_request do
      arg(:entity_id, non_null(:string))

      resolve(&Resolvers.FriendRequestResolver.accept_friend_request/3)
    end
  end

  object :friend_request_subscriptions do
    field :friend_request_sent, :friend_request do
      arg(:email, non_null(:string))

      config(fn args, _ ->
        {:ok, topic: args.email}  
      end)

      trigger(:send_friend_request,
        topic: fn friend_request ->
          recipient = Repo.get!(User, friend_request.user_id_2)
          recipient.email
        end
      )
    end

    field :friend_request_accepted, :friend_request do
      arg(:entity_id, non_null(:string))

      config(fn args, _ ->
        {:ok, topic: args.entity_id}  
      end)

      trigger(:accept_friend_request,
        topic: fn friend_request ->
          sender = Repo.get!(User, friend_request.user_id_1)
          sender.entity_id
        end
      )
    end
  end
end