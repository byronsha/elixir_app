defmodule MyCoolApp.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias MyCoolApp.Accounts.User

  schema "users" do
    field :entity_id, :binary_id
    field :name, :string
    field :email, :string
    field(:password, :string, virtual: true)
    field(:password_digest, :string)
    field(:access_token, :string)

    timestamps()
  end
  
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email, :password])
    |> unique_constraint(:email, downcase: true)
    |> put_password_hash()
  end

  def store_token_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:access_token])
  end
  
  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_digest, Comeonin.Bcrypt.hashpwsalt(pass))

      _ ->
        changeset
    end
  end
end
