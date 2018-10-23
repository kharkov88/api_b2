'use strict';
export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.associate = (models) => {
        User.hasMany(models.template);
    };

    return User;
};
