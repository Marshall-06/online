const express = require("express")
const app = express()
const sequelize = require('../src/config/db');
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 8080
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/config/swagger");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//  add this before all routes
app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

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

// only starts the server locally
// on Vercel, it does NOT call app.listen() — Vercel handles that itself
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// exports the app so Vercel can use it as a serverless function
module.exports = app;