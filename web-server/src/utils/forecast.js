const request =require('request')


const forecast = (lat,long,callback) => {

const url = 'http://api.weatherstack.com/current?access_key=1adfd14916c01bf64027513d8efa26aa&query=' + lat +','+ long


request({url,json:true},(error,{body}) => {


	if(error)
	{
		callback('unable to access the api',undefined)
	} else if(body.error) {

		callback('unable to fetch api',undefined)

	} else {
		callback(undefined,"there is " +body.current.temperature + " C temperature and chance of rain is " + body.current.weather_descriptions[0]

		)

	}
})

}

module.exports=forecast
