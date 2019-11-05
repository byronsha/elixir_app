defmodule MyCoolApp.Repo.Migrations.AddAcceptedAtToFriendRequests do
  use Ecto.Migration

  def change do
    alter table(:friend_requests) do
      add :accepted_at, :date
    end
  end
end
