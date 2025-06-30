defmodule NoteTogetherWeb.NotesLive.Index do
  use NoteTogetherWeb, :live_view

  def mount(_params, session, socket) do
    # Subscribe to the PubSub topic "notes", only if mounting for the first time
    Phoenix.PubSub.subscribe(NoteTogether.PubSub, "notes")
    Phoenix.PubSub.broadcast(NoteTogether.PubSub, "notes", {:new_note, "Welcome to Note Together!"})
    {
      :ok,
      assign(socket,
        name: session["name"] || "guest",
        total_people: 1,
        num_clicks: 0
      )
    }

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
    total_people = socket.assigns.total_people + 1
    socket = assign(socket, total_people: total_people)
    {:noreply, socket}
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
