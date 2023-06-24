module.exports = (sequelize, Sequelize) => {
    const Players = sequelize.define('players',{
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncreasement: true,
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
            default: 0
        },
        "2fa_password": {
            type: Sequelize.STRING(32),
            allowNull: false,
            default: ""
        },
        subscribe: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            default: 0
        },
        save_data: {
            type: Sequelize.JSON,
            allowNull: true
        },
        setting_data: {
            type: Sequelize.JSON,
            allowNull: true
        }
    });

    return Players;
}