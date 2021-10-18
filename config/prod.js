//prod.js
module.exports = {
  comicApi: process.env.COMICAPI_URI,
  azureCdnAddress: process.env.AZURECDN,
  jwtKey: process.env.JWTKEY,
  AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
};
