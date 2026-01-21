Tutor Calendar System - AI-Powered Availability Management📋 Project OverviewAn intelligent calendar management system that allows tutors to set their weekly availability using natural language. Instead of manually selecting days and times from dropdowns, tutors can simply describe their schedule in plain English, and the system automatically converts it into a structured weekly calendar using AI.Demo: [Live Demo Link]
Time to Complete: 10 hours (6 hours development + 4 hours testing)✨ Key Features1. Natural Language Processing

Write availability in plain English: "I am available between noon and 4pm on weekends, after 7 pm to midnight on Monday and Wednesday, and after 9pm otherwise"
AI-powered parsing using Google Gemini API
Intelligent time format conversion (noon, midnight, AM/PM → 24-hour format)
2. Three-Step Workflow

Input - Enter availability description
Preview - Review parsed time slots before saving
View - Visual weekly calendar display
3. Complete CRUD Operations

Create new calendars
Read/view saved calendars
Update existing schedules
Delete calendars with confirmation
4. Modern UI/UX

Responsive design (mobile, tablet, desktop)
Day-specific color coding
Loading states and error handling
Toast notifications for user feedback
Background image with overlay
🛠️ Technologies UsedBackend

Node.js - Runtime environment
Express.js - Web framework for RESTful APIs
MongoDB - NoSQL database (Cloud: MongoDB Atlas)
Mongoose - ODM for MongoDB
Google Generative AI (Gemini) - Natural language processing
dotenv - Environment variable management
CORS - Cross-origin resource sharing
Frontend

React 18 - UI library with Hooks
Vite - Fast build tool and dev server
Axios - HTTP client for API calls
Tailwind CSS - Utility-first CSS framework
react-toastify - Toast notifications
Development Tools

VS Code - Code editor
Postman - API testing
Git - Version control
npm - Package manager

🏗️ Architecture
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Calendar    │→ │ Calendar    │→ │ Calendar    │    │
│  │ Input       │  │ Preview     │  │ View        │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/REST
                         ↓
┌─────────────────────────────────────────────────────────┐
│                 Backend (Express API)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Routes (calendarRoutes.js)                       │  │
│  │  • POST /api/parse-availability (AI parsing)     │  │
│  │  • POST /api/calendar (Create)                   │  │
│  │  • GET /api/calendar (Read all)                  │  │
│  │  • GET /api/calendar/:id (Read one)              │  │
│  │  • PUT /api/calendar/:id (Update)                │  │
│  │  • DELETE /api/calendar/:id (Delete)             │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Models (Calendar.js)                             │  │
│  │  • availabilityDescription: String               │  │
│  │  • timeSlots: [{ day, startTime, endTime }]      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────┐
│           External Services                              │
│  ┌──────────────────┐  ┌──────────────────────────┐    │
│  │ Google Gemini AI │  │ MongoDB Atlas            │    │
│  │ (NLP)            │  │ (Cloud Database)         │    │
│  └──────────────────┘  └──────────────────────────┘    │
└─────────────────────────────────────────────────────────┘


1. Clone Repository
git clone https://github.com/yourusername/tutor-calendar-app.git
cd tutor-calendar-app

2. Backend Setup
cd backend
npm install

# Create .env file
cat > .env << EOL
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
EOL

# Start backend
npm run dev

Backend runs on: http://localhost:5000
3. Frontend Setup
bashcd ../frontend
npm install

# Start frontend
npm run dev


📖 Usage
Step 1: Enter Availability

Open http://localhost:5173
Enter your availability in natural language
Example: "I am available between noon and 4pm on weekends, after 7 pm to midnight on Monday and Wednesday, and after 9pm otherwise"
Click "Parse Availability"

Step 2: Preview Schedule

Review the parsed time slots
Each day is color-coded for easy identification
Click "Edit" to go back or "Confirm & Save" to proceed

Step 3: View Calendar

See your weekly schedule in a visual calendar
Available days are highlighted in green
Click "Create New Calendar" to start over or "Delete Calendar" to remove


🔌 API Endpoints
Base URL: http://localhost:5000/api
MethodEndpointDescriptionRequest BodyResponsePOST/parse-availabilityParse natural language to time slots{ text: string }{ success: boolean, data: { availabilityDescription, timeSlots } }POST/calendarCreate new calendar{ availabilityDescription, timeSlots }{ success: boolean, data: calendar }GET/calendarGet all calendars-{ success: boolean, count: number, data: [calendars] }GET/calendar/:idGet single calendar-{ success: boolean, data: calendar }PUT/calendar/:idUpdate calendar{ availabilityDescription, timeSlots }{ success: boolean, data: calendar }DELETE/calendar/:idDelete calendar-{ success: boolean, message: string }



