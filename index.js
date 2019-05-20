const googleMap = require('./apis/googlemap')();
const fs = require('fs');
const data = require('./dataset/portname');

function doDirections(){
  googleMap.directions({
    origin: [35.6008118,139.72221909999996],
    destination: [35.61061,139.693443],
    mode: "walking"

  }).asPromise().then(v=>{
    console.log(v.json.routes[0].legs, "OK")
  }).catch(v=>console.log(v, "NG"));
}
async function doSearch(obj){
  var results = [];
  var result = await googleMap.places({
    query: obj.name,
    language: "ja"
  }).asPromise();
  console.log(result.json);
  results.push(...result.json.results);
  var nextPageToken = result.json.next_page_token;
//  while(nextPageToken){
//    result = await googleMap.places({
//      pagetoken: nextPageToken,
//    }).asPromise();
//    results.push(...result.json.results);
//    nextPageToken = result.json.next_page_token;
//    console.log(result.json);
//  }
  results = results.filter(v=>v.name.indexOf(obj.no) >= 0);
  return results;
//  fs.writeFile('results.json', JSON.stringify(results, '', '    '));
}
var results = data.map(v=>{
  return doSearch(v);
});
fs.writeFile('results.json', JSON.stringify(results, '', '    '));
