import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ApiKeyAttributes {
  userId?: number;
  apiKey: string;
  secretKey: string;
}

export interface ApiKeyInstance
  extends Model<ApiKeyAttributes>,
    ApiKeyAttributes {}

export class ApiKeyModel extends Model<ApiKeyInstance, ApiKeyAttributes> {}

export type ApiKeyStatic = typeof Model & {
  new (Values?: object, options?: BuildOptions): ApiKeyModel;
};

export function ApiKeyFactory(sequelize: Sequelize): ApiKeyStatic {
  return <ApiKeyStatic>sequelize.define('api_keys', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secretKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
