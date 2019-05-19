const googleMap = require('./apis/googlemap')();
googleMap.directions({
  origin: [35.6008118,139.72221909999996],
  destination: [35.61061,139.693443],
  mode: "walking"

}).asPromise().then(v=>{
  console.log(v.json.routes[0].legs, "OK")
}).catch(v=>console.log(v, "NG"));
