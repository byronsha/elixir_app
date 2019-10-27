defmodule MyCoolAppWeb.Schema do
  use Absinthe.Schema

  import_types(Absinthe.Type.Custom)
  import_types(MyCoolAppWeb.Schema.ViewerSchema)
  import_types(MyCoolAppWeb.Schema.AccountSchema)
  import_types(MyCoolAppWeb.Schema.FriendRequestSchema)

  query do
    import_fields(:viewer_queries)
    import_fields(:account_queries)
  end

  mutation do
    import_fields(:account_mutations)
    import_fields(:friend_request_mutations)
  end

  subscription do
    import_fields(:account_subscriptions)
  end
end