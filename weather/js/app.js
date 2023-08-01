/* making the api call */

let cityName = null;
let cityCloud = null;
let cityTemp = null;
let newCity;

/* getting weather api */
async function getWeather(location){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=87dc03fa79ad4ae49e9200536231407&q=${location}&days=4&aqi=yes`)
    const weatherData = await response.json()
    console.log(weatherData)

 /* return data */
   return weatherData
}


/* getting image api */
async function getImage (location){
     const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${location}`,{
        headers:{
            'Authorization':'Client-ID TXPYxZN8iOGxC0ylvmU3FrY7ai_bMZ02PrkKrf5Nftk'
        }

     })
  const imageData = await imageResponse.json()
  return imageData
}





/* displaying the weather */
 const displayWeather = async (location)=>{
  /* getting the data with certain location */
    const weatherData = await getWeather(location);
     /* declaring the background image to a variable */
    const backgroundImage = await getImage(weatherData.location.name)

    setCityImage(backgroundImage)
    displayInfo(weatherData)
    getDate(weatherData)
    getTemp(weatherData)
    setIcon(weatherData)
}


 const getTemp = (weatherData)=>{
 /* getting min and max temp of each */
 const minTemp = document.querySelectorAll('.min')
 const maxTemp = document.querySelectorAll('.max')

/* displaying min and max */
 minTemp.forEach((min,index) =>{
  min.textContent = weatherData.forecast.forecastday[index].day.mintemp_f
 })

 maxTemp.forEach((max,index)=>{
     max.textContent = weatherData.forecast.forecastday[index].day.maxtemp_f
 })
 }

 const getDate = (weatherData)=>{
    /* getting each forecast date */
    forecastDate = document.querySelectorAll('.date')
    forecastDate.forEach(function(element, index) {
       
    element.textContent = weatherData.forecast.forecastday[index].date;
        })
 }

 const displayInfo = (weatherData)=>{
    cityName = document.querySelector('.city-name')
    cityTemp = document.querySelector('.temp')
    cityCloud = document.querySelector('.cloud')

/* text */
cityCloud.textContent = weatherData.current.condition.text
cityTemp.textContent = weatherData.current.temp_f
cityName.textContent = weatherData.location.name
 }




 /* search function */
 

 document.addEventListener('DOMContentLoaded', () => {

   const searchBtn = document.querySelector('.search')
   const searchBar = document.querySelector('.search-box')
   const submitBtn = document.querySelector('.submit')

   searchBtn.addEventListener('click',()=>{
    cityName.style.display = 'none'
    searchBar.style.display = 'block'
    submitBtn.style.display = 'block'



   
    })
    
    submitBtn.addEventListener('click', async()=>{
        const loader = document.querySelector('.loader')
        const newCity = searchBar.value;
        const background = document.querySelector('.weather-box')
    searchBar.style.display='none'
    cityName.textContent = newCity
    cityName.style.display = 'block'
    submitBtn.style.display = 'none'

    loader.style.display = 'block'
    background.style.display = "none"
   

    await displayWeather(newCity);
    loader.style.display = 'none';
    background.style.display = 'block';
    })
   })


    const body = document.querySelector('body')


 const setCityImage = (imageData)=>{
    const randomIndex = Math.floor(Math.random() * imageData.results.length);
 
const firstImage = imageData.results[randomIndex];
const imageURL = firstImage.urls.regular;
    
    body.style.backgroundImage = `url(${imageURL})`
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = 'cover'
    body.style.height= '100vh'
 }

const setIcon = (weatherData)=>{
iconImage = document.querySelector('.icon')
let icon = weatherData.current.condition.icon

iconImage.src = `${icon}`
}
 

 
 /* defaulat city */
   displayWeather('chicago')


 


/* loader */
