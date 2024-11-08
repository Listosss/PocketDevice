import React, { useState } from 'react'
import './HanoiTowersStart.css'
import { HanoiTowers } from './HanoiTowers/HanoiTowers'

export function HanoiTowersStart() {
    const [startGame, setStart] = useState(false);
    const [disksNum, setDisksNum] = useState(3);

    const setActiveNum = (num) =>{
        if(disksNum===num) return 'active';
        return ''
    }
    return (
        <div className='hanoi_towers_wrapper'>
            {!startGame && <div className='hanoi_towers_start_menu'>
                <h1>Hanoi Towers Game</h1>
                <div className='game_settings_wrapper'>
                <p>Select number of disks:</p>
                <div className='choose_disks_num_grid'>
                    {[3,4,5,6].map((num, index)=>  <button key={index} className={setActiveNum(num)} onClick={()=>{setDisksNum(num)}}>{num}</button>)}
                </div></div>
                <button className='start_hanoi_towers_btn' onClick={()=>{setStart(true)}}>Start</button>
            </div>}
            {startGame && <HanoiTowers disksNum={disksNum} backToMenu={()=>{ setStart(false)}}/>}
        </div>
    )
}

