const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = require("./routes/api");

console.log("apiRoutes =", apiRoutes);
app.use("/api", apiRoutes);

app.listen(3001, () => {
  console.log("servidor rodando em 3001");
});
