const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const calendarRoutes = require('./routes/calendarRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', calendarRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Tutor Calendar API is running',
    endpoints: {
      parseAvailability: 'POST /api/parse-availability',
      createCalendar: 'POST /api/calendar',
      getAllCalendars: 'GET /api/calendar',
      getCalendar: 'GET /api/calendar/:id',
      updateCalendar: 'PUT /api/calendar/:id',
      deleteCalendar: 'DELETE /api/calendar/:id'
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});