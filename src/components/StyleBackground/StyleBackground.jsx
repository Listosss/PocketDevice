import { useState } from 'react';
import './StyleBackground.css'
import wallpapersData from './wallpapers.json'

export function StyleBackground({choosedBG, changeBG}) {
    const BACKGROUNDS = [...wallpapersData];
    const [imageIndex, setIndex] = useState(0);

    const nextImage = () => {
        setIndex(imageIndex + 1)
    }
    const prevImage = () => {
        setIndex(imageIndex - 1)
    }
    const chooseNewBG=()=>{
        changeBG(BACKGROUNDS[imageIndex].src)
    }
    return (
        <div className='styleBG_wrapper'>
            <h1 className='styleBG_title'>Choose <span>&</span> <span>Customize</span></h1>
            <div className='backgound_slider'>
                <div className='bg_card'>
                    <div className='bg_example' style={{ 'backgroundImage': `url(${BACKGROUNDS[imageIndex].src})` }}></div>
                    <p className='bg_name'>{BACKGROUNDS[imageIndex].name}</p>
                </div>
                <button className='bg_choose_btn' onClick={chooseNewBG}>{choosedBG===BACKGROUNDS[imageIndex].src? "Chosen": "Choose"}</button>
            </div>

            {imageIndex < BACKGROUNDS.length - 1 && <button className='backgound_slider_next' onClick={nextImage}></button>}
            {imageIndex > 0 && <button className='backgound_slider_prev' onClick={prevImage}></button>}
        </div >
    )
}
