'use strict';
export default (sequelize, DataTypes) => {
    const Template = sequelize.define('Template', {
        name: {
            type: DataTypes.STRING
        },
        imgs_src: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.TEXT)
        }
    });
    //Template.associate = (models) => { };

    return Template;
}

/*
{
    name: {
        type: Sequelize.STRING
    },
    imgs_src: {
        type: Sequelize.STRING
    },
    tags: {
        type: Sequelize.STRING
    }
}
 */