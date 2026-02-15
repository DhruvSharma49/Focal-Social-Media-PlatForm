const http = require("http");
const { initSocket } = require("./socket");
const app = require("./app");
const databaseconnection = require("./src/DataBase/connection.db");

const PORT = process.env.PORT;
const server = http.createServer(app);

initSocket(server);  

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

databaseconnection();
