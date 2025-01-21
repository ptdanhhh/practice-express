import { Model, DataTypes, Sequelize } from "sequelize";

export class TopicPersistent extends Model {
  declare created_at: Date;
  declare updated_at: Date;
}

export const init = (sequelize: Sequelize) => {
  TopicPersistent.init(
    {
      id: {
        type: DataTypes.UUID,
        field: "id",
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        field: "color",
        allowNull: false,
      },
      postCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "post_count",
        defaultValue: 0,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "Topic", // We need to choose the model name
      tableName: "topics",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
