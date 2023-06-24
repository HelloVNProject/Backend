module.exports = (sequelize, Sequelize) => {
    const PlayersDevicesId = sequelize.define('players',{
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncreasement: true,
            allowNull: false
        },
        device_id: {
            type: Sequelize.STRING(64),
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(256),
            allowNull: false
        }
    });

    return PlayersDevicesId;
}