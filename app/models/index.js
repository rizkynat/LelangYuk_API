const config = require('../configs/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user =  require("../models/users.model")(sequelize, Sequelize)
db.product = require("../models/products.model")(sequelize, Sequelize)
const bid_transactions = sequelize.define('bid_transactions', {
    id_bid_transactions: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    harga_final: {
        type: Sequelize.INTEGER
    }
  });
db.product.belongsToMany(db.user, {
    through: 'bid_transactions',
    foreignKey: 'id_products',
    allowNull: true,
});

db.user.belongsToMany(db.product, {
    through: "bid_transactions",
    foreignKey: "id_users",
    allowNull: true,
  });

  module.exports = db
