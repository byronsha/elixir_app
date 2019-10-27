defmodule MyCoolApp.Repo.Migrations.CreateFriendsTables do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

    create table(:friends) do
      add :user_id_1, references(:users)
      add :user_id_2, references(:users)

      timestamps()
    end

    create table(:friend_requests) do
      add(:entity_id, :uuid, default: fragment("uuid_generate_v4()"))      
      add :user_id_1, references(:users)
      add :user_id_2, references(:users)
      add :message, :text

      timestamps()
    end
  end
end
