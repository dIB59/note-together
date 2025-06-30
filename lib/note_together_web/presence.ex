defmodule NoteTogether.Presence do
  use Phoenix.Presence,
    otp_app: :note_together,
    pubsub_server: NoteTogether.PubSub
end
