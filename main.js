const apiKey = 'f2eba6324dd241a92cebc1ca55b441ba';
const submit = document.querySelector('.submit');
const cityInput = document.querySelector('#City');

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    submit.click(); 
  }
});
submit.addEventListener('click' , () =>{
    const CITY = cityInput.value.trim();
    document.querySelector('.state-initial').classList.add('nonActive');
    getdata(CITY);
})

async function getdata(CITY) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}&units=metric`);
    if(!data.ok){
        document.querySelector('.content-error').classList.remove('nonActive');
        document.querySelector('.state-weather').classList.add('nonActive');

        try{
        if (data.status === 404) {
            throw new Error("City not found. Please check the spelling and try again.");
          } else if (data.status === 401) {
            throw new Error("Invalid API key. Please check your credentials.");
          } else if (data.status >= 500) {
            throw new Error("Weather service is temporarily unavailable. Try again later.");
          } else {
            throw new Error(`Unexpected error occurred`);
          }
        }catch (error) {
          document.querySelector('.number-error').innerHTML =`${data.status}`;
          document.querySelector('.message-error').innerHTML =`${error.message}`;
          return;
        }
    }
    else{
    const jsonData = await data.json();

        document.querySelector('.state-weather').classList.remove('nonActive');
        document.querySelector('.state-initial').classList.add('nonActive');
        document.querySelector('.content-error').classList.add('nonActive');


        const cityName = document.querySelector('.name');
        cityName.innerHTML = `${CITY}`;

        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric' ,  
          month: 'short',    
        });
        document.querySelector('.date').textContent = `${formattedDate}`;


        const imgIcon = document.querySelector('.icon');
        if(jsonData.weather[0].main === 'Clear') imgIcon.src= './img/weather/clear.svg';
        else if(jsonData.weather[0].main === 'Clouds') imgIcon.src= './img/weather/clouds.svg';
        else if(jsonData.weather[0].main === 'Rain') imgIcon.src= './img/weather/rain.svg';
        else if(jsonData.weather[0].main === 'Drizzle') imgIcon.src= './img/weather/drizzle.svg';
        else if(jsonData.weather[0].main === 'Thunderstorm') imgIcon.src= './img/weather/thunderstorm.svg';
        else if(jsonData.weather[0].main === 'Snow') imgIcon.src= './img/weather/snow.svg';
        else imgIcon.src='./img/weather/atmosphere.svg'



        document.querySelector('.degree').textContent = `${Math.round(jsonData.main.temp)} °C`;

        document.querySelector('.description').textContent= `${jsonData.weather[0].description}`;

        document.querySelector('.wind-val').innerHTML = ``;
        document.querySelector('.wind-val').textContent = `${jsonData.wind.speed} km/s`;

        document.querySelector('.humidity-val').innerHTML = ``;
        document.querySelector('.humidity-val').textContent = `${jsonData.main.humidity}%`;

        forecast(CITY);
    }
}

async function forecast(CITY) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${apiKey}&units=metric`);
    const jsonData = await data.json();

    document.querySelector('.info-to-next').innerHTML= ``;

   
    
    const dailyForecasts = jsonData.list.filter(itme => {return itme.dt_txt.includes("12:00:00")})
    console.log(dailyForecasts);

    const container = document.querySelector('.info-to-next');

    dailyForecasts.forEach(days =>{
        const now= new Date(days.dt_txt);
        let day = now.getDate();
        const monthNumber = now.toLocaleDateString('en-US', { month: 'short' });

        let src;
        if(days.weather[0].main === 'Clear') src= './img/weather/clear.svg';
        else if(days.weather[0].main === 'Clouds') src= './img/weather/clouds.svg';
        else if(days.weather[0].main === 'Rain') src= './img/weather/rain.svg';
        else if(days.weather[0].main === 'Drizzle') src= './img/weather/drizzle.svg';
        else if(days.weather[0].main === 'Thunderstorm') src= './img/weather/thunderstorm.svg';
        else if(days.weather[0].main === 'Snow') src= './img/weather/snow.svg';
        else imgIcon.src='./img/weather/atmosphere.svg'

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class= "time" > ${monthNumber}, ${day} </div>
        <img src= ${src} class="icon-next">
        <div class="temp-next">${Math.round(days.main.temp)} °C</div>
        `;
        container.appendChild(card);
    })
}