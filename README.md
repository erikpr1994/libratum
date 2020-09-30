## Project name

Choose a name for your project. Don’t worry, it doesn’t need to be fancy, it’s just a way to identify it (e.g. "Hipstacam", or "Woofie").

**Answer:** Libratum (balanced in latin)

## Repository

Create a public GitHub repo to host your project and paste its URL here.

**Answer:** https://github.com/erikpr1994/libratum

## One liner

Write a very short sentence (< 10 words) that describes what your app is about (e.g. "Airbnb for boats", or "Movies recommendation engine").

**Answer:** Rebalance your crypto

## Project description

Provide a short description of what the app does (< 1000 characters).

**Answer:** The tool will help you to rebalance your cryptos to have always the same percentage of each crytpo. For example, you want to have 50% of the total amount(in €) in each crypto, A and B, and crypto A cost 2€ and you have 5 coins and crypto B cost 3€ and you have 10 coins, the tool will sell crypto B to have more crypto A and comply with the % amount and you will have 10 A coins and 6,66 B coins.

## MVP

Choose the core feature that most defines your app and you’ll start to tackle first (e.g. "Users should be able to take a picture of a food item with their smartphone and receive a list of recipes based on that ingredient").

**Answer:** The MVP will be:

- A dashboard that will show you the coins you have, the value in € and the % of the total in a Pie chart.
- A page that will show you your actual wallet and the result of the rebalance before applying it.

## Tech stack

Does your app have a client, a server, or both? If it has a client, is it web or mobile? What frameworks, databases, or relevant libraries are you going to use? Fill the fields here below as needed.

**Front End:**

- NextJS with Typescrypt.
- Libraries: https://www.fusioncharts.com/.
- Desktop web client.

**Back End:**

- NodeJS with Express using mongoose and TypeScript.
- Libraries: https://www.npmjs.com/package/node-binance-api#binance-api-spot-trading

## Data sources

In case your app relies on some data to work properly, where are you planning to get that data from?

**Answer:** Data is coming from Binance API (https://binance-docs.github.io/apidocs/spot/en/#change-log)

## Possible features

- Login with Firebase or Auth0 and implement the database in postgresql using sequelize
- Add tests to the backend
- Mobile version
- Min limit amount per coin
- Calculate the winnings/losses % of the coin with a predefined currency (Eur, usd)
- Add a history of the rebalances
- Implement the Binance API without a package to use the full features it provides that I need and the package doesn't provide.
