defmodule MyCoolApp.Repo.Migrations.AddEntityIdToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add(:entity_id, :uuid, default: fragment("uuid_generate_v4()"))      
    end
  end
end
