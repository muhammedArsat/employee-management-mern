const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDataBase = require("./config/connedtDataBase");
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
dotenv.config({ path: path.join(__dirname, "config", "config.env") });
const port = process.env.PORT;
const node_env = process.env.NODE_ENV;

connectDataBase();

const employee = require('./routes/EmployeeRoute');
app.use("/api/v1/",employee);


app.listen(port, () => {
  console.log(`Server is Running on Port ${port} in ${node_env} `);
});
