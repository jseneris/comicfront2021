//prod.js
module.exports = {
  comicApi: process.env.COMICAPI_URI,
  azureCdnAddress: process.env.AZURECDN,
  jwtKey: process.env.JWTKEY,
};
