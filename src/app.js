const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const weather = require('./weather')
const location = require('./location')

//Setting up Express Config Paths
const publicDirectory = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

//loading up public directory which contains static asset
app.use(express.static(publicDirectory))

//Setting up dynamic views
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//To render dynamic page
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Pratt'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Weather App',
        name: 'Pratt'
    })
})
//To Render normal page
app.get('/about',(req,res)=>{
    res.send(
        [{   name: 'Pratt',
            age : 25,
            wakeup(){
                console.log('Wake up')
             }

        }]
    )
})

app.get('/weather',(req,res)=>{
    const city = req.query.city
    if(city){
            weather(city,(error,{body}={})=>{
                if(error){
                    return res.send(error)
                }
                else{
                    res.send("Weather Forecast of "+body.location.name+" City is: \n "+body.current.weather_descriptions[0]+". It is currently " +body.current.temperature +" degrees out. It feels like " +body.current.feelslike +" degrees out.")
                }
            })
    }
    else{
        res.send('Please Enter City')
    }
    
})

//To show error page if page not present post help/
app.get('/help/*',(req,res)=>{
    res.send("404 Page")
})

app.get('*',(req,res)=>{
    res.render('error')
})
// console.log(app)
app.listen(8080)