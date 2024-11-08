import { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './MusicPlayer.css'
import musicsData from './music.json'

function MusicCard({ musicData, playNext, playPrev}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(musicData.path, { volume: 0.5 })
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 1000);
        return () => {
            clearInterval(interval)
            if (sound) {
                pause();
            }
        }

    }, [sound]);

    const endMusic = () => {
        setIsPlaying(false);
        if (sound) {
            pause();
        }
    }
    const startMusic = () => {
        setIsPlaying(true);
        play();
    }
    const playingButton = () => {
        if (isPlaying) {
            endMusic();
            return;
        }
        startMusic()
    }
    const formatSeconds = (sec) => {
        return sec < 10 ? "0" + sec : sec;
    }


    return (
        <>
            <div className='music_card_wrapper'>
                <div className='player_img'>
                    <img src={musicData.src} alt={musicData.name} />
                </div>
                <h1 className='music_name'>{musicData.name}</h1>
                <p className='music_artist'>{musicData.artist}</p>

                <div className='player_progress'>
                    <div className='music_progress' style={{ 'width': seconds / duration * 100000 + "%" }}></div>
                    <div className='music_time_indicators'>
                        <span className='current_time'>{Math.floor(seconds / 60)}:{formatSeconds(Math.floor(seconds % 60))}</span>
                        <span className='music_duration'>{Math.floor(duration / 1000 / 60)}:{formatSeconds(Math.floor(duration / 1000 % 60))}</span>
                    </div>
                </div>
                <div className='music_player_controls'>
                    <button className='prev_music_btn' onClick={() => { endMusic(); setSeconds(0); playPrev(); }}></button>
                    <button className={isPlaying ? 'pause_music_btn' : 'play_music_btn'} onClick={playingButton}></button>
                    <button className='next_music_btn' onClick={() => { endMusic(); setSeconds(0); playNext() }}></button>
                </div>
            </div>
        </>
    )
}
export function MusicPlayer({ setOpened }) {
    const MUSICS = [...musicsData];
    const [playingIndex, setIndex] = useState(0);

    const playNext = () => {
        if (playingIndex + 1 === MUSICS.length) {
            setIndex(0);
            return
        }
        setIndex(playingIndex + 1);
    }
    const playPrev = () => {
        if (playingIndex - 1 < 0) {
            setIndex(MUSICS.length - 1);
            return;
        }
        setIndex(playingIndex - 1);
    }

    return (
        <div className='music_player_wrapper'>
            <MusicCard musicData={MUSICS[playingIndex]} playNext={playNext} playPrev={playPrev} setOpened={setOpened} />
        </div>
    )
}
