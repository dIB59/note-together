defmodule NoteTogether.Repo do
  use Ecto.Repo,
    otp_app: :note_together,
    adapter: Ecto.Adapters.Postgres
end
