defmodule MyCoolAppWeb.Schema.ViewerSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  @desc "The currently signed in user"
  object :viewer do
    field :name, :string
    field :email, :string
    
    field :friend_requests, list_of(:friend_request) do
      resolve(&Resolvers.ViewerResolver.friend_requests/3)
    end
  end

  object :viewer_queries do
    @desc "Viewer query"
    field :viewer, type: :viewer do
      resolve(&Resolvers.ViewerResolver.viewer/3)
    end
  end
end
