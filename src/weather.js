const request = require('request')


const weatherForecast = (city, next)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c423499f6795590037a6f7fdf2d98a96&query='+city+'&units=m'
    request({url, json : true}, (error,{body} ={})=> {
 
    if(error){
        next(error)
    }
    else if(body.success === false ){
        next(body.error.info)
       
    }
    else{
    
        next(undefined,{body})
   
    }
    })
}





module.exports = weatherForecast