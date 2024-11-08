import { useState, useContext, createContext } from 'react'
import { TodoWrapper } from '../Todo/TodoWrapper/TodoWrapper'
import { MemoryGame } from '../MemoryGame/MemoryGame';
import { GoogleSearch } from '../GoogleSearch/GoogleSearch';
import { StyleBackground } from '../StyleBackground/StyleBackground';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { DrawApp } from '../DrawApp/DrawApp';
import { WeatherApp } from '../WeatherApp/WeatherApp';
import './Desktop.css'
import '../../fonts/fibberish.ttf'
import '../../fonts/m5x7.ttf'
import '../../fonts/FatPix-SVG.ttf'
import { Chat } from '../Chat/Chat';

import { HanoiTowersStart } from '../HanoiTowers/HanoiTowersStart';


const AppWindowContext = createContext();

function Shortcut({ clickEvent, name, src, gridArea }) {
    return (<div className='desktop_shortcut' style={{ 'gridArea': gridArea }}>
        <img className=" shortcut " src={src} onDoubleClick={clickEvent} alt={name} />
        <p className='shortcut_name'>{name}</p>
    </div>)
}

function AppWindow({ childComponent, windowIndex, setOpened }) {
    const { windowsZIndex, updateZIndex } = useContext(AppWindowContext);

    const [isMoving, setIsMoving] = useState(false);
    const [position, setPosition] = useState({ left: "1%", top: "3%" });
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [windowParams, setWinParams] = useState({ width: 0, height: 0 })

    const windowCapture = (e) => {
        setIsMoving(true);
        const rect = e.currentTarget.getBoundingClientRect();

        setMouseOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setWinParams({
            width: rect.width,
            height: rect.height
        });
        updateZIndex(windowIndex)
    };

    const moveWindow = (e) => {
        if (isMoving) {
            const desktopScreen = document.querySelector('.desktop_screen');
            const screenRect = desktopScreen.getBoundingClientRect();

            const newLeft = e.clientX - screenRect.left - mouseOffset.x;
            const newTop = e.clientY - screenRect.top - mouseOffset.y;

            const checkRightBorder = e.clientX - mouseOffset.x + windowParams.width <= screenRect.right;
            const checkBottomBorder = e.clientY - mouseOffset.y + windowParams.height <= screenRect.bottom;
            if (newLeft > 0 && newTop > 0 && checkRightBorder && checkBottomBorder) {
                setPosition({
                    left: newLeft,
                    top: newTop,
                });
            }

        }
    };
    const windowLeaving = () => {
        setIsMoving(false);
    };

    return (
        <div className='app_window' style={{
            position: 'absolute',
            left: `${position.left}px`,
            top: `${position.top}px`,
            zIndex: windowsZIndex[windowIndex]
        }} onMouseDown={windowCapture} onMouseMove={moveWindow}
            onMouseUp={windowLeaving}>
                <button className='close_btn' onClick={() => { setOpened(false)}}>x</button>
                {childComponent}</div>
    )
}
export default function Desktop() {
    const [todoOpened, changeTodoOpened] = useState(false);
    const [memoryGame, changeMemoryGameOpened] = useState(false);
    const [googleSearch, changeGoogleSearch] = useState(false);
    const [styleBG, changeStyleBG] = useState(false);
    const [screenBG, changeScreenBG] = useState("./assets/backgroundApp/wallpaper1.jpg");
    const [musicPlayer, changeMusicPlayer] = useState(false);
    const [drawApp, changeDrawApp] = useState(false);
    const [weatherApp, changeWeatherApp] = useState(false);
    const [chatApp, changeChatApp] = useState(false);
    const [towersApp, changeTowersApp] = useState(false);
    const [windowsZIndex, setWindowsZIndex] = useState([2, 2, 2, 2, 2, 2, 2, 2, 2]);

    const [catIsTouched, setIsTouched] = useState(false);

    const updateZIndex = (activeIndex) => {
        setWindowsZIndex(windowsZIndex.map((_, index) => (index === activeIndex ? 100 : 2)));
    };

    return (
        <div className='desktop_wrapper'>
            <div className='laptop'>
                <div className="desktop_screen" style={{ 'backgroundImage': `url(${screenBG})` }} >
                    <AppWindowContext.Provider value={{ windowsZIndex, updateZIndex }}>
                        <Shortcut clickEvent={() => { changeTodoOpened(true) }} name={"To-do list"} src={'./assets/shortcuts/todo_shortcut.png'} gridArea={'to-do'} />
                        {todoOpened && <AppWindow windowIndex={0} childComponent={<TodoWrapper  />} setOpened={changeTodoOpened}/>}

                        <Shortcut clickEvent={() => { changeMemoryGameOpened(true) }} name={"Memory Game"} src={'./assets/shortcuts/memoryGame_shortcut.png'} gridArea={'game'} />
                        {memoryGame && <AppWindow windowIndex={1} childComponent={<MemoryGame />} setOpened={changeMemoryGameOpened} />}

                        <Shortcut clickEvent={() => { changeGoogleSearch(true) }} name={"Google"} src={'./assets/shortcuts/search_shortcut.png'} gridArea={'google'} />
                        {googleSearch && < AppWindow windowIndex={2} childComponent={<GoogleSearch  />} setOpened={changeGoogleSearch}/>}

                        <Shortcut clickEvent={() => { changeStyleBG(true) }} name={"Background"} src={'./assets/shortcuts/styleBG_shortcut.png'} gridArea={'style-bg'} />
                        {styleBG && <AppWindow windowIndex={3} childComponent={<StyleBackground  choosedBG={screenBG} changeBG={changeScreenBG} />} setOpened={changeStyleBG}/>}

                        <Shortcut clickEvent={() => { changeMusicPlayer(true) }} name={"Music"} src={'./assets/shortcuts/musicPlayer_shortcut.png'} gridArea={'music'} />
                        {musicPlayer && <AppWindow windowIndex={4} childComponent={<MusicPlayer />} setOpened={changeMusicPlayer} />}

                        <Shortcut clickEvent={() => { changeDrawApp(true) }} name={"Draw"} src={'./assets/shortcuts/draw_shortcut.png'} gridArea={'draw'} />
                        {drawApp && <AppWindow windowIndex={5} childComponent={<DrawApp />} setOpened={changeDrawApp}/>}

                        <Shortcut clickEvent={() => { changeWeatherApp(true) }} name={"Weather"} src={'./assets/shortcuts/weatherApp_shortcut1.png'} gridArea={'weather'} />
                        {weatherApp && <AppWindow windowIndex={6} childComponent={<WeatherApp/>}  setOpened={changeWeatherApp} />}

                        <Shortcut clickEvent={() => { changeChatApp(true) }} name={"Chat:3"} src={'./assets/shortcuts/chatApp_shortcut.png'} gridArea={'chat'} />
                        {chatApp && <AppWindow windowIndex={7} childComponent={<Chat />} setOpened={changeChatApp}/>}

                        <Shortcut clickEvent={() => { changeTowersApp(true) }} name={"Hanoi Towers"} src={'./assets/shortcuts/hanoiTowers_shortcut.png'} gridArea={'hanoi'} />
                        {towersApp && <AppWindow windowIndex={8} childComponent={<HanoiTowersStart />} setOpened={changeTowersApp}/>}

                    </AppWindowContext.Provider>
                </div>
            </div>
            <div className={`cat ${catIsTouched? 'cat_touched':''}`} onClick={()=>{ 
                setIsTouched(true); 
                setTimeout(()=>{ setIsTouched(false)}, 2000)
                }}>

            </div>
        </div>
    )
}