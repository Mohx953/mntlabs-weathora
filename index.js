const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "23db9f0a663b09f7092ba406c63546ce";

if (weatherForm) {
    weatherForm.addEventListener('submit', async event =>{
        event.preventDefault();
        const city = cityInput ? cityInput.value : '';
        if(city) {
            try{
                const weatherData = await getWeather(city);
                displayWeather(weatherData);

            }
            catch(error){
                console.error(error);
                displayError("An error occurred while fetching the weather data. Please try again later.");
            }
        } 
        else {
            displayError("Please enter a city");
        }

    });
}

async function getWeather(city) {

    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);
    // console.log(response);
    if(!response.ok) {
        throw new Error("Network response was not ok");
}
return await response.json();
}
function displayWeather(data) {
    // console.log(data);
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    card.textContent="";
    card.style.display="flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent=city;
tempDisplay.textContent=`${Math.round(temp - 273.15)}°C`;
humidityDisplay.textContent=`Humidity: ${humidity}%`;
descDisplay.textContent=description;
weatherEmoji.textContent=getEmoji(id);

cityDisplay.classList.add("cityDisplay");
tempDisplay.classList.add("tempDisplay");
humidityDisplay.classList.add("humidityDisplay");
descDisplay.classList.add("descDisplay");  
weatherEmoji.classList.add("weatherEmoji");     
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);




}
function getEmoji(Id) {
    switch(true){
        case(Id >= 200 && Id < 300):
            return "⛈️";
        case(Id >= 300 && Id < 400):
            return "🌧️";
        case(Id >= 500 && Id < 600):
            return "🌦️";
        case(Id >= 600 && Id < 700):
            return "❄️";
        case(Id >= 700 && Id < 800):
            return "🌫️";
        case(Id === 800):
        return "☀️";
        case(Id >= 801 && Id < 810):
            return "☁️";
        default:
            return "";
    }
}
function displayError(message) {
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

}
const menuToggle = document.getElementById('menu-toogle');
const navList = document.querySelector('.nav-bar ul');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// News Page



