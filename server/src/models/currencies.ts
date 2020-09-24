import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface currencyAttributes {
  id: number;
  code: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CurrenciesModel
  extends Model<currencyAttributes>,
    currencyAttributes {}
export class Currency extends Model<CurrenciesModel, currencyAttributes> {}

export type CurrencyStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CurrenciesModel;
};

export function CurrenciesFactory(sequelize: Sequelize): CurrencyStatic {
  return <CurrencyStatic>sequelize.define('currencies', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
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
