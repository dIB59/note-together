![image](https://github.com/user-attachments/assets/22da0bdb-ca46-4f59-a6e1-f79b4faa0277)

# Student Notes – Collaborative Note-Taking Platform

Student Notes is a collaborative note-taking app designed to help students capture, organize, and share their thoughts and study material in real time. It features a rich-text editor built with [TipTap](https://tiptap.dev/) and a clean, distraction-free interface, making it ideal for study groups, lectures, and class collaborations.

---

## Features

- 📝 **Rich Text Editing**: Create formatted notes with bold, italic, headings, lists, code blocks, and more using the easy-to-use WYSIWYG editor.
- 📄 **Pageless Layout**: A modern, pageless layout for an immersive note-taking experience.

---

### Frontend:
- **React** – A popular JavaScript library for building user interfaces.
- **TipTap** – A headless rich-text editor framework, providing flexible and customizable text editing capabilities.
- **Tailwind CSS** – A utility-first CSS framework for rapid UI development.
- **TanStack Router** – A modern, file-based routing solution for React.
- **TypeScript** – Type-safe JavaScript for better maintainability and developer experience.

### Backend:
- **Rust** – Systems programming language, used for building the backend API.
- **Actix** – A powerful, pragmatic web framework for Rust.
- **Yjs** – A framework for building collaborative applications, enabling real-time synchronization of content.
- **PostgreSQL** – A relational database management system for storing user data and notes.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Rust](https://www.rust-lang.org/) (latest stable version)
- [PostgreSQL](https://www.postgresql.org/) – Installed and running locally or remotely. Or Sqlite


### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-notes.git
cd student-notes
````

Thank you for the clarification! Here's the updated section for installing dependencies, now reflecting the Rust backend with SQLite:

---

### 2. Install Frontend Dependencies

Navigate to the frontend project directory and install the required dependencies using npm:

```bash
cd note-frontend
npm install
````

This will install all the necessary dependencies listed in the `package.json` file, including React, TipTap, Tailwind CSS, and other project-specific packages.

---

### 3. Install Backend Dependencies

Navigate to the backend project directory (Rust-based Actix server with SQLite):

```bash
cd note-backend
```

Install the backend dependencies using Cargo:

```bash
cargo build
```

This will fetch and compile the Rust dependencies and build the Actix server along with the SQLite configuration for data persistence.

---

### 4. Run the development server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

Here’s a brief overview of the main project files:

```bash
src/
├── backend/             # Rust-based Actix backend (Yjs, PostgreSQL)
│   ├── src/             # Actix server, API endpoints
│   └── Cargo.toml       # Backend dependencies and configuration
├── components/          # React components for the frontend
│   ├── editor/
│   ├── ui/
│   └── styles/
├── hooks/               # Custom React hooks (useEditorConfig)
├── routes/              # File-based routing for the app
└── styles              # TailwindCSS and custom styles
```

---

## 💡 Future Features

* 🔄 **Real-time Collaboration**: Implement real-time collaboration using WebSockets or Firebase for live note-sharing.
* 🧑‍🤝‍🧑 **User Authentication**: Add sign-up and login functionality to store user notes and preferences.
* 📚 **Notebook Organization**: Introduce features for organizing notes into notebooks, with support for tags and categories.
* 🧠 **AI-Powered Summarization**: Integrate AI tools to help users summarize or highlight key points in their notes.
* 👥 **Collaboration-Ready**: Although not yet implemented, the app is structured for future real-time multi-user collaboration.
* 🌙 **Dark Mode Support**: A theme-aware interface that supports both dark and light modes for comfortable reading.
* 🔄 **Extensible Architecture**: The platform is built to be easily extended with features like task lists, mentions, and more.

---

## 🛠 Contribution Guidelines

We welcome contributions! Here’s how you can help:

1. **Fork the repository** and clone your fork locally.
2. **Create a new branch** for your feature or bugfix.
3. **Make your changes** and ensure that the code passes linting and formatting checks.
4. **Submit a pull request** with a detailed explanation of your changes.

To run linting and tests before submitting a PR:

```bash
npm run lint
npm run test
```
---


