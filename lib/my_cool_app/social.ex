defmodule MyCoolApp.Social do
  import Ecto.Query, warn: false
  alias MyCoolApp.Repo

  alias MyCoolApp.Accounts.User
  alias MyCoolApp.Social.FriendRequest

  def send_friend_request(attrs \\ %{}, current_user) do
    IO.inspect(attrs)
    IO.inspect(current_user)

    friend_to_add = Repo.get_by(User, email: String.downcase(attrs.user_entity_id))

    friend_request_attrs = %{user_id_1: current_user.id, user_id_2: friend_to_add.id, message: attrs.message}
    
    IO.inspect(friend_request_attrs)

    %FriendRequest{}
    |> FriendRequest.changeset(friend_request_attrs)
    |> Repo.insert()
  end
end