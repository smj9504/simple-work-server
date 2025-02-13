const { ProjectInfo, ProjectStatus } = require('../models/models'); 
const { generateProjectId } = require('../utils/generateUniqueId');

/**
 * 프로젝트 생성
 */
const createProject = async (projectData, requestPath) => {
const { projectName, address1, address2, city, state, zipcode } = projectData;

if (!address1 || !city || !state || !zipcode) {
    throw new ApiError(400, "All required fields must be provided (address1, city, state, zipcode)", "VALIDATION_ERROR", requestPath);
}

const leadStatus = await ProjectStatus.findOne({ name: "lead" });
if (!leadStatus) {
    throw new ApiError(500, "Default project status 'lead' not found in the database.", "DATABASE_ERROR", requestPath);
}

const projectId = generateProjectId(zipcode);

const newProject = new ProjectInfo({
    id: projectId,
    projectName: projectName || null,
    address: { address1, address2: address2 || null, city, state, zipcode },
    statusId: leadStatus._id.toString(),
});

return await newProject.save();
};

/**
 * 프로젝트 조회
 */
const getProjectById = async (projectId, requestPath) => {
const project = await ProjectInfo.findOne({ id: projectId }).populate({
    path: "statusId",
    select: "name color -_id",
});

if (!project) {
    throw new ApiError(404, "Project not found", "NOT_FOUND", requestPath);
}

return project;
};

module.exports = { createProject, getProjectById };
