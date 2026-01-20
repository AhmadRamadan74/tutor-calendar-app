const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Parse natural language to time slots using Gemini AI
router.post('/parse-availability', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Availability text is required'
      });
    }

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a calendar parser. Parse the following tutor availability description into a structured weekly calendar.

Availability description: "${text}"

Rules:
1. Return ONLY a valid JSON array of time slots
2. Each slot must have: day (Monday-Sunday), startTime (HH:MM in 24-hour format), endTime (HH:MM in 24-hour format)
3. Include ALL days mentioned in the description
4. Convert time descriptions correctly (noon=12:00, midnight=00:00, etc.)
5. NO explanations, NO markdown, ONLY the JSON array

Example output format:
[
  {"day": "Monday", "startTime": "19:00", "endTime": "23:00"},
  {"day": "Saturday", "startTime": "09:00", "endTime": "17:00"}
]

Now parse the availability description above and return ONLY the JSON array:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // Extract the JSON from Gemini's response
    let timeSlots;
    try {
      // Remove markdown code blocks if present
      let jsonText = responseText.trim();
      jsonText = jsonText.replace(/```json\n?/g, '');
      jsonText = jsonText.replace(/```\n?/g, '');
      jsonText = jsonText.trim();
      
      timeSlots = JSON.parse(jsonText);

      // Validate the parsed data
      if (!Array.isArray(timeSlots)) {
        throw new Error('Response is not an array');
      }

      // Validate each time slot
      const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      timeSlots.forEach(slot => {
        if (!slot.day || !slot.startTime || !slot.endTime) {
          throw new Error('Invalid time slot structure');
        }
        if (!validDays.includes(slot.day)) {
          throw new Error(`Invalid day: ${slot.day}`);
        }
      });

    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw AI response:', responseText);
      
      return res.status(500).json({
        success: false,
        error: 'Failed to parse AI response. Please try rephrasing your availability.',
        details: parseError.message
      });
    }

    res.status(200).json({
      success: true,
      data: {
        availabilityDescription: text,
        timeSlots: timeSlots
      }
    });

  } catch (error) {
    console.error('Parse availability error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to parse availability'
    });
  }
});

// Save calendar to database
router.post('/calendar', async (req, res) => {
  try {
    const { availabilityDescription, timeSlots } = req.body;

    if (!availabilityDescription || !timeSlots) {
      return res.status(400).json({
        success: false,
        error: 'Availability description and time slots are required'
      });
    }

    const calendar = new Calendar({
      availabilityDescription,
      timeSlots
    });

    await calendar.save();

    res.status(201).json({
      success: true,
      data: calendar
    });

  } catch (error) {
    console.error('Save calendar error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all calendars
router.get('/calendar', async (req, res) => {
  try {
    const calendars = await Calendar.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: calendars.length,
      data: calendars
    });

  } catch (error) {
    console.error('Get calendars error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get single calendar by ID
router.get('/calendar/:id', async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params.id);

    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendar not found'
      });
    }

    res.status(200).json({
      success: true,
      data: calendar
    });

  } catch (error) {
    console.error('Get calendar error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update calendar
router.put('/calendar/:id', async (req, res) => {
  try {
    const { availabilityDescription, timeSlots } = req.body;

    const calendar = await Calendar.findByIdAndUpdate(
      req.params.id,
      {
        availabilityDescription,
        timeSlots,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendar not found'
      });
    }

    res.status(200).json({
      success: true,
      data: calendar
    });

  } catch (error) {
    console.error('Update calendar error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete calendar
router.delete('/calendar/:id', async (req, res) => {
  try {
    const calendar = await Calendar.findByIdAndDelete(req.params.id);

    if (!calendar) {
      return res.status(404).json({
        success: false,
        error: 'Calendar not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Calendar deleted successfully'
    });

  } catch (error) {
    console.error('Delete calendar error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;