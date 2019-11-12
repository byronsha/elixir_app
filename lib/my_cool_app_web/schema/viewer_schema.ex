defmodule MyCoolAppWeb.Schema.ViewerSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  @desc "The currently signed in user"
  object :viewer do
    field :entity_id, :string
    field :name, :string
    field :email, :string
    
    field :friends, list_of(:user) do
      resolve(&Resolvers.ViewerResolver.friends/3)
    end

    field :friend_requests, list_of(:friend_request) do
      resolve(&Resolvers.ViewerResolver.friend_requests/3)
    end

    field :sent_friend_requests, list_of(:friend_request) do
      resolve(&Resolvers.ViewerResolver.sent_friend_requests/3)
    end
  end

  object :viewer_queries do
    @desc "Viewer query"
    field :viewer, type: :viewer do
      resolve(&Resolvers.ViewerResolver.viewer/3)
    end
  end
end
