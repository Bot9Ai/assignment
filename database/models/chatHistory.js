const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const ConversationHistory = sequelize.define("ConversationHistory", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  response: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ConversationHistory;
