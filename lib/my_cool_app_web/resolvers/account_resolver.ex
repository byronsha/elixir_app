defmodule MyCoolAppWeb.Resolvers.AccountResolver do
  alias MyCoolApp.Accounts

  import MyCoolApp.AuthHelper

  def list_users(_parent, _args, %{context: %{current_user: current_user}}) do
    {:ok, Accounts.list_users()}
  end

  def list_users(_parent, _args, _resolutions) do
    {:error, "Not Authorized"}
  end

  def create_user(_parent, args, _resolutions) do
    args
    |> Accounts.create_user()
    |> case do
      {:ok, user} ->
        {:ok, user}

      {:error, changeset} ->
        {:error, extract_error_msg(changeset)}
    end
  end

  def login(%{email: email, password: password}, _info) do
    with {:ok, user} <- login_with_email_pass(email, password),
      {:ok, jwt, _} <- MyCoolApp.Guardian.encode_and_sign(user),
      {:ok, _ } <- MyCoolApp.Accounts.store_token(user, jwt) do
      {:ok, %{access_token: jwt}}
    end
  end

  def logout(_args,  %{context: %{current_user: current_user, access_token: _token}}) do
    MyCoolApp.Accounts.revoke_token(current_user, nil)
    {:ok, current_user}
  end

  defp extract_error_msg(changeset) do
    changeset.errors
    |> Enum.map(fn {field, {error, _details}} ->
      [
        field: field,
        message: String.capitalize(error)
      ]
    end)
  end
end