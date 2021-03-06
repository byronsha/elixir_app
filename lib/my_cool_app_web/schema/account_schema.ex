defmodule MyCoolAppWeb.Schema.AccountSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  @desc "One user"
  object :user do
    field :entity_id, :string
    field :name, :string
    field :email, :string
  end

  @desc "Access token"
  object :token do
    field :access_token, :string
  end

  object :account_queries do
    @desc "Get all users"
    field :list_users, list_of(:user) do
      resolve(&Resolvers.AccountResolver.list_users/3)
    end

    field :find_user, :user do
      arg(:email, non_null(:string))

      resolve(&Resolvers.AccountResolver.find_user/3)
    end
  end

  object :account_mutations do
    field :create_user, :user do
      arg(:name, non_null(:string))
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.AccountResolver.create_user/3)
    end

    field :login, type: :token do
      arg(:email, non_null(:string))
      arg(:password, non_null(:string))

      resolve(&Resolvers.AccountResolver.login/2)
    end

    field :logout, type: :user do
      arg(:email, non_null(:string))

      resolve(&Resolvers.AccountResolver.logout/2)
    end
  end

  object :account_subscriptions do
    field :user_created, :user do
      config(fn _, _ ->
        {:ok, topic: "users"}
      end)

      trigger(:create_user,
        topic: fn _ ->
          "users"
        end
      )
    end
  end
end
