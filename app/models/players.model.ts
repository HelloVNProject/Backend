module.exports = (sequelize, Sequelize) => {
    const Players = sequelize.define('players',{
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(256),
            unique: true,
            allowNull: false
        },
        "2fa": {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        "2fa_password": {
            type: Sequelize.STRING(32),
            allowNull: false,
            defaultValue: ""
        },
        subscribe: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        save_data: {
            type: Sequelize.JSON,
            allowNull: true
        },
        setting_data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    }, {underscored: true});

    return Players;
}