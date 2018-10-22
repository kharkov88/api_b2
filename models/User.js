'use strict';
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.associate = (models) => {
        models.User.hasMany(models.Template);
    };

    return User;
};
