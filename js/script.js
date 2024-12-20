const apiKey = 'SUA_CHAVE_AQUI';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const additionalInfo = document.getElementById('additional-info');

let apiCallCount = 0;
const maxApiCallsPerMinute = 30; // limite gratuito para maior possibilidades
let apiCallQueue = [];

// Reseta o contador de chamadas a cada minuto
setInterval(() => {
    apiCallCount = 0;
    // Processa as chamadas na fila, se houver
    while(apiCallQueue.length > 0 && apiCallCount < maxApiCallsPerMinute) {
        const city = apiCallQueue.shift();
        getWeatherData(city);
    }
}, 60000); // 60000 ms = 1 minuto

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        enqueueApiCall(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            enqueueApiCall(city);
        }
    }
});

function enqueueApiCall(city) {
    if (apiCallCount < maxApiCallsPerMinute) {
        getWeatherData(city);
        apiCallCount++;
    } else {
        // Adiciona na fila se o limite for atingido
        apiCallQueue.push(city);
        alert('Limite de requisições atingido. Sua busca será processada em breve.');
    }
}

async function getWeatherData(city) {
    try {
        // Fetch dados atuais do clima
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt_br&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }
        const data = await response.json();
        displayWeather(data);
        // Busca a previsão
        getForecastData(data.coord.lat, data.coord.lon);
        // Atualiza o background com base no clima
        updateBackground(data.weather[0].main);
    } catch (error) {
        alert(error.message);
    }
}

async function getForecastData(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&lang=pt_br&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar a previsão');
        }
        const forecastData = await response.json();
        displayForecast(forecastData.daily);
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <div class="location">${data.name}, ${data.sys.country}</div>
        <div class="temp">${Math.round(data.main.temp)}°C</div>
        <div class="description"><i class="fas ${getWeatherIcon(data.weather[0].icon)}"></i> ${data.weather[0].description}</div>
    `;
    weatherInfo.classList.add('active');

    additionalInfo.innerHTML = `
        <div class="info-box">
            <i class="fas fa-tint"></i>
            <p>Umidade: ${data.main.humidity}%</p>
        </div>
        <div class="info-box">
            <i class="fas fa-wind"></i>
            <p>Vento: ${data.wind.speed} km/h</p>
        </div>
        <div class="info-box">
            <i class="fas fa-sun"></i>
            <p>Nascer do Sol: ${convertUnixToTime(data.sys.sunrise)}</p>
        </div>
        <div class="info-box">
            <i class="fas fa-moon"></i>
            <p>Pôr do Sol: ${convertUnixToTime(data.sys.sunset)}</p>
        </div>
    `;
    additionalInfo.classList.add('active');
}

function displayForecast(daily) {
    const forecastContainer = document.getElementById('forecast') || createForecastContainer();
    forecastContainer.innerHTML = ''; // Limpa previsões anteriores
    // Exibir próximos 5 dias
    for (let i = 1; i <= 5; i++) {
        const dayData = daily[i];
        const date = new Date(dayData.dt * 1000);
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const icon = dayData.weather[0].icon;
        const temp = Math.round(dayData.temp.day);
        const description = dayData.weather[0].description;

        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <h4>${dayName}</h4>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <p>${temp}°C</p>
        `;
        forecastContainer.appendChild(dayElement);
    }
}

function createForecastContainer() {
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');
    forecastDiv.id = 'forecast';
    weatherInfo.appendChild(forecastDiv);
    return forecastDiv;
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud-meatball',
        '04n': 'fa-cloud-meatball',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-sun-rain',
        '10n': 'fa-cloud-moon-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog',
    };
    return iconMap[iconCode] || 'fa-cloud';
}

function convertUnixToTime(unix) {
    const date = new Date(unix * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return `${hours}:${minutes.substr(-2)}`;
}

function updateBackground(weatherMain) {
    switch(weatherMain.toLowerCase()) {
        case 'clear':
            document.body.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
        case 'clouds':
            document.body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
        case 'drizzle':
            document.body.style.background = 'linear-gradient(to right, #4b79a1, #283e51)';
            break;
        case 'thunderstorm':
            document.body.style.background = 'linear-gradient(to right, #373b44, #4286f4)';
            break;
        case 'snow':
            document.body.style.background = 'linear-gradient(to right, #e6dada, #274046)';
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
            document.body.style.background = 'linear-gradient(to right, #3e5151, #decba4)';
            break;
        default:
            document.body.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
    }
}
