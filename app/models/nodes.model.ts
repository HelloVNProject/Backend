module.exports = (sequelize, Sequelize) => {
    const Nodes = sequelize.define('nodes',{
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        route: {
            type: Sequelize.INTEGER(4),
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        nonce: {
            type: Sequelize.STRING(64),
            allowNull: false
        },
        chapter: {
            type: Sequelize.DECIMAL(4,2),
            allowNull: false
        },
        timeline_event_time: {
            type: Sequelize.STRING(32),
            allowNull: true
        },
        timelime_level: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 1
        },
        timeline_content: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: ""
        },
        qte_title: {
            type: Sequelize.STRING(64),
            allowNull: false,
            defaultValue: ""
        },
        qte_choices: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaulValuet: 0
        }
    });

    return Nodes;
}