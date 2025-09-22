# 🌍 PoliglotQuest – Learn Languages with AI & Gamification 🎮✨

Welcome to **PoliglotQuest**, an experimental web application designed to make learning languages more **fun, dynamic, and immersive**! 🚀
This project combines **modern web development** with **AI-powered exercises and chat simulations** to create an engaging learning experience. 💡

---

## ✨ Features

* 🔐 **User Authentication** – Register, login, and manage your account securely.
* 🗂️ **Course Management** – Users can select and switch between courses (English, Spanish, Japanese, Italian, etc.).
* 💬 **AI Chat Simulation** – Practice conversations with AI-powered characters.
* 📝 **Exercises & Feedback** – Dynamic exercises generated and corrected by AI.
* 🎮 **Gamification** – Motivation through interactive elements and progress tracking.
* 🌗 **Themes** – Light, dark, and future RPG/fantasy-inspired themes.

---

## 🛠️ Tech Stack

* ⚡ **Frontend**: [Astro](https://astro.build/) + [Svelte](https://svelte.dev/)
* 🎨 **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom RPG/fantasy color palette
* 🗄️ **Database**: MongoDB (with user & course collections)
* 🔑 **Auth**: JWT (JSON Web Tokens) for secure session handling
* ☁️ **Deployment**: Works with [Vercel](https://vercel.com/), [Railway](https://railway.app/), or [Render](https://render.com/)

---

## 📂 Project Structure

```
src/
 ├── components/       # Reusable Svelte components (Navbar, Sidebar, Modals...)
 ├── layouts/          # Base layouts with Navbar + Sidebar
 ├── pages/            # Astro pages + API routes
 │   ├── api/          # API endpoints (register, login, user course, etc.)
 ├── models/           # Database models (user, course)
 ├── lib/              # Database connection helpers
 └── styles/           # Tailwind + custom styles (buttons, inputs, themes)
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/linguaquest.git
cd linguaquest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a **`.env`** file:

```env
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=yourSuperSecretKey
```

### 4. Run MongoDB

Make sure you have MongoDB running locally:

```bash
mongod --dbpath ~/data/db
```

### 5. Start the dev server

```bash
npm run dev
```

---

## 🔐 API Endpoints

### 👤 Users

* `POST /api/register` → Register a new user
* `POST /api/login` → Authenticate and receive a JWT token

### 📘 Courses

* `GET /api/user/course` → Get the current user’s course
* `POST /api/course` → Add a new course for the logged-in user
* `PUT /api/user/course` → Update active course for a user

---

## 🎨 Theming

We support **multiple themes** (light, dark, fantasy-RPG style).
Custom Tailwind classes are used for:

* 🔘 Buttons (`btn-primary`, `btn-secondary`)
* ⌨️ Inputs & selects (`input-base`)
* 🎭 Backgrounds & text (`bg-bg-primary`, `text-text-primary`)

---

## 🧪 Future Roadmap

* 🤖 Full AI integration for exercises & dialogues
* 🏆 Gamification system (XP, badges, leaderboards)
* 📊 User progress dashboard
* 🌐 Multi-course support (Math, Writing, etc.)

---

## 💡 Inspiration

This project was created to demonstrate how **AI + gamification** can make language learning more **accessible, personalized, and fun**. 🌟

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a branch, and open a pull request. 🙌

---

## 📜 License

MIT License – free to use, modify, and share. 👐

---

Made with ❤️, ☕, and a touch of 🧙‍♂️ magic!
