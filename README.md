# 🚀 ContentAI – GenAI Social Media Post Generator

ContentAI is a full-stack **Generative AI web application** that creates **copy-paste-ready social media captions** from **text and images**.  
The application uses **strict prompt engineering** to ensure AI outputs contain **only the final caption**, with no explanations, tips, or extra formatting.

Built for modern creators, developers, and marketers, ContentAI supports platform-specific caption generation with secure authentication and persistent user history.

---

##  Features

-  **GenAI Caption Generation** from text prompts
-  **Image-based caption generation** using multimodal AI models
-  **Strict prompt control** (output only final caption, no extra text)
-  **Firebase Authentication** (Email/Password)
-  Live post preview that visually simulates how the generated caption will appear inside the app
-  Save, view, and delete generated captions
-  Fully deployed full-stack application

---

## AI Capabilities

- Text-based social media caption generation
- Multimodal (text + image) caption generation
- Platform-specific tone control (Instagram, LinkedIn, Twitter/X)
- Gen-Z friendly, viral-ready outputs
- Prompt-engineered to return **ready-to-post content only**

---

## Tech Stack

### Frontend
- React.js
- Vite
- Firebase Authentication
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Generative AI (LLM + Vision models)
- REST APIs

### Deployment
- Frontend: **Vercel**
- Backend: **Render**

## Project Structure
gen-ai-post-generator/
├── client/
│ └── ai-content-generator/
│ ├── src/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── firebase.js
│ │ └── App.jsx
│ └── package.json
├── server/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── config/
│ └── index.js
└── README.md

## ⚙️ Environment Variables

### Frontend (`.env`)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_BACKEND_URL=


### Backend (`.env`)
OPENAI_API_KEY=
MONGODB_URI=
PORT=5000


---

## 🚀 How It Works

1. User signs up or logs in using Firebase Authentication
2. User enters a topic or uploads an image
3. Selects platform and tone
4. AI generates a clean, copy-paste-ready caption
5. **Caption is rendered instantly in a live preview component**
6. Caption is saved to the user’s account
7. User can view or delete previous generations

---

## Key Engineering Highlights

- Strict **system-level prompt constraints** to control AI output
- Multimodal prompt handling for image-based generation
- Secure, user-isolated data storage
- Production-ready REST API design
- Cloud deployment with environment-based configuration

---

Live Post Preview

ContentAI includes a **real-time live preview system** that allows users to instantly see how the generated caption will appear inside the application UI.

- Updates dynamically as soon as AI generates the caption
- Mimics real in-app post layout for better visual feedback
- Improves usability by reducing trial-and-error before posting
- Bridges the gap between AI output and real-world presentation

This feature enhances user experience by combining **Generative AI with interactive frontend rendering**.

---

## Live Demo

- Frontend: https://content-ai-lemon.vercel.app/ 
- Backend: https://contentai-wdgx.onrender.com/

---

## License

This project is intended for educational and portfolio purposes.

---

## Author

**Vedansh Pratap Singh**  
GitHub: https://github.com/vednashday  
LinkedIn: https://linkedin.com/in/vednashday
