defmodule MyCoolAppWeb.Resolvers.ViewerResolver do
  def viewer(_parent, _args, %{context: %{current_user: current_user}}) do
    IO.inspect(current_user)
    {:ok, current_user}
  end

  def viewer(_parent, _args, _resolutions) do
    {:ok, nil}
  end
end