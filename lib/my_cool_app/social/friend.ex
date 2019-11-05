defmodule MyCoolApp.Social.Friend do
  use Ecto.Schema
  import Ecto.Changeset

  schema "friends" do
    field :user_id_1, :integer
    field :user_id_2, :integer

    timestamps()
  end

  @doc false
  def changeset(friend_request, attrs) do
    friend_request
    |> cast(attrs, [:user_id_1, :user_id_2])
    |> validate_required([:user_id_1, :user_id_2])
  end
end
