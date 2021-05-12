// Declaring Constant Variables
const cssFile = document.querySelector("#css");
const container = document.querySelector(".container");
const alert = document.querySelector("#alert");
const upperBox = document.querySelector(".upperBox");
const lowerBox = document.querySelector(".lowerBox");
const currentTime = document.querySelector("#currentTime");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp");
const status = document.querySelector(".status");
const address = document.querySelector(".location");
const datebox = document.querySelector('.date');
const feelsLike = document.querySelector(".feelsLike");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const cityName = document.querySelector(".cityName");
const searchBtn = document.querySelector(".searchBtn");

const API_KEY = ""; // your api key
window.screen.orientation
    .lock("portrait")
    .then(
        success => console.log(success),
        failure => console.log(failure)
)


const deviceheight = () => {
    const height = window.innerHeight;
    if(height < 415){
       upperBox.style.display = "none";
       lowerBox.style.display = "none";
       alert.style.textAlign = "center";
       alert.innerHTML = "Please rotate your device....";
    }else{
        upperBox.style.display = "flex";
       lowerBox.style.display = "grid";
       alert.innerHTML = "";
    }
}

const getWeatherInfo = async () => {
    try {
        const userCityName = cityName.value;
        if(userCityName == ""){
            alert("First type name of any city....")
        }else{
            cssFile.setAttribute('href', './public/css/style.css')
            const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${userCityName}&units=metric&appid=${API_KEY}`

            const fetchData = await fetch(API_URL);
            const jsonData = await fetchData.json();
            const arrData = await [jsonData];
            console.log(arrData);
            const weatherStatus = arrData[0].weather[0].main;
            const sunriseTime = new Date(arrData[0].sys.sunrise * 1000);
            const sunsetTime = new Date(arrData[0].sys.sunset * 1000);
            
            temp.innerHTML = arrData[0].main.temp + "<sup>o</sup>C";
            address.innerHTML = arrData[0].name + ", " + arrData[0].sys.country;
            status.innerHTML = weatherStatus;
            sunrise.innerHTML = `Sunrise:  ${sunriseTime.getHours()}:${sunriseTime.getMinutes()} AM`;
            sunset.innerHTML = `Sunset : ${sunsetTime.getHours()}:${sunsetTime.getMinutes()} PM`;
            feelsLike.innerHTML = `Feels Like <br> ${arrData[0].main.feels_like}<sup>o</sup>C`;
            pressure.innerHTML = `Pressure <br> ${arrData[0].main.pressure} mBar`;
            visibility.innerHTML = `Visibility <br> ${Math.ceil((arrData[0].visibility)/1000)} km`;

            if(weatherStatus == "Smoke"){
                icon.innerHTML = '<img src="./public/img/smoke.png" alt="">';
            }else if(weatherStatus == "Mist"){
               icon.innerHTML = '<i class="fas fa-smog mist"></i>';
            }else if(weatherStatus == "Clouds"){
               icon.innerHTML = '<i class="fas fa-cloud"></i>';
            }else if(weatherStatus == "Haze"){
               icon.innerHTML = '<img src="./public/img/haze.png" alt="haze">';
            }else if(weatherStatus == "Sunny"){
               icon.innerHTML = '<i class="fas fa-sun"></i>';
            }else if(weatherStatus == "Clear"){
               icon.innerHTML = '<i class="fas fa-circle"></i>';
            }else if(weatherStatus == "Fog"){
                icon.innerHTML = '<i class="fas fa-water fog"></i>';
            }else if(weatherStatus == "Rain"){
                icon.innerHTML = '<img src="./public/img/rain.webp" alt="rain">';
            }else if(weatherStatus == "Snow"){
                icon.innerHTML = '<img src="./public/img/snow.png" alt="snow">';
            }else if(weatherStatus == "Drizzle"){
                icon.innerHTML = '<img src="./public/img/drizzle.webp" alt="drizzle">';
            }

        }
        
    } catch (error) {
        console.log(error);
          
        temp.innerHTML = "Not Found";
        address.innerHTML = "Not Found";
        status.innerHTML = "Not Found";
        sunrise.innerHTML = "Not Found";
        sunset.innerHTML = "Not Found";
        feelsLike.innerHTML = "Not Found";
        pressure.innerHTML = "Not Found";
        visibility.innerHTML = "Not Found";
        icon.innerHTML = "";
    }

}

const getTimeDate = () => {
    setInterval(() => {
        const date = new Date();
        let hours = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let date_ = date.getDate();
        let day = date.getDay();
        let mon = date.getMonth();
        let meridiem;
    
        let daysList = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ];
          let monthsList = [
            "Jan",
            "Feb", 
            "Mar", 
            "Apr", 
            "May", 
            "Jun", 
            "Jul",
            "Aug",
            "Sep", 
            "Oct", 
            "Nov", 
            "Dec"
        ];
        if(hours >= 12){
            meridiem = "PM"
        }else{
            meridiem = "AM"
        }
    
        if(hours > 12){
            hours = hours - 12;
            
        }
        if(hours < 10){
            hours = "0" + hours;
        }
        if(min < 10){
            min = "0" + min;
        }
        if(sec < 10){
            sec = "0" + sec;
        }
        currentTime.innerHTML = `${hours}:${min}:${sec} ${meridiem}`;
        datebox.innerHTML = `${daysList[day]} <br> ${monthsList[mon]} ${date_} `
      }, 1000);
}

getTimeDate();
searchBtn.addEventListener("click", getWeatherInfo);

 setInterval(() => {
     deviceheight();
 }, 800);