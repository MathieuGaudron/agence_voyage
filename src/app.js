const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");


const app = express();



app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", apiRoutes);
app.use(errorHandler);

app.get("/etat", (req, res) => {
  res.json({ status: "ok" });
});




module.exports = app;
