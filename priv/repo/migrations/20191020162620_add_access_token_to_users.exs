defmodule MyCoolApp.Repo.Migrations.AddAccessTokenToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :access_token, :text
    end
  end
end
