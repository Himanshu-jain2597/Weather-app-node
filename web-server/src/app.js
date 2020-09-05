const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')



console.log(__dirname);

const publicDirectoryPath=path.join(__dirname,'../public')
const viewDirectoryPath=path.join(__dirname,'../templates/views')
const partialsDirectoryPath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=> {

	res.render('index',{
		title:'Weather App',
		name:'Himanshu Jain'

	})
})

app.get('/about',(req,res)=> {

	res.render('about',{
		title:'About me',
		name:'Himanshu Jain'

	})
})

app.get('/help',(req,res)=> {

	res.render('help',{
	helptext:'this is some help',
	title:'Help',
	name:'himanshu jain '
	})
})


app.get('/weather' ,(req,res)=> {

if(!req.query.address) {
	return res.send({
		error:'please provide an valid address'
	})
}

geocode(req.query.address, (error,{latitude,longitude,location}={}) => {

	if(error)
	{
		return res.send({error})
	}


	forecast(latitude,longitude,(error,forecastData) => {
		if(error) {
			return res.send({error})

		}
	res.send({
		forecast:forecastData,
		address:req.query.address
	})
})
})
})

app.get('/products',(req,res)=> {

	if(!req.query.search) {
		return res.send({
			error:'please provide an search'
		})
	}
	console.log(req.query.search);
	res.send({
		products:[]
	})
})

app.get('*' ,(req,res)=> {

	res.send('My 404 page')
})


app.listen(3000,()=> {
	console.log('server is up on 3000')
})
