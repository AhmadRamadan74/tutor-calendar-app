# 📋 Tutor Calendar System – AI-Powered Availability Management

An intelligent calendar management system that allows tutors to define their **weekly availability using natural language**.  
Instead of manually selecting days and times, tutors simply describe their schedule in plain English, and the system automatically converts it into a structured weekly calendar using AI.

🔗 **Live Demo:** [Add Live Demo Link Here]

⏱ **Time to Complete:** ~10 hours (6 hours development + 4 hours testing)

---

## ✨ Key Features

### 1️⃣ Natural Language Processing
- Write availability in plain English  
  > _"I am available between noon and 4pm on weekends, after 7 pm to midnight on Monday and Wednesday, and after 9pm otherwise"_
- AI-powered parsing using **Google Gemini API**
- Intelligent time conversion:
  - `noon`, `midnight`
  - `AM / PM`
  - Converted to **24-hour format**

📚 Google Gemini API Documentation:  
https://ai.google.dev/docs

---

### 2️⃣ Three-Step Workflow

1. **Input** – Enter availability description  
2. **Preview** – Review parsed time slots before saving  
3. **View** – Visual weekly calendar display  

---

### 3️⃣ Complete CRUD Operations
- ✅ Create new calendars
- 📖 Read / view saved calendars
- ✏️ Update existing schedules
- 🗑 Delete calendars with confirmation

---

### 4️⃣ Modern UI / UX
- Responsive design (mobile, tablet, desktop)
- Day-specific color coding
- Loading states & error handling
- Toast notifications for user feedback
- Background image with overlay

📚 React Toastify Docs:  
https://fkhadra.github.io/react-toastify/introduction

---

## 🛠️ Technologies Used

### Backend
- **Node.js** – JavaScript runtime  
  https://nodejs.org/en/docs
- **Express.js** – RESTful API framework  
  https://expressjs.com/
- **MongoDB Atlas** – Cloud NoSQL database  
  https://www.mongodb.com/atlas
- **Mongoose** – MongoDB ODM  
  https://mongoosejs.com/docs/
- **Google Generative AI (Gemini)** – NLP parsing  
  https://ai.google.dev/
- **dotenv** – Environment variable management  
  https://www.npmjs.com/package/dotenv
- **CORS** – Cross-origin resource sharing  
  https://www.npmjs.com/package/cors

---

### Frontend
- **React 18** – UI library with Hooks  
  https://react.dev/
- **Vite** – Fast build tool & dev server  
  https://vitejs.dev/
- **Axios** – HTTP client  
  https://axios-http.com/docs/intro
- **Tailwind CSS** – Utility-first CSS framework  
  https://tailwindcss.com/docs
- **react-toastify** – Toast notifications  
  https://fkhadra.github.io/react-toastify/

---

### Development Tools
- **VS Code** – Code editor  
  https://code.visualstudio.com/
- **Postman** – API testing  
  https://learning.postman.com/docs/
- **Git** – Version control  
  https://git-scm.com/doc
- **npm** – Package manager  
  https://docs.npmjs.com/

---

## 🏗️ System Architecture

┌─────────────────────────────────────────────────────────┐
│ Frontend (React) │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Calendar │→ │ Calendar │→ │ Calendar │ │
│ │ Input │ │ Preview │ │ View │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ │
└────────────────────────┬────────────────────────────────┘
│ HTTP / REST
↓
┌─────────────────────────────────────────────────────────┐
│ Backend (Express API) │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Routes (calendarRoutes.js) │ │
│ │ • POST /api/parse-availability │ │
│ │ • POST /api/calendar │ │
│ │ • GET /api/calendar │ │
│ │ • GET /api/calendar/:id │ │
│ │ • PUT /api/calendar/:id │ │
│ │ • DELETE /api/calendar/:id │ │
│ └──────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Models (Calendar.js) │ │
│ │ • availabilityDescription: String │ │
│ │ • timeSlots: [{ day, startTime, endTime }] │ │
│ └──────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────┘
↓
┌─────────────────────────────────────────────────────────┐
│ External Services │
│ ┌──────────────────┐ ┌──────────────────────────┐ │
│ │ Google Gemini AI │ │ MongoDB Atlas │ │
│ │ (NLP Parsing) │ │ Cloud Database │ │
│ └──────────────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────┘


---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/tutor-calendar-app.git
cd tutor-calendar-app


📖 Usage Guide
Step 1: Enter Availability

Open http://localhost:5173

Enter availability in natural language

Click Parse Availability

Step 2: Preview Schedule

Review parsed time slots

Days are color-coded

Click Edit or Confirm & Save

Step 3: View Calendar

Visual weekly calendar

Available days highlighted in green

Options:

Create new calendar

Delete calendar


🔌 API Endpoints

Base URL: http://localhost:5000/api

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | `/parse-availability` | Parse natural language |
| POST   | `/calendar`           | Create calendar        |
| GET    | `/calendar`           | Get all calendars      |
| GET    | `/calendar/:id`       | Get single calendar    |
| PUT    | `/calendar/:id`       | Update calendar        |
| DELETE | `/calendar/:id`       | Delete calendar        |




