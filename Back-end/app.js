const express = require('express');// Adding the framework Express to the project
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');/* package enabling to extract JSON objects from queries */
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');
const path = require('path');/* to reach the server's path in order to save images in the correct folder */
const helmet = require('helmet')

app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));

// Dealing with CORS issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');/* accessing to the API from every origin */
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());/* extracting JSON objects from queries */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/index.js");
db.sequelize.sync();

app.use('/images', express.static(path.join(__dirname, 'images')));/* 'images' folder static so GET query that reaches the image can work */

app.use('/api/auth', userRoutes);/* path to signup & login to the API*/
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;