require("dotenv").config(); // 환경 변수 로드
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const projectRoutes = require("./routes/projectRoutes");
const { errorHandler } = require("./utils/errorHandler");
const { responseLogger } = require("./utils/responseHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // body-parser 대신 내장된 JSON 파서 사용
app.use(responseLogger); // 응답 로깅 미들웨어 추가

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use("/api/customer", customerRoutes);
app.use("/api/project", projectRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app; // Export the app for use in index.js
