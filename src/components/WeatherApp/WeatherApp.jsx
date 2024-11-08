import React, { useState } from 'react'
import './WeatherApp.css'
import { WeatherCityForm } from './WeatherCityForm/WeatherCityForm';
import { CityForecast } from './CityForecast/CityForecast';


export function WeatherApp() {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [openForm, setOpenedForm] = useState(true);

    const CACHE_TIME = 60 * 60 * 1000;

    const getWatherData = async () => {
        setIsLoading(true);

        const cachedData = localStorage.getItem(`weatherData_${city}`)
        if(cachedData){
            const {data, timestamp} = JSON.parse(cachedData);
            const currentTime = new Date().getTime();

            if(currentTime - timestamp< CACHE_TIME){
                setCity(data.city.name);
                setWeatherData(data.list);
                setIsLoading(false);
                return;
            }
        }
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&&lang=en&units=metric&APPID=647b68a903d9058f4065c35c9414c00f`)
            let data = await response.json();

            const cachedData = {
                data,
                timestamp: new Date().getTime(),
            };
            localStorage.setItem(`weatherData_${city}`,JSON.stringify(cachedData))
            setCity(data.city.name)
            setWeatherData(data.list);
        }
        catch (error) {
            console.error("Ошибка запроса:", error);
        }
        finally {
            setIsLoading(false)
        }

    }
    function findCityForecast(e) {
        if(city){
        e.preventDefault();
        setWeatherData([])
        getWatherData();
        setOpenedForm(false)}
    }

    return (
        <div className='weatherApp_wrapper'>
            <h1 className='weatherApp_title'>Weather 5Day Forecast</h1>
            {openForm ?
                <WeatherCityForm city={city} setCity={setCity} findCityForecast={findCityForecast} /> :
                <CityForecast isLoading={isLoading} city={city} weatherData={weatherData} setOpenedForm={setOpenedForm} />}
        </div>
    )
}

