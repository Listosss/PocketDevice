import React from 'react'
import './WeatherCityForm.css'

export function WeatherCityForm({ city, setCity, findCityForecast }) {
  return (
    <div className='weather_form_wrapper'>
      <form onSubmit={findCityForecast}>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter city...'/>
        <button type='submit' className='todo-btn'>Find</button>
      </form></div>
  )
}
