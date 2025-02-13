const { v4: uuidv4 } = require("uuid");

/**
 * 성공 응답을 반환하는 함수
 */
const sendResponse = (res, statusCode, message, data = null, req = null) => {
  const response = {
    requestId: uuidv4(), // 요청 ID (디버깅 용도)
    timestamp: new Date().toISOString(),
    statusCode,
    message,
    path: req ? req.originalUrl : null,
    method: req ? req.method : null,
    data,
  };

  res.status(statusCode).json(response);
};

/**
 * 미들웨어를 통해 응답을 로깅하는 함수 (디버깅용)
 */
const responseLogger = (req, res, next) => {
  const oldJson = res.json;

  res.json = function (data) {
    console.log(`[Response] ${req.method} ${req.originalUrl} -`, JSON.stringify(data, null, 2));
    oldJson.call(this, data);
  };

  next();
};

module.exports = { sendResponse, responseLogger };
