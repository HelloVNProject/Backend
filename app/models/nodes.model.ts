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
        timelineEventTime: {
            type: Sequelize.STRING(32),
            allowNull: true,
            field: 'timeline_event_time'
        },
        timelineLevel: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 1,
            field: 'timeline_level'
        },
        timelineContent: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: "",
            field: 'timeline_content'
        },
        qteTitle: {
            type: Sequelize.STRING(64),
            allowNull: false,
            defaultValue: "",
            field: 'qte_title'
        },
        qteChoices: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0,
            field: 'qte_choices'
        }
    }, {underscored: true});

    return Nodes;
}