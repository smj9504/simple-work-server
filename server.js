const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const customerRoutes = require('./routes/customerRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

// Routes
app.use('/api/customer', customerRoutes);
app.use('/api/project', projectRoutes);  

module.exports = app; // Export the app for use in index.js
