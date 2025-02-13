const http = require("http");
const app = require("./server"); // Express 앱 불러오기

const PORT = process.env.PORT || 5000;

// HTTP 서버 생성
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
