module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {    
        userId: {    
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: "users",
            key: "id",
          }   
        },
        postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: "posts",
            key: "id",
            } 
        },
        commentContent: {
        type: Sequelize.STRING,
        allowNull: true,
        },
        imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        }
    });
    return Comment;
};

