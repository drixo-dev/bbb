require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const volunteerRoutes = require('./routes/volunteer');

const app = express();

// Middleware
const frontendUrl = process.env.FRONTEND_URL || '';
const altFrontendUrl = frontendUrl.includes('www.') 
  ? frontendUrl.replace('www.', '') 
  : frontendUrl.replace('https://', 'https://www.');

app.use(cors({
  origin: [
    frontendUrl,
    altFrontendUrl,
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded screenshots statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', event: 'Band Baaja Baarat 2026', time: new Date() });
});

// Root route
app.get('/', (req, res) => {
  res.send('👑 Band Baaja Baarat 2026 API Server is Running Seamlessly!');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting Express
connectDB().then(async () => {
  // Clean up the accidental unique index on transactionId if it exists
  try {
    const Participant = require('./models/Participant');
    await Participant.collection.dropIndex('transactionId_1');
    console.log('✅ Cleaned up transactionId index.');
  } catch (e) {
    // Ignore if index doesn't exist
  }

  // API Routes
  app.use('/api', apiRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/volunteer', volunteerRoutes);

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File is too large. Maximum size is 10MB.' });
    }
    if (err.message && err.message.includes('file type')) {
      return res.status(400).json({ success: false, message: 'Invalid file type. Only JPG, PNG, and WEBP are allowed.' });
    }
    res.status(500).json({ success: false, message: 'An unexpected server error occurred.' });
  });

  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`👑 Band Baaja Baarat 2026 Backend Server Started`);
    console.log(`🚀 Running on: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
  });
}).catch(err => {
  console.error("Failed to connect to DB, server not started", err);
  process.exit(1);
});
