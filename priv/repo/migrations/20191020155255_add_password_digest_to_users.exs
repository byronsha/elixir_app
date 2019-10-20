defmodule MyCoolApp.Repo.Migrations.AddPasswordDigestToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :password_digest, :text
    end
  end
end
