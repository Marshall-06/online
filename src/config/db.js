// const {Sequelize} = require("sequelize")
// require("dotenv").config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         host:process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: process.env.DB_DIALECT,
//         logging: false
//     }
// );

// async function connectDB(){
//     try {
//         await sequelize.authenticate();
//         await sequelize.sync({alter: true})
//         console.log("PostgreSQL connected and synced")
//     } catch (error) {
//         console.error("DB connection error:", error)
        
//     }
// }

// connectDB()

// module.exports = sequelize;

const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if(process.env.DATABASE_URL) {
 sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Required for Render/cloud DBs
            }
        }
    })} else {
     sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT,
            logging: false
        }
    );
}

 async function connectDB(){
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true})
        console.log("PostgreSQL connected and synced")
    } catch (error) {
        console.error("DB connection error:", error)
        
    }
}

connectDB()


module.exports = sequelize;