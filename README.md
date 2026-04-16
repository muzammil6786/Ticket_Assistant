#  AI-Powered Support Ticket Assistant

A full-stack web application where users can submit support tickets and AI automatically categorizes them and suggests professional replies.

---
## 🔐 Admin Access

This application includes a simple admin layer for managing support tickets.

### 👤 Admin Credentials

```bash
Email: admin@gmail.com
Password: admin123
```

### 🧑‍💼 Admin Capabilities

Once logged in as admin, you can:

* View all submitted tickets (Dashboard)
* Open and inspect ticket details
* Edit / write custom responses to users
* Mark tickets as **RESOLVED** or reopen them
* Delete tickets

---

## 🚀 Features

### 🎫 Ticket Management

* Create support tickets with name, email, issue description
* Select category manually (Payment, Login, Bug, Other)
* View all tickets in a dashboard
* View detailed ticket information

### 🧠 AI Integration

* Automatically categorizes tickets
* Generates professional suggested replies
* Fallback logic if AI fails

### 📊 Dashboard

* View all tickets with:

  * Description
  * Category
  * Status (OPEN / RESOLVED)
  * Created time

### 🔍 Ticket Detail Page

* Full issue description
* Category badge
* AI-generated reply
* Edit AI reply
* Mark as resolved / reopen
* Delete ticket

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)

### Backend

* Node.js

### Database

* MongoDB (Mongoose)

### AI

* OpenAI API (or fallback logic)

---

## 📁 Project Structure

```
ai-ticket-assistant/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd ai-ticket-assistant
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
OPENAI_API_KEY=your_openai_api_key
```

Run server:

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

##  API Endpoints

### Create Ticket

```
POST /api/tickets
```

### Get All Tickets

```
GET /api/tickets
```

### Get Ticket by ID

```
GET /api/tickets/:id
```

### Update Status

```
POST /api/tickets/:id/status
```

### Update Reply

```
POST /api/tickets/:id/reply
```

### Delete Ticket

```
DELETE /api/tickets/:id
```

---

##  Sample Test Inputs

### Payment Issue

```
My payment failed but money got deducted
```

### Login Issue

```
I cannot login to my account
```

### Bug Issue

```
App crashes on clicking submit
```

---

## ✨ Features Implemented for Evaluation

* ✅ Full-stack working application
* ✅ AI-powered categorization
* ✅ Structured AI response
* ✅ Clean and responsive UI
* ✅ Error handling and validation
* ✅ Delete & update functionality

---

## 🌐 Deployment

Frontend: Vercel
Backend: Render 

---

## 👨‍💻 Author

**Muzammil Raza Khan**

---

### ⚠️ Note

* This is a **demo authentication system** using localStorage
* Do not use these credentials in production
* For real-world apps, implement secure authentication (JWT, OAuth, etc.)
