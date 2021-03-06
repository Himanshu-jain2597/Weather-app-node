const request =require('request')

const geocode =(address,callback) => {

	const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiaGltYW5zaHUtamFpbjI1OTciLCJhIjoiY2p4dmJ0MnFhMDMydDNibXFrM2R3YmgwcyJ9.YrebLkcO7N3UKfnLx89S0Q'


		request({url,json:true},(error,{body}) => {

if(error)
	{
		callback('unable to connect to the API',undefined)
	} else if(body.features.length===0) {

		callback('unable to find the location',undefined)


	} else {

			callback(undefined, {
			latitude:body.features[0].center[1],
			longitude:body.features[0].center[0],
			location:body.features[0].place_name
		})
}
})


}

module.exports = geocode