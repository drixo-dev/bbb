require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
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
connectDB().then(() => {
  // API Routes
  app.use('/api', apiRoutes);
  app.use('/api/admin', adminRoutes);

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
