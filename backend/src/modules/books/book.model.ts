import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database";

export class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public publishedYear!: number;
  public read!: boolean;
}

Book.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    publishedYear: { type: DataTypes.INTEGER, allowNull: false },
    read: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { sequelize: sequelize, tableName: "books" }
);
