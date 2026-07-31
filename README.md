# 🧠 It's Okay To Not Be Okay

A Mental Health Support Web Application developed using the MERN Stack to help users monitor their emotional well-being, maintain mood history, visualize emotional trends, and locate nearby mental health resources.

---

## Features

- User Registration & Login (JWT Authentication)
- Mood Tracking
- Mood History
- Edit/Delete Mood Entries
- Mood Analytics Dashboard
- Interactive Charts
- Mental Health Awareness Page
- Nearby Mental Health Resource Finder
- Automatic fallback to verified database hospitals if Overpass API fails
- Responsive UI

---

## Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS
- Axios
- React Router
- GSAP
- Chart.js
- Leaflet

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Folder Structure

```
client/
    src/
    public/

server/
    config/
    controllers/
    middleware/
    models/
    routes/
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/AatiffaFarhana/mental-health-application.git
```

### Install Frontend

```bash
cd client
npm install
```

### Install Backend

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## Run Backend

```bash
cd server
npm run dev
```

---

## Run Frontend

```bash
cd client
npm run dev
```

---


## Future Improvements

- Appointment booking
- Emergency SOS
- AI chatbot
- Hospital ratings
- Therapist availability

---

## Author

**Aatiffa Farhana A**

B.E. Computer Science Engineering

Velammal College of Engineering and Technology