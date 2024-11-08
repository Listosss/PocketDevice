import weatherIcons from '../weatherIcons.json'
import React, { useEffect, useState, useRef } from 'react'
import './CityForecast.css'

const HourWeatherCard = ({ data, src }) => {
    const date = new Date(data.dt_txt);

    return (
        <div className='wthr_card_wrapper'>
            <p className='wthr_card_hour'>{date.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
            <div className='wthr_card_icon'>
                <img alt='wthr_icon' src={src} />
            </div>
            <p className='wthr_card_main'>{Math.round(data.main.temp_max)}°C</p>
            <p className='wthr_card_descr'>{data.weather[0].main}</p>
        </div>
    )
}
const DayWeatherCard = ({ data, src, setDay }) => {
    const date = new Date(data.dt_txt);

    return (
        <div className='wthr_card_wrapper' onClick={() => { setDay(data.dt_txt.split(" ")[0]) }}>
            <div className='wthr_date_info_div'>
                <p className='wthr_card_weekday'>{date.toLocaleString("en", { weekday: 'long' })}</p>
                <p className='wthr_card_date'>{`${date.toLocaleString("en", { day: "numeric" })} ${date.toLocaleString("en", { month: "long" }).slice(0, 3)} `}</p>
            </div>
            <div className='wthr_card_icon'>
                <img alt='wthr_icon' src={src} />
            </div>
            <p className='wthr_card_main'>{Math.round(data.main.temp_max)}°C</p>
            <p className='wthr_card_descr'>{data.weather[0].main}</p>
        </div>
    )
}
export function CityForecast({ isLoading, city, weatherData, setOpenedForm }) {
    const [hourlyDayForecast, setDay] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const containerRef = useRef(null);


    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const containerWidth = container.offsetWidth;
            console.log(containerWidth)
            if (containerWidth > 350) {
                setItemsPerPage(5);
            } else if (containerWidth < 350) {
                setItemsPerPage(4);
            }
        };
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(weatherData.filter(data => data.dt_txt.includes(hourlyDayForecast)).length / itemsPerPage))
    }, [hourlyDayForecast, weatherData, itemsPerPage]);

    const getWeatherIcon = (id) => {
        if (id >= 200 && id <= 232)
            return weatherIcons["2"];
        else if (id >= 300 && id <= 531)
            return weatherIcons["3"];
        else if (id >= 600 && id <= 622)
            return weatherIcons["6"];
        else if (id >= 701 && id <= 781)
            return weatherIcons["7"];
        else if (id === 800)
            return weatherIcons["800"];
        else if (id >= 801 && id <= 804)
            return weatherIcons["8"];
    }

    return (
        <>
            <button className='weatherApp_back_btn' onClick={hourlyDayForecast ? () => { setDay(""); setPage(1) } : () => setOpenedForm(true)}></button>
            <p className='city_name'>{city}</p>
            {isLoading && <p className='message_txt'>Loading...</p>}
            {(!weatherData.length && !isLoading) && <p className='message_txt'>Nothing found...</p>}

            <div className='forecast5days_div' ref={containerRef}>
                {(weatherData.length > 0 && !hourlyDayForecast) &&
                    <>
                        <button className='weather_page_btn_prev' hidden={page === 1} onClick={() => { setPage(page - 1) }} />
                        {weatherData.filter(data => data.dt_txt.includes("12:00:00")).map((data, index) =>
                            <DayWeatherCard key={index} data={data} src={getWeatherIcon(data.weather[0].id)} setDay={setDay} />)}
                    </>}</div>


            {hourlyDayForecast && <div className='forecast5days_div' >
                <p className='hourly_forecast_day'>{`${new Date(hourlyDayForecast).toLocaleString("en", { day: "numeric" })} ${new Date(hourlyDayForecast).toLocaleString("en", { month: "long" })} `}</p>
                <button className='weather_page_btn_prev' hidden={page === 1} onClick={() => { setPage(page - 1) }} />
                {weatherData.filter(data => data.dt_txt.includes(hourlyDayForecast))
                    .slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage).map((data, index) =>
                        <HourWeatherCard key={index} data={data} src={getWeatherIcon(data.weather[0].id)} />)}
                <button className='weather_page_btn_next' hidden={page === totalPages} onClick={() => { setPage(page + 1) }} />
            </div >}


        </>
    )

}