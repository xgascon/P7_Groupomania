const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.post = require("./Post.js")(sequelize, Sequelize);
db.like = require("./Like.js")(sequelize, Sequelize);
db.comment = require("./Comment.js")(sequelize, Sequelize);

db.user.hasMany(db.post, { foreignKey: "userId" }, { onDelete: "cascade" });
db.user.hasMany(db.like, { foreignKey: "userId" }, { onDelete: "cascade" });
db.user.hasMany(db.comment, { foreignKey: "userId" }, { onDelete: "cascade" });
db.post.hasMany(db.like, { foreignKey: "postId" }, { onDelete: "cascade" });
db.post.hasMany(db.comment, { foreignKey: "postId" }, { onDelete: "cascade" });
db.post.belongsTo(db.user, { foreignKey: "userId" });
db.like.belongsTo(db.post, { foreignKey: "postId" });
db.like.belongsTo(db.user, { foreignKey: "userId" });
db.comment.belongsTo(db.post, { foreignKey: "postId" });
db.comment.belongsTo(db.user, { foreignKey: "userId" });

module.exports = db;