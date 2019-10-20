# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :my_cool_app,
  ecto_repos: [MyCoolApp.Repo]

# Configures the endpoint
config :my_cool_app, MyCoolAppWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "qjXdaE17sUSYxX6nvN/1/7uWJTp9df1I0MzMonq1+qz3KVNGYul68fzr5G35z6pG",
  render_errors: [view: MyCoolAppWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MyCoolApp.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

config :my_cool_app, MyCoolApp.Guardian,
  # optional
  allowed_algos: ["HS512"],
  # optional
  verify_module: Guardian.JWT,
  issuer: "MyCoolApp",
  ttl: {30, :days},
  allowed_drift: 2000,
  # optional
  verify_issuer: true,
  # generated using: JOSE.JWK.generate_key({:oct, 16}) |> JOSE.JWK.to_map |> elem(1)
  secret_key: %{"k" => "M05OUd3t6pcbfxum8igucQ", "kty" => "oct"},
  serializer: MyCoolApp.Guardian