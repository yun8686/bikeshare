const googleMapsClient = require('@google/maps').createClient({
  key: require('../config/config.json')["googlemap-APIKEY"],
  Promise: Promise,
});
module.exports = ()=>{
  return googleMapsClient;
}
