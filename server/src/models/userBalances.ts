import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserBalancesAttributes {
  userId: number;
  currencyId: number;
  balance: number;
  balancePercentage: number;
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
      allowNull: false,
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
    balancePercentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
}
