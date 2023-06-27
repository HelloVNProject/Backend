module.exports = (sequelize, Sequelize) => {
    const PlayersDevicesId = sequelize.define('players_devices_id',{
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
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