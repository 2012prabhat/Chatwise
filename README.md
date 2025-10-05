# 💬 Chatwise — AI Chatbot Integration Platform

Chatwise is a **customizable chatbot integration platform** built with **Next.js, MongoDB, and JWT Authentication**.  
It allows users to **generate secure API keys**, embed an interactive chatbot into any website, and manage integrations easily.

---

## 🚀 Features

- 🔐 **Secure Authentication** using JWT + HTTP-Only Cookies  
- 🔑 **API Key Management** (Generate, Revoke, Copy)  
- 💬 **Customizable Chatbot Widget**  
- 🌈 **Modern UI** with TailwindCSS  
- ⚡ **Streamed AI Responses** for smooth chatbot experience  
- 🧠 **Zustand-based Authentication Store** (Client-Side)  
- 🧩 **Integration Script** with one-click Copy feature  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14, TailwindCSS |
| Backend | Node.js, Express (Next API Routes) |
| Database | MongoDB + Mongoose |
| Authentication | JWT with HTTP-only cookies |
| State Management | Zustand |
| Styling | TailwindCSS + Custom Components |

---

## 🧰 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/2012prabhat/chatwise.git
cd chatwise

2️⃣ Install dependencies
pnpm install

3️⃣ Setup environment variables

Create a .env.local file in the root directory and add:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

4️⃣ Run the development server
pnpm dev


The app will be live at 👉 http://localhost:3000

🔑 API Key Management

Each authenticated user can generate multiple API keys.
These keys can be used to connect your custom chatbot widget to the Chatwise backend.

Generate New Key → Creates a new valid key

Copy Key → Easily copy the key for integration

Revoke Key → Disable a key instantly

💻 Integration Guide

After generating an API key, embed the chatbot into any website by adding this script before the closing <body> tag:

<script
  src="https://yourdomain.com/chatbot.js"
  data-api-key="YOUR_API_KEY"
></script>


This script will automatically:

Render a chatbot widget on your site

Connect it to your Chatwise backend

Authenticate using the provided API key

🧠 Authentication Flow

User logs in → JWT token is created

Token is stored in a secure HTTP-only cookie

API routes verify user via cookie using authCheck helper from lib/authCheck.js

Zustand is used to manage authentication state on the client

🧩 Folder Structure
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── register/route.js
│   │   ├── api-keys/route.js
│   ├── dashboard/
│   ├── integration/
│
├── components/
│   ├── Layout.js
│   ├── useAuthStore.js
│
├── lib/
│   ├── db.js
│   ├── authCheck.js
│
├── public/
│   ├── chatbot.js
│
├── models/
│   ├── User.js
│   ├── ApiKey.js
│
└── README.md

🌿 Environment Variables
Variable	Description
MONGODB_URI	MongoDB connection string
JWT_SECRET	Secret for signing JWT tokens
NEXT_PUBLIC_API_BASE_URL	Base API URL for client requests
🧑‍💻 Author

Prabhat Kumar
💼 MERN Stack Developer
🌐 Portfolio

📧 2012prabhat@gmail.com

🪪 License

This project is licensed under the MIT License — feel free to use and modify it.

⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.
Your support helps keep it maintained and growing!