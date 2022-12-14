const Sequelize = require('sequelize');
const database = require('../db');
const Account = require('./accounts');

const DailyClaim = database.define('daily-claim', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    last_claim: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

DailyClaim.belongsTo(Account, {
    constraint: true,
    foreignKey: 'user_id'
})

module.exports = DailyClaim;