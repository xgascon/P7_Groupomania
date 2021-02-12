const dotenv = require('dotenv'); /* package to manage dotenv with the DB connection */
dotenv.config(); /* initiate dotenv and make environment variables available throughout the application */

module.exports = {
    HOST: process.env.DB_HOST,    
    USER: process.env.DB_USER,    
    PASSWORD: process.env.DB_PASSWORD,    
    DB: process.env.DB_DB,    
    dialect: "mysql",    
    pool: {
        max: 5,        
        min: 0,        
        acquire: 30000,        
        idle: 10000        
        }        
    };