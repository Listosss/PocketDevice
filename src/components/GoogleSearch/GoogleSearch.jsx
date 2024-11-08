import { useState } from 'react';
import './GoogleSearch.css'

export const GoogleSearch = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchValue.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <div className='google_search_wrapper'>
            <div className='google_search_logo'><img src='./assets/GoogleApp/google_search.png' alt='google_logo' /></div>
            <form className='google_search_form' onSubmit={handleSearch}>
                <input type='text' onChange={(e) => { setSearchValue(e.target.value) }} value={searchValue} />
                <button type='submit'></button>
            </form>
        </div>
    )
}