    var fetch = require('node-fetch');
var url = "https://api-v3.mbta.com/vehicles?api_key=95e6709f9b944f578b6487407171b760&filter[route]=1&include=trip";

var vehicles = [];

async function fetchShuttles(){
	let response = await fetch(url);
	let data = await response.json();
	return data;
}

fetchShuttles().then(function(data){
	var buses = data.data;
	
	buses.forEach(function(bus){
		var id = bus.attributes.id;
		var label = bus.attributes.label;
		var direction_id = bus.attributes.direction_id;
		var lat =bus.attributes.latitude;
		var ln = bus.attributes.longitutde;
		var vehicle = {id:id, label:label, direction_id:direction_id, lat:lat, ln:ln};
		
		vehicles.push(vehicle)		
		
		console.log(JSON.stringify(vehicles));
	})

})

.catch(reason => console.log(reason.message))


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
 
db.defaults({ buses: [] } )
	.write()
	
var buses = db.get('buses');
buses.push(vehicles).write();


 

