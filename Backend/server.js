const app = require("./app");
const databaseconnection = require("./src/DataBase/connection.db");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

databaseconnection();
