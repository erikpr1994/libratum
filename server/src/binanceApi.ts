const Binance = require('node-binance-api');

export default (APIKEY: string, APISECRET: string) => {
  return new Binance().options({
    APIKEY,
    APISECRET,
  });
};
