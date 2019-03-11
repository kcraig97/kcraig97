var url = "https://api-v3.mbta.com/vehicles?api_key=95e6709f9b944f578b6487407171b760&filter[route]=1&include=trip";
async function fetchShuttles(){
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
db.defaults({ busdata: ["https://api-v3.mbta.com/vehicles?api_key=95e6709f9b944f578b6487407171b760&filter[route]=1&include=trip"],  })
  .write()
 
db.get('busdata')
  .push({ id: 1, title: 'lowdb is awesome'})
  .write()
 
