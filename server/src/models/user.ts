import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (Values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
