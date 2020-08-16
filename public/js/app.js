console.log("client side Js is loaded")


const weatherform = document.querySelector('form')
const message1 = document.querySelector('#msg1')
message1.textContent = "Loading...."
weatherform.addEventListener('submit',(e)=>{
    const city = document.querySelector('input').value
    e.preventDefault()
    fetch('http://localhost:8080/weather?city='+city).then(response=>{
        
            response.text().then(data=>{
                
                message1.textContent = data
            })
    
})
})