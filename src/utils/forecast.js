var request = require('request');
var geocode = require('./geocode');
var forecastParameters = require("../../config/weatherStackConfig");

const forecast = function({longitude, latitude, place_name},callback) {

   
    var url =   forecastParameters.parameters.part_url+
                "access_key=" + forecastParameters.parameters.access_key+
                "&query="+ longitude +","+ latitude;

    request({url:url, json:true},(error,data)=>{

        if(error) return callback("unable to connect to server....please try again",undefined);

        if(data.body.error) return callback("Invalid location",undefined);
   
        var forecastParams = {
            temperature: "Current temperature : "+ data.body.current.temperature,
            precip: "Chances of rain : "+data.body.current.precip + "%",
            place_name: data.body.location.name +", "+data.body.location.region +", "+data.body.location.country
        };
 
        callback(undefined, forecastParams);           
    })            
}

module.exports =forecast;