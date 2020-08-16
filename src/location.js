const request = require('request')
const weather = require('./weather')
const location = (city,next) =>{
 const url= 'https://indian-cities-api-nocbegfhqg.now.sh/cities?City='+city
    request({url, json : true}, (error,response)=> {
        
        if (error){
            next(error)
        }
        else if(response.body.length === 0){
            next("Invalid City")
        }
        else{
            weather(response.body[0].District,(error,{body : distBody} ={}) =>{
                if (error){
                     next(error)
                }
                else{
                    console.log("Weather Forecast of "+distBody.location.name+" District of "+city+"  City is")
                    console.log(distBody.current.weather_descriptions[0]+". It is currently " +distBody.current.temperature +" degrees out. It feels like " +distBody.current.feelslike +" degrees out.")
                    
                }
            })
            weather(response.body[0].State,(error,{body : stateBody} ={}) =>{
                if (error){
                    next(error)
                }
                else{
                    
                    console.log("Weather Forecast of State Capital "+stateBody.location.name+"  of "+city+" City is")
                    console.log(stateBody.current.weather_descriptions[0]+". It is currently " +stateBody.current.temperature +" degrees out. It feels like " +stateBody.current.feelslike +" degrees out.")
                    
                }
            })

        }
    })
}
    
module.exports = location
