'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    type: {
      type: DataTypes.ENUM,
      values: ['Deposit', 'Withdraw'],
      defaultValue: 'Deposit',
      allowNull: false
    },
    transaction: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions'
  });

  Transaction.beforeCreate(async (txn, options) => {
    let lastTxn = await Transaction.findOne({ order: [['id', 'DESC']] });
    lastTxn = lastTxn || { balance: 0 }
    txn.transaction = txn.type === 'Deposit' ? txn.transaction : -txn.transaction
    txn.balance = lastTxn.balance + parseInt(txn.transaction)
  })
  return Transaction;
};