const Sequelize = require('sequelize')
const sequelizeInstance = require('../sequelize')
const bcrypt = require('bcrypt')

const User = sequelizeInstance.define(
    'User',
    {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        pseudo: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        trials: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        successing: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                if (user.password) {
                    user.password = bcrypt.hashSync(
                        user.password,
                        bcrypt.genSaltSync()
                    )
                }
            },
        },
    }
)

User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = User
