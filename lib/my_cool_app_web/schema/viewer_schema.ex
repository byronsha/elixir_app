defmodule MyCoolAppWeb.Schema.ViewerSchema do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: MyCoolApp.Repo

  alias MyCoolAppWeb.Resolvers

  @desc "The currently signed in user"
  object :viewer do
    field :name, :string
    field :email, :string
  end

  object :viewer_queries do
    @desc "Viewer"
    field :viewer, type: :viewer do
      resolve(&Resolvers.ViewerResolver.viewer/3)
    end
  end
end
