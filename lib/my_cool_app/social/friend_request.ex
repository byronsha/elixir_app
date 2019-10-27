defmodule MyCoolApp.Social.FriendRequest do
  use Ecto.Schema
  import Ecto.Changeset

  schema "friend_requests" do
    field :entity_id, :string
    field :user_id_1, :integer
    field :user_id_2, :integer
    field :message, :string

    timestamps()
  end

  @doc false
  def changeset(friend_request, attrs) do
    friend_request
    |> cast(attrs, [:user_id_1, :user_id_2, :message])
    |> validate_required([:user_id_1, :user_id_2])
  end
end
