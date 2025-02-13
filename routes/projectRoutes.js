const express = require('express');
const { createProject, getProjectById } = require("../services/projectService");
const { sendResponse  } = require('../utils/responseHandler');

const router = express.Router();

/**
 * 프로젝트 생성 API
 */
router.post("/", async (req, res, next) => {
  try {
    console.log("Incoming request to /api/project");
    console.log("Request Body:", req.body);

    const savedProject = await createProject(req.body, req.originalUrl);
    sendResponse(res, 201, "Project created successfully", savedProject);
  } catch (error) {
    next(error); // 중앙 에러 핸들러로 전달
  }
});

/**
 * 프로젝트 조회 API
 */
router.get("/:id", async (req, res, next) => {
  try {
    console.log(`Incoming request to /api/project/${req.params.id}`);

    const project = await getProjectById(req.params.id, req.originalUrl);
    sendResponse(res, 200, "Project retrieved successfully", project);
  } catch (error) {
    next(error); // 중앙 에러 핸들러로 전달
  }
});

module.exports = router;
