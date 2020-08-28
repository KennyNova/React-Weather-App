import React, {useState} from 'react';


const api = {
  key: "0a2df7d88ca8849ed565d07e8a72fb7c",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  var [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  var [unit, setUnit] = useState('imperial');
  var [unitAbrev, setUnitAbrev] = useState('F');
  const unitImperial = 'imperial';
  const unitMetric = 'metric';

  const maxTempF = 93;
  const minTempF = 45;

  const maxTempC = 34;
  const minTempC = 7;

  const [temperature, setTemperature] = useState(0);

  const [redVal, setRedVal] = useState(255 / (maxTempF - minTempF) * (temperature - minTempF));
  const [blueVal, setBlueVal] = useState(255 / (maxTempF - minTempF) * (maxTempF - temperature));

  const search = evt => {
 
    if(evt.key === "Enter" && unitAbrev === 'F') {
      fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setTemperature(result.main.temp)
        setRedVal(255 / (maxTempF - minTempF) * (result.main.temp - minTempF));
        setBlueVal(255 / (maxTempF - minTempF) * (maxTempF - result.main.temp));
      });
    }
    if(evt.key === "Enter" && unitAbrev === 'C') {
      fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setTemperature(result.main.temp)
        setRedVal(255 / (maxTempC - minTempC) * (result.main.temp - minTempC));
        setBlueVal(255 / (maxTempC - minTempC) * (maxTempC - result.main.temp));
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



  function tempColor(){
    if(unit === unitImperial){
      setRedVal(255 / (maxTempF - minTempF) * (temperature - minTempF));
      setBlueVal(255 / (maxTempF - minTempF) * (maxTempF - temperature));
    }
    if(unit === unitMetric){
      setRedVal(255 / (maxTempC - minTempC) * (temperature - minTempC));
      setBlueVal(255 / (maxTempC - minTempC) * (maxTempC - temperature));
    }
  }

  function changeUnit() {
    if(unit === unitMetric){
      setUnit('imperial');
      setUnitAbrev('F');

      if(query !== ''){
        fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setTemperature(result.main.temp)
        });
        tempColor();
      }
    }
    if(unit === unitImperial){
      setUnit('metric');
      setUnitAbrev('C');

      if(query !== ''){
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setTemperature(result.main.temp)
        });
        tempColor();
      }
    }
  }

  function clear() {
    fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result);
      setQuery('');
    });
  }

  return (
    <div className='app' > 
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
              onChange={e => setQuery(e.target.value)}
              value={query}
              onClick= {changeUnit}
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
            <div className="temp" style={{ color : `rgb(${redVal}, 0, ${blueVal})` }}>
              {Math.round(weather.main.temp)}°{unitAbrev}
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
          <div className="clear-box">
            <input 
              className="clear-button"
              type="button"
              value="Clear"
              onClick={clear}
            /> 
          </div>
      </main>
    </div>
  );
}

export default App;
