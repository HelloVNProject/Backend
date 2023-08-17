module.exports = (sequelize, Sequelize) => {
    const PlayersQTEs = sequelize.define('players_qtes',{
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        device_id: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        node_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        choice: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        details: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue: {}
        }
    }, {underscored: true});

    return PlayersQTEs;
}