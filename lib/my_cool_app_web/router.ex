defmodule MyCoolAppWeb.Router do
  use MyCoolAppWeb, :router

  pipeline :graphql do
   plug MyCoolApp.Context
  end

  scope "/api" do
    pipe_through(:graphql)

    forward("/graphiql", Absinthe.Plug.GraphiQL, schema: MyCoolAppWeb.Schema)
    forward("/", Absinthe.Plug, schema: MyCoolAppWeb.Schema)
  end
end