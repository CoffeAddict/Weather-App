function setBackgroundColor (weatherValue) {
    let day = new Date()
    let backgroundEl = document.getElementsByClassName("global-container")
    if (day.getHours() < 19) {
        // Day
        switch (true) {
            case (weatherValue >= 801):
                backgroundEl[0].setAttribute('style', 'background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);')
                break
            case (weatherValue >= 800):
                backgroundEl[0].setAttribute('style', 'background-image: linear-gradient(to top, #4481eb 0%, #04befe 100%);')
                break
            case (weatherValue >= 701):
                    backgroundEl[0].setAttribute('style', 'background: linear-gradient(-180deg, #BCC5CE 0%, #929EAD 98%), radial-gradient(at top left, rgba(255,255,255,0.30) 0%, rgba(0,0,0,0.30) 100%); background-blend-mode: screen;')
                    break
            case (weatherValue >= 600):
                    backgroundEl[0].setAttribute('style', `background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;`)
                    break
            case (weatherValue >= 500):
                    backgroundEl[0].setAttribute('style', `background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);`)
                    break
            case (weatherValue >= 300):
                    backgroundEl[0].setAttribute('style', `background-image: linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);`)
                    break
            case (weatherValue >= 200):
                    backgroundEl[0].setAttribute('style', `background-image: linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%); background-blend-mode: normal, lighten, soft-light;`)
                    break
            }
        } else {
            // Night
            switch (true) {
                case (weatherValue >= 801):
                    backgroundEl[0].setAttribute('style', 'background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);')
                    break
                case (weatherValue >= 800):
                        backgroundEl[0].setAttribute('style', 'background-image: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);')
                    break
                case (weatherValue >= 701):
                    backgroundEl[0].setAttribute('style', 'background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);')
                    break
                case (weatherValue >= 600):
                    backgroundEl[0].setAttribute('style', `background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; background-blend-mode: multiply,multiply;`)
                    break
                case (weatherValue >= 500):
                    backgroundEl[0].setAttribute('style', `background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);`)
                    break
                case (weatherValue >= 300):
                    backgroundEl[0].setAttribute('style', `background-image: linear-gradient(to top, #09203f 0%, #537895 100%);`)
                    break
                case (weatherValue >= 200):
                    backgroundEl[0].setAttribute('style', `background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);`)
                    break
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction)
    }
})

function successFunction (position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude

    getWeather(lat,lng)
}

function errorFunction () {
    console.error('Error trying to find location')
}

function setDataOnDOM (weatherData) {
    document.getElementById('city').innerHTML = weatherData.city
    document.getElementById('temp').innerHTML = weatherData.temp
    document.getElementById('humidity').innerHTML = weatherData.humidity
    document.getElementById('feels-like').innerHTML = weatherData.feelsLike
    setBackgroundColor(weatherData.weatherValue)
}

function getWeather (lat,lon) {
    if (!lat || !lon) {
        console.error("Missing Longitude or Latitude")
        return
    }

    let weather = {
        temp: "",
        city: "",
        humidity: "",
        feelsLike: ""
    }


    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=39fad7324f81694a6f2fa5b634959b9e&lon=${lon}&lat=${lat}&temp=celsius&units=metric`)
    .then(response => response.json())
    .then(data => {
        weather.city = data.city.name
        const lastWeatherData = data.list[data.list.length - 1]
        weather.temp = lastWeatherData.main.temp
        weather.humidity = lastWeatherData.main.humidity
        weather.feelsLike = lastWeatherData.main.feels_like
        weather.weatherValue = lastWeatherData.weather[0].id

        setDataOnDOM(weather)
    })
}