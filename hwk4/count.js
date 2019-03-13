// counting vehicles
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const fetch = require('node-fetch');
 

var buslist = db.get('vehicles').value()
console.log(buslist);
var count = buslist.length
//   .size()
//   .value()
console.log(count);
