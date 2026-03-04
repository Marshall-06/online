const express = require("express")
const app = express()
const sequelize = require('../src/config/db');
require("dotenv").config()
const port = process.env.PORT
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/config/swagger");


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// auth
app.use("/api/auth", require("../src/routers/auth.router"))
// courses
app.use("/api/courses", require("../src/routers/course.router"))
// comments
app.use("/api/comments", require("../src/routers/comment.router"))
// profile
app.use("/api/profile", require("../src/routers/profile.router"))

app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})