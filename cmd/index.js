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

app.use("/api/auth", require("../src/routers/auth.router"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})