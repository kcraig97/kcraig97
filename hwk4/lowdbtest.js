const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const fetch = require('node-fetch');
 
var url = "https://api-v3.mbta.com/vehicles?api_key=95e6709f9b944f578b6487407171b760&filter[route]=1&include=trip";
 
// set up account
db.defaults({
    "vehicles":[]
}).write();
var vehicles;
 
async function fetchShuttles(){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
 
fetchShuttles().then(function(data){
    var buses = data.data;
    var vehicle;
    buses.forEach(function(bus){
        var id = bus.id;
        var label = bus.attributes.label;
        var direction_id = bus.attributes.direction_id;
        var lat = bus.attributes.latitude;
        var ln = bus.attributes.longitude;
        vehicle = {id:id, label:label, direction_id:direction_id, lat:lat, ln:ln};
        db.get('vehicles').push(vehicle).write();
        
    })
})
.catch(reason => console.log(reason.message))
 
console.log(JSON.stringify(vehicles));



// var starttime = new Date().getTime();
// var intervalID = setInterval( () => {
// 	console.log("setInterval")
// 	if(newDate().getTime()- starttime > 1000*60*60){
// 		console.log("stoptime")
// 		clearInterval(intervalID);
// 		return;
// 	}
// 		fetchShuttles();

// }, 15000);