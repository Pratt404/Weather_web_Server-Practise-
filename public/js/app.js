console.log("client side Js is loaded")


const weatherform = document.querySelector('form')
const message1 = document.querySelector('#msg1')

weatherform.addEventListener('submit',(e)=>{
    message1.textContent = "Loading...."
    const city = document.querySelector('input').value
    e.preventDefault()
    fetch('/weather?city='+city).then(response=>{
        
            response.text().then(data=>{
                
                message1.textContent = data
            })
    
})
})