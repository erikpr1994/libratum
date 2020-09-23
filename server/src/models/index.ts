import * as sequelize from 'sequelize';

import { UserFactory } from './user';
import { CurrenciesFactory } from './currencies';
import { UserBalanceFactory } from './UserBalances';

import { config } from 'dotenv';
config();

const dbName: string = process.env.DB_NAME || '';
const dbUser: string = process.env.DB_USER || '';
const dbPassword: string = process.env.DB_PASSWORD || '';

export const dbConfig = new sequelize.Sequelize(dbName, dbUser, dbPassword, {
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export const Users = UserFactory(dbConfig);
export const Currencies = CurrenciesFactory(dbConfig);
export const UserBalances = UserBalanceFactory(dbConfig);

Currencies.belongsToMany(Users, { through: UserBalances });
Users.belongsToMany(Currencies, { through: UserBalances });
