const express = require('express');
const { ProjectInfo, ProjectStatus } = require('../models/models'); 
const { generateProjectId } = require('../utils/generateUniqueId');
const { ApiError } = require('../utils/errorHandler');

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log("Incoming request to /api/project");
    console.log("Request Body:", req.body);

    const { projectName, address1, address2, city, state, zipcode } = req.body;

    // Validate required fields
    if (!address1 || !city || !state || !zipcode) {
      return res.status(400).json({
        statusCode: 400,
        message: "All required fields must be provided (address1, city, state, zipcode)",
      });
    }

    // Find the statusId for "lead"
    const leadStatus = await ProjectStatus.findOne({ name: "lead" });

    if (!leadStatus) {
      return res.status(500).json({
        statusCode: 500,
        message: "Default project status 'lead' not found in the database.",
      });
    }

    // Generate a unique project ID
    const projectId = generateProjectId(zipcode);

    // Create a new project document with statusId set to 'lead'
    const newProject = new ProjectInfo({
      id: projectId,
      projectName: projectName || null,
      address: {
        address1,
        address2: address2 || null,
        city,
        state,
        zipcode,
      },
      statusId: leadStatus._id.toString(), // Assign 'lead' statusId
    });

    // Save the project to the database
    const savedProject = await newProject.save();
    console.log("Project saved to MongoDB:", savedProject.toObject());

    res.status(201).json({
      statusCode: 201,
      message: "Project created successfully",
      data: savedProject,
    });
  } catch (error) {
    console.error("Error in API:", error);
    next(error); // Pass error to centralized error handler
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log(`Incoming request to /api/project/${req.params.id}`);

    // Find the project and populate the status details (name, color)
    const project = await ProjectInfo.findOne({ id: req.params.id }).populate({
      path: "statusId",
      select: "name color -_id", // Only return name and color, hide _id
    });

    // If no project is found, return 404
    if (!project) {
      return res.status(404).json({
        statusCode: 404,
        message: "Project not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Project retrieved successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error in API:", error);
    next(error);
  }
});

module.exports = router;
