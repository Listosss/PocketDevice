import React, { useRef, useState } from 'react'
import './DrawApp.css'

export function DrawApp() {
    const [color, setColor] = useState('');
    const COLORS = ["#cd5c5c", "#FCE883", "#AFDAFC", "#A8E4A0", "#292425", "#FFC1CC", "#FFBD88", "#ffd7d1", "#B39F7A", "white"];
    const [tool, setTool] = useState("brush")
    const [isPainting, setIsPainting] = useState(false);

    const colorInputRef = useRef(null)

    const paletteClick = () => {
        if (colorInputRef.current)
            colorInputRef.current.click();
    }
    const changeColor = (e) => {
        if (color && e.target.classList.contains("draw_cell")) {

            e.target.style.backgroundColor = color;

            if (tool === "eraser")
                e.target.style.borderColor = "#6b6b6b";

            else
                e.target.style.borderColor = color;
        }
    }
    const clearAll = () => {
        const cells = document.querySelectorAll('.draw_cell');
        cells.forEach(cell => {
            cell.style.backgroundColor = 'white';
            cell.style.borderColor = '#4e4e4e';
        });
    };
    return (
        <div className='draw_app_wrapper'>
            <div className='draw_app_canvas'>
                <div className='draw_field'
                    onMouseDown={(e) => { e.stopPropagation(); setIsPainting(true) }}
                    onMouseUp={() => { setIsPainting(false) }}
                    onMouseMove={(e) => { e.stopPropagation(); if (isPainting) changeColor(e) }}
                >
                    {[...Array(100)].fill(null).map((item, index) => <div key={index} className='draw_cell' onClick={changeColor} ></div>)}
                </div>
                <div className='palette'>
                    {COLORS.map((color, index) => <div onClick={() => { if (tool === "brush") setColor(color) }} key={index} className='palette_elem' style={{ 'backgroundColor': color }} />)}
                </div>
            </div>
            <div className='draw_app_tools'>
                <div className='tools_wrapper'>
                    <div className={`brush_btn ${tool === 'brush' ? ' active' : ''}`} onClick={() => { setTool("brush");; setColor("") }}></div>
                    <div className={`eraser_btn ${tool === 'eraser' ? ' active' : ''}`} onClick={() => { setTool("eraser"); setColor("white") }}></div>
                    <div className='color_picker_wrapper' onClick={paletteClick}>
                        <input type="color"
                            ref={colorInputRef}
                            onChange={(e) => setColor(e.target.value)}
                            className='rgb_palette' /></div>
                </div>
                <div className='clear_all_btn_wrapper'>
                    <button className='clear_all_btn' onClick={() => clearAll()}>Clear All</button>
                </div>
            </div>
        </div>

    )
}
