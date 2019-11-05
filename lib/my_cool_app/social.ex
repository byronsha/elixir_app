defmodule MyCoolApp.Social do
  import Ecto.Query, warn: false
  alias MyCoolApp.Repo

  alias MyCoolApp.Accounts.User
  alias MyCoolApp.Social.Friend
  alias MyCoolApp.Social.FriendRequest

  def send_friend_request(attrs \\ %{}, current_user) do
    friend_to_add = Repo.get_by(User, email: String.downcase(attrs.email))

    if friend_to_add do
      friend_request_attrs = %{user_id_1: current_user.id, user_id_2: friend_to_add.id, message: attrs.message}
      
      %FriendRequest{}
      |> FriendRequest.changeset(friend_request_attrs)
      |> Repo.insert()
    end
  end

  def accept_friend_request(attrs \\ %{}, current_user) do
    friend_request = Repo.get_by(FriendRequest, [entity_id: attrs.entity_id, user_id_2: current_user.id])
    friend_attrs = %{
      user_id_1: friend_request.user_id_1,
      user_id_2: friend_request.user_id_2
    }

    if friend_request do
      Repo.transaction fn ->
        friend_request
        |> FriendRequest.changeset(%{accepted_at: DateTime.utc_now})
        |> Repo.update()

        %Friend{}
        |> Friend.changeset(friend_attrs)
        |> Repo.insert()
      end

      {:ok, friend_request}
    end
  end

  def friend_requests_received_by_user_id(id) do
    Repo.all(
      from fr in FriendRequest,
      where: fr.user_id_2 == ^id and is_nil(fr.accepted_at)
    )
  end
end