module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {    
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
        likeReaction: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        },
        dislikeReaction: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        }
    }, 
    {
    indexes: [
        {
        name: 'user_reaction',
        fields: ['userId', 'postId']
        }
    ]}
    );
    return Like;
};

