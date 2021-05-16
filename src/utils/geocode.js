var request = require('request');
var geocodePath = require("../../config/mapboxConfig");


const geocode = function(location = geocodePath.parameters.part_location, callback)  {
  
    //URL Construction form mapboxConfig.js file
    var url =   geocodePath.parameters.part_url + 
    encodeURIComponent(location) + ".json?" +
    "access_token=" + geocodePath.parameters.access_token + 
    "&limit=" + geocodePath.parameters.access_limit;
   
    request({url : url, json : true},(error,data) => {

        if(error) return callback("Unable to reach mapbox API...... please try again",undefined);        

        //if(data,body.error) return callback("Invalid location...please provide a valid location name",undefined);
   
        if(data.body.features.length == 0) return callback("Invalid location...please provide a valid location name",undefined);
        var geoParams = {
            longitude: data.body.features[0].center[1],
            latitude: data.body.features[0].center[0],
            place_name: data.body.features[0].place_name
        };
  
        callback(undefined,geoParams);
    })
}

module.exports = geocode;
// module.exports = {
//     geocode : geocode
// }