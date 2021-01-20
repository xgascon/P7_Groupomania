module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {    
        userId: {    
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true,
        references: {
            model: "users",
            key: "id",
          }   
        },
        content: {
        type: Sequelize.TEXT,
        allowNull: true,
        }, 
        imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        },   
        likeNumber: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        },
        dislikeNumber: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        },
        currentUserLike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        },
        currentUserdislike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        }
    });
    return Post;
};

