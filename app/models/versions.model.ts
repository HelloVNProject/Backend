module.exports = (sequelize, Sequelize) => {
    const Versions = sequelize.define('versions', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        version: {
            type: Sequelize.STRING(16),
            unique: true,
            allowNull: false
        },
        body: {
            type: Sequelize.TEXT,
            defaultValue: null
        },
        resource_path: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        is_latest: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        is_dev: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {underscored: true});

    return Versions;
}