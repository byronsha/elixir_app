defmodule MyCoolApp.Repo.Migrations.ChangeAcceptedAtToDatetime do
  use Ecto.Migration

  def change do
    alter table(:friend_requests) do
      modify :accepted_at, :utc_datetime
    end
  end
end
