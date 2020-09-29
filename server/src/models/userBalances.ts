import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserBalancesAttributes {
  userId: number;
  currencyId: number;
  balance?: number;
  totalInBTC?: number;
  totalInEur?: number;
  balancePercentage?: number;
  value?: number;
}

export interface UserBalanceInstance
  extends Model<UserBalancesAttributes>,
    UserBalancesAttributes {}

export class UserBalanceModel extends Model<
  UserBalanceInstance,
  UserBalancesAttributes
> {}

export type UserBalanceStatic = typeof Model & {
  new (Values?: object, options?: BuildOptions): UserBalanceModel;
};

export function UserBalanceFactory(sequelize: Sequelize): UserBalanceStatic {
  return <UserBalanceStatic>sequelize.define('user_balances', {
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    balancePercentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalInBTC: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalInEur: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
}
