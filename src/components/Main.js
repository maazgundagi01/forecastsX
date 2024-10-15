import heropic from '../media-library/hero-pic-home.jpg'
import { useState, useEffect } from "react"

export let Main = () =>{
    //Initializing variables using useState hook
    const [weatherData, setWeatherData] = useState(null)
    const [queryData, setQueryData] = useState(null)
    const [queryLat, setQueryLat] = useState(0)
    const [queryLong, setQueryLong] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const apiKey = process.env.REACT_APP_WEATHER1  //Fetch and store API key from .env
    
    let fetchWeather = (fetchLat, fetchLong) =>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${fetchLat}&lon=${fetchLong}&appid=${apiKey}`)
        .then(response => response.json()) //.then((response) => {return (response.json())})
        .then(data => setWeatherData(data)) //.then((data) => {setWeatherData(data)})
        .catch(error => console.log(error)); //.then((error) => {return (error)})
    }

    let fetchLocations = (fetchLocation)=>{
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${fetchLocation}&limit=5&appid=${apiKey}`)
        .then(response => response.json()) //.then((response) => {return (response.json())})
        .then(data => setQueryData(data)) //.then((data) => {setWeatherData(data)})
        .catch(error => console.log(error)); //.then((error) => {return (error)})
    }

    let handleFetch = (fetchLat, fetchLong) =>{
        fetchWeather(fetchLat, fetchLong)
    }
    useEffect(()=>{
        fetchLocations(searchQuery)  //using useEffect so that the the locations are fetched after the searchQuery Value is updated.
    }, [searchQuery])

    let updateCoords =()=> {
        if(queryData && queryData.length > 0){
            setQueryLat(queryData[0].lat)
            setQueryLong(queryData[0].lon)
        }
        else{}
    }
    useEffect(()=>{
        updateCoords()
    }, [queryData])
    return(
        <main>
            <section className="full-in weather-section pd-0">
                <div className="inner-wrapper-1col cc-mob pd-0">
                    <div className="statement">
                            <div className='form-1-div-1'>
                                <h1 className='big-search-h1 txt-center'><label className='big-search txt-center'>Search Location</label></h1>
                                <div className='inner-1'>
                                    <input className="search-input" name='sq' type='text' value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}></input>
                                    <button className='submit-1' onClick={ () => handleFetch(queryLat, queryLong) }>Search</button>
                                </div>
                                <div className='inner-2'>
                                    <h2>(or) Advanced</h2>
                                </div>
                                    <div className='inner-3'>
                                        <div>
                                            <label>Latitude</label>
                                            <input name='lat' type='text' value={queryLat} onChange={(e) => setQueryLat(e.target.value)}></input>
                                        </div>
                                        <div>
                                            <label>Longitude</label>
                                            <input name='long' type='text' value={queryLong} onChange={(e) => setQueryLong(e.target.value)}></input>
                                        </div>
                                    </div>
                            </div>
                    </div>
                </div>
            </section> 
            <section className="full-in data-section pd-0">
                <div className=" ">
                    {//queryData?.[0]?.name
                        weatherData? (
                            <div className='info-wrap'>
                                <div className='info-summary'>
                                    <h2>{(weatherData.name)}, {(weatherData.sys.country)} | {(weatherData.main.temp - 273).toFixed(0)}°C | {weatherData.weather?.[0].main} </h2>
                                    <p>{weatherData.weather?.[0].description}</p>
                                </div>
                                <div className='info-inner-wrap'>
                                    <div>
                                        <p><b>Temperature:</b> {(weatherData.main.temp - 273).toFixed(0)} °C</p>
                                        <p><b>Feels Like:</b> {(weatherData.main.temp - 273).toFixed(0)} °C</p>
                                        <p><b>Visibility: </b>{(((weatherData.visibility)/10000)*100).toFixed(2)}%</p>
                                        <p><b>Wind: </b> {(weatherData.wind.speed)} meter/sec</p>
                                        
                                    </div>
                                    <div>
                                        <p><b>Weather:</b> {(weatherData.weather?.[0].main)}</p>
                                        <p><b>Cloud Coverage:</b> {(weatherData.clouds.all).toFixed(0)}%</p>
                                        <p><b>Humidity:</b> {(weatherData.main.humidity)}</p>
                                        <p><b>Precipitation(mm): </b> {(weatherData.rain?.['1h'] ?? 'No data')} </p>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <p>
                                Search something
                            </p>
                        )
                    }
                </div>
            </section>
        </main>
    )
}