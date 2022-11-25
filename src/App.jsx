import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const date = new Date();
  const d = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = d[date.getDay()];

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('toronto')
  const [searchCity, setSearchCity] = useState('')
  
  

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7920730785608c6419ebd4054ac56984`)
    .then((response) => response.json())
    .then(data => {
      console.log(data)
      if(data.cod !== 200){
        throw new Error('City not found')
      }
      setWeather(data)
    }).catch((error) => {
      console.log(error)
      setCity('toronto')
    }
    )
  }, [city])
  
  const onSubmit = (event) => {
    event.preventDefault();
    setCity(searchCity)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center">
<form onSubmit={onSubmit} className="flex flex-col bg-gray-800 rounded p-4 w-full max-w-xs rounded-3xl">
          <input className="input rounded-3xl text-center bg-gray-600" placeholder="search city" onChange={e => setSearchCity(e.target.value)} value={searchCity}></input>
						<div className="font-bold text-xl text-white">{weather ? weather.name : "toronto"}</div>
						<div className="text-medium text-blue-500">{date.getFullYear()}/11/{date.getDate()}</div>
            <div className="text-medium text-blue-500">{day}</div>
						<div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
            <img src={`https://openweathermap.org/img/wn/${weather ? weather.weather[0].icon : ''}@2x.png`} alt='' />
						</div>
						<div className="flex flex-row items-center justify-center mt-6">
							<div className="font-medium text-6xl text-white"> {weather ? Math.round(weather.main.temp) : '10'}°</div>
							<div className="flex flex-col items-center ml-6">
								<div className="text-white text-3xl capitalize">{weather ? weather.weather[0].description : 'N'}</div>
								<div className="mt-1">
									<span className="font-medium text-medium text-white">Max </span>
									<span className="text-medium text-blue-500">{weather ? Math.round(weather.main.temp_max) : "23"}°C</span>
								</div>
								<div>
                <span className="font-medium text-medium text-white">Min </span>
									<span className="text-medium text-blue-500">{weather ? Math.round(weather.main.temp_min) : "8"}°C</span>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between mt-6">
							<div className="flex flex-col items-center">
								<div className="font-medium text-medium text-white">Wind</div>
								<div className="text-medium text-blue-500">{weather ? Math.round(weather.wind.speed) : '20'}km/h</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="font-medium text-medium text-white">Humidity</div>
								<div className="text-medium text-blue-500">{weather ? weather.main.humidity : '70'}%</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="font-medium text-medium text-white">Visibility</div>
								<div className="text-medium text-blue-500">{weather ? weather.visibility / 1000 : '210'}km</div>
							</div>
              <div className="flex flex-col items-center">
								<div className="font-medium text-medium text-white">Pressure</div>
								<div className="text-medium text-blue-500">{weather ? weather.main.pressure : '33333'}mb</div>
							</div>
						</div>
					</form>
</div>
  )
}

export default App
