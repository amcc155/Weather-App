/* making the api call */

let cityName = null;
let cityCloud = null;
let cityTemp = null;
async function getWeather(location){

    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=87dc03fa79ad4ae49e9200536231407&q=${location}&aqi=yes`)
    const weatherData = await response.json()
    
    console.log(weatherData)
    console.log(weatherData.location.name)
   return weatherData
}


/* displaying the weather */
 const displayWeather = async (location)=>{
  
    const weatherData = await getWeather(location);

    cityName = document.querySelector('.city-name')
    cityTemp = document.querySelector('.temp')
    cityCloud = document.querySelector('.cloud')
    /* calling function that changes background */ 

    
   
     conditionImage(weatherData)
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
        
        const newCity = searchBar.value;

    searchBar.style.display='none'
    cityName.textContent = newCity
    cityName.style.display = 'block'
    submitBtn.style.display = 'none'

      await displayWeather(newCity)
    })
   })



/* checking weather conditions for background images */
   const conditionImage = (weatherData)=>{

    const background = document.querySelector('.weather-box')
    const body = document.querySelector('body')
    

    
    if (weatherData.current.cloud > 50 && weatherData.current.temp_f >=32){
        body.style.backgroundImage = 'url(images/33932.jpg)'
        document.body.style.backgroundPosition = 'center'
    }
    
    if (weatherData.current.temp_f <= 32){
            document.body.style.backgroundImage = 'url(images/frozen-branch-tree.jpg)'
            document.body.style.backgroundPosition = 'center'
        } 

    if(weatherData.current.cloud <10){
        document.body.style.backgroundImage = "url(images/sunny.jpg)"
        document.body.style.backgroundPosition = 'center'
    }


    }
    
 


 

   displayWeather('chicago')


 


