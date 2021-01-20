module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {    
        firstName: {    
        type: Sequelize.STRING,
        allowNull: false    
        },    
        lastName: {    
        type: Sequelize.STRING,
        allowNull: false    
        },    
        email: {    
        type: Sequelize.STRING,
        allowNull: false,
            unique: { 
                args: true,
                msg: 'Cette adresse email est déjà utilisée !'
            }   
        }, 
        password: {    
        type: Sequelize.STRING,
        allowNull: false    
        },
        role: {    
        type: Sequelize.STRING,
        allowNull: false    
        },
        imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://localhost:3000/images/default-picture.jpg',
        allowNull: false
        }
    });       
    return User;    
};

