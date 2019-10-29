defmodule MyCoolAppWeb.Resolvers.FriendRequestResolver do
  alias MyCoolApp.Social

  def send_friend_request(_parent, args, %{context: %{current_user: current_user}}) do
    args
    |> Social.send_friend_request(current_user)
    |> case do
      {:ok, friend_request} ->
        {:ok, friend_request}
      
      nil ->
        {:ok, nil}

      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def send_friend_request(_parent, _args, _resolutions) do
    {:error, "Not Authorized"}
  end

  defp extract_error_msg(changeset) do
    changeset.errors
    |> Enum.map(fn {field, {error, _details}} ->
      [
        field: field,
        message: String.capitalize(error)
      ]
    end)
  end
end