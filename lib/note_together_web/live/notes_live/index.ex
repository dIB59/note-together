defmodule NoteTogetherWeb.NotesLive.Index do

  use NoteTogetherWeb, :live_view
  alias NoteTogether.Presence

  @topic "page:notes"

  @spec mount(any(), nil | maybe_improper_list() | map(), Phoenix.LiveView.Socket.t()) ::
          {:ok, any()}
  def mount(_params, session, socket) do
    # Subscribe to the PubSub topic "notes", only if mounting for the first time
     if connected?(socket) do
      # Track presence with a unique user ID or random UUID if anonymous
      Presence.track(self(), @topic, socket.id, %{})
      Phoenix.PubSub.subscribe(NoteTogether.PubSub, @topic)
    end

    {
      :ok,
      assign(socket,
        name: session["name"] || "guest",
        total_people: list_users(),
        num_clicks: 0
      )
    }

  end


  defp list_users() do
    # print the list of users in the console
    users = Presence.list(@topic)
    IO.inspect(users, label: "Users in the notes page")
    # Return the count of users
    Enum.count(users)
  end

  def handle_params(params, _, socket) do
    name = params["name"] || "guest"
    {:noreply, assign(socket, name: name)}
  end

  def handle_event("add", _, socket) do
    {:noreply, update(socket, :num_clicks, &(&1 + 1))}
  end

  # Handle incoming messages from the PubSub topic "notes"
  def handle_info({:new_note, note}, socket) do
    # Here you can handle the new note message, e.g., update the UI or log it
    socket = assign(socket, total_people: list_users())
    {:noreply, socket}
  end

  def handle_info(
    %Phoenix.Socket.Broadcast{
        event: "presence_diff",
        payload: %{joins: joins, leaves: leaves}
      },
      socket
    ) do
    IO.inspect(joins, label: "Joins")
    socket = assign(socket, latest_join: Map.keys(joins))
    IO.inspect(leaves, label: "Leaves")
    socket = assign(socket, latest_leave: Map.keys(leaves))

    {:noreply, assign(socket, total_people: list_users())}
  end

  def render(assigns) do
    ~H"""
    hi <%= @name %> <%= :erlang.pid_to_list(self()) %>
    <div>
      <h1>Welcome to Note Together!</h1>
      <p>Share your notes with others in real-time.</p>
      <p>Total people online: <%= @total_people %></p>
      <p>Use the link below to invite others:</p>
      <p>Share this link with your friends to collaborate on notes together.</p>
      <p>Happy note-taking!</p>
      <p>Click the button below to create a new note.</p>
      <button phx-click="add">Add to counter</button>
      <p>Number of clicks: <%= @num_clicks %></p>
    </div>
    """
  end

end
