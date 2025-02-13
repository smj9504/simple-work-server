const generateProjectId = (zipcode) => {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, ""); // YYYYMMDDHHMMSS format
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${zipcode}-${timestamp}-${randomNumber}`;
  };
  
  module.exports = { generateProjectId };