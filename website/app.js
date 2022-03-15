// the event listener
document.getElementById('generate').addEventListener('click', function(){
if(document.querySelector('#zip').value === ''){
    alert("please enter the zip code");
}else if(document.getElementById('feelings').value === ''){
    alert("please enter your feelings");
}else{

    weatherApi().then(function(weatherData){
        document.querySelector('.entry').style.display= "block";
        postWeather({name: weatherData.name , desc: weatherData.weather[0].description , date: weatherData.date , feels: weatherData.feels , temperature: weatherData.main.temp}); 
        getWeather();
    })
}
})

/* Global Variables */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const personalKey = ",us&appid=cfca7c0d03927f54db25f22e111633f3&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//Get request for the data from the web api
const weatherApi = async function(url,zip,key){
    const zipCode = document.querySelector('#zip').value;
    const response = await fetch(apiUrl+zipCode+personalKey)
    try{
        const weatherData = await response.json();
        console.log(weatherData);
        weatherData.feels = document.getElementById('feelings').value;
        weatherData.date = newDate;
        return weatherData;
    }catch(error){
        console.log(" the error is : " + error);
    }
}

// Post request to save the data recieved into the server
const postWeather = async function(data={}){
    const request = await fetch('/postWeth', {
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    })
    try{
        const PostData = await request.json();
        console.log(PostData);
        return PostData;
    }catch(error){
        console.log("the error is : " + error);
    }
}

// get request to display the data on the ui dynamically
const getWeather = async function(url){
    const response = await fetch('/all')
    try{
        const getData = await response.json();
      
        document.getElementById('temp').innerHTML = "The temperature "+ "<em style='color:#deb887'>" + getData.temperature + ' &#8451; </em>';
        document.getElementById('date').innerHTML = "Today is "+ "<em style='color:#deb887'>"+getData.date +"</em>";
        document.getElementById('content').innerHTML += "The city name is "+  "<em style='color:#deb887'>"+ getData.cname + "</em>";
        document.getElementById('content').innerHTML += "<br>your feelings about the city are "+  "<em style='color:#deb887'>"+ getData.feels + "</em>";
        document.getElementById('content').innerHTML += "<br>The weather in the city is "+  "<em style='color:#deb887'>"+ getData.weth + "</em>";

    }catch(error){
        console.log("the error is : "+ error)
    }
}