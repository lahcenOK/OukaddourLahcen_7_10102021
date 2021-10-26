"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /* Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false,
        },
      });
      models.Post.hasMany(models.Comment, {
        foreignKey: {
          name: "idPosts",
          allowNull: false,
        },
      });
    }
  }
  Post.init(
    {
      idUsers: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
