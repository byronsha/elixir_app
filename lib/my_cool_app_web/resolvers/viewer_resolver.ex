defmodule MyCoolAppWeb.Resolvers.ViewerResolver do
  alias MyCoolApp.Social

  def viewer(_parent, _args, %{context: %{current_user: current_user}}) do
    IO.inspect(current_user)
    {:ok, current_user}
  end

  def viewer(_parent, _args, _resolutions) do
    {:ok, nil}
  end

  def friend_requests(_parent, _args, %{context: %{current_user: current_user}}) do
    {:ok, Social.friend_requests_received_by_user_id(current_user.id)}
  end

  def sent_friend_requests(_parent, _args, %{context: %{current_user: current_user}}) do
    {:ok, Social.friend_requests_sent_by_user_id(current_user.id)}
  end

  def friends(_parent, _args, %{context: %{current_user: current_user}}) do
    {:ok, Social.friends_of_user_id(current_user.id)}
  end

  def friends(_parent, _args, _resolutions) do
    {:error, "Not Authorized"}    
  end
end