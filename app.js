const credentials = require('./credentials.js')
const request = require('request')


// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
//"https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
//credentials.MAPBOX_TOKEN
//credentials.DARK_SKY_SECRET_KEY



const geocode = function(ciudad)
{

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?type=place&limit=1&access_token=' + credentials.MAPBOX_TOKEN

	request({url, json: true}, function(error, response) 
	{ 
		if(error)
		{
			console.log(error.id)
		}
		else
		{
			const data = response.body.features
			const Lon = data[0].center[0]
			const Lat = data[0].center[1]	

			geocode2(Lat,Lon,ciudad)
		}
		
	})

}


const geocode2 = function (Lat, Lon, Cd)
{
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY+'/'+Lat+','+Lon+'?lang=es&units=auto'

	request({url, json: true}, function(error, response) 
	{ 
		if(error)
		{
			console.log(error.id)
		}
		else
		{

			info = response.body
			Ahorita = info.hourly.summary
			Temp = info.currently.temperature
			StT = 'Actualmente esta a '+Temp+'°C.'
			Lluvia = info.currently.precipProbability
			StLL = 'Hay '+Lluvia+'% de posibilidad de lluvia.'
			StringFinal = Ahorita+StT+StLL+'('+Cd+')'

			console.log(StringFinal)
		}
		
	})
}

geocode('Monterrey')