import React, {useState} from 'react';


const api = {
  key: "0a2df7d88ca8849ed565d07e8a72fb7c",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  var unit = {
    name: 'imperial',
    abrev: 'F'
  }



  const search = evt => {
    if(evt.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=${unit.name}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          });
        }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  function changeUnit() {
    if(unit.name = 'imperial'){
      unit.name = ('metric');
      unit.abrev = ('C');
    }
    if(unit = 'metric'){
      unit.name = 'imperial';
      unit.abrev = 'F';
    }
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="switch-unit">
            <input 
              type="checkbox"
              id="toggle"
              className="checkbox"
              onChange= {changeUnit}
            />
          <label htmlFor="toggle" className="switch" />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)} ° {unit.abrev}
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
