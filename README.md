## Libratum (balanced in latin)

### Rebalance your crypto

## Project description

The tool helps you to rebalance your cryptos to have always the same percentage of each crytpo. For example, you want to have 50% of the total amount(in €) in each crypto, A and B, and crypto A cost 2€ and you have 5 coins and crypto B cost 3€ and you have 10 coins, the tool will sell crypto B to have more crypto A and comply with the % amount and you will have 10 A coins and 6,66 B coins.

## MVP

- A dashboard that will show you the coins you have, the value in € and the % of the total in a Pie chart.
- A page that will show you your actual wallet and the result of the rebalance before applying it.

## Tech stack

**Front End:**

- NextJS with Typescrypt.
- Libraries: https://www.fusioncharts.com/.
- Desktop web client.

**Back End:**

- NodeJS with Express using mongoose and TypeScript.
- Libraries: https://www.npmjs.com/package/node-binance-api#binance-api-spot-trading

## Data sources

Data is coming from Binance API (https://binance-docs.github.io/apidocs/spot/en/#change-log)

## Possible features

- Refactor the code to have it ready for production
- Login with Firebase or Auth0 and implement the database in postgresql using sequelize
- Add tests to the backend
- Mobile version
- Add the ability to select a percentage range for the rebalance
- Min limit amount per coin
- Calculate the winnings/losses % of the coin with a predefined currency (Eur, usd)
- Add a history of the rebalances
- Implement the Binance API without a package to use the full features it provides that I need and the package doesn't provide.
