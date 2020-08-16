const request = require('request')


const weatherForecast = (city, next)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d26a9e9486f669840cc861aa33c92d52&query='+city+'&units=m'
    request({url, json : true}, (error,{body} ={})=> {
 
    if(error){
        next(error)
    }
    else if(body.success === false ){
        if(body.error.code == 615){
            next("Enter Valid City!!!")
        }
        else{
            next(body.error.info)
        }
       
    }
    else{
    
        next(undefined,{body})
   
    }
    })
}





module.exports = weatherForecast