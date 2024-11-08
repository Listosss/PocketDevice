import React, { useEffect, useState, useRef } from 'react'
import './HanoiTowers.css'

export function HanoiTowers({ disksNum, backToMenu }) {
    const [towers, setTowers] = useState([]);
    const [carryingDisk, setCarryingDisk] = useState({ disk: 0, fromTower: 0 });
    const [isDragging, setDragging] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [movesNumber, setMovesNumber] = useState(0);
    const [showRules, setShowRules] = useState(false)
    const [isWin, setIsWin] = useState(false);

    const towersDivRef = useRef(null);

    const startGame = () => {
        const filledFirstTower = Array.from({ length: disksNum }, (_, index) => index + 1);
        setTowers([[...filledFirstTower], [], []]);
        setMovesNumber(0);
        setCarryingDisk(0);
        setTimeout(() => { setShowRules(false) }, 3500)
    }

    useEffect(() => {
        setShowRules(true);
        startGame();
    }, [disksNum])

    useEffect(() => {
        if (towers[2]?.length === disksNum) setIsWin(true)
    }, [towers, disksNum])

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const hanoiTowersAuto = async (n, from, to) => {
        if (n === 1) {
            setTowers(prevTowers => {
                const newTowers = prevTowers.map(tower => [...tower]);
                if (newTowers[from].length) {
                    const disk = newTowers[from].shift();
                    newTowers[to].unshift(disk);
                    setMovesNumber(prevNum => prevNum + 1)
                }

                return newTowers;
            });
            await sleep(400);
            return;
        }
        const unusedTower = 3 - from - to;

        await hanoiTowersAuto(n - 1, from, unusedTower);

        setTowers(prevTowers => {
            const newTowers = prevTowers.map(tower => [...tower]);
            if (newTowers[from].length) {
                const disk = newTowers[from].shift();
                newTowers[to].unshift(disk);
            }
            setMovesNumber(prevNum => prevNum + 1)
            return newTowers;
        });
        await sleep(400);
        await hanoiTowersAuto(n - 1, unusedTower, to);

    }

    const setDarggingDisk = (tower_index, index) => {
        if (index === 0 && !carryingDisk) {
            setCarryingDisk({ disk: towers[tower_index][0], fromTower: tower_index });
            setDragging(true);
        }
    }
    const handleMouseDown = (e, tower_index, i) => {
        e.stopPropagation();
        const rect = towersDivRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top
        setMousePosition({ x, y });
        setDarggingDisk(tower_index, i);
        
    }

    const setDiskOnTower = (tower_index) => {
        if (carryingDisk.disk) {

            setTowers(prevTowers => {

                const newTowers = prevTowers.map(tower => [...tower]);
                if (!newTowers[tower_index].length || carryingDisk.disk < newTowers[tower_index][0]) {
                    newTowers[carryingDisk.fromTower].shift();
                    newTowers[tower_index].unshift(carryingDisk.disk);
                    setMovesNumber(moves => moves + 1)
                }
                return newTowers;
            })
        }
    }
    const handleMouseUp = (e) => {
        if (isDragging) {
            const towersDiv = towersDivRef.current;
            const towersDivRect = towersDiv.getBoundingClientRect();

            const mouseX = e.clientX - towersDivRect.left;
            const towerWidth = towersDivRect.width / towers.length;
            const towerIndex = Math.floor(mouseX / towerWidth);

            if (towerIndex >= 0 && towerIndex < towers.length) {
                setDiskOnTower(towerIndex);
            }
            setCarryingDisk(null);
            setDragging(false);

        }
    }
    const handleMouseMove = (e) => {
        if (isDragging) {
            e.stopPropagation();
            const rect = towersDivRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top
            setMousePosition({ x, y });
        }
    }

    return (
        <>
            {showRules && <h1 className='rules_text'>Move disks from tower 1 to tower 3</h1>}

            {isWin && <div className='towers_win_block'>
                <h1 className='win_text'>Win!</h1>
                <p className='win_moves_number'>{`Moves: ${movesNumber}`}</p>
                <button onClick={backToMenu}>Menu</button>
            </div>}

            {!isWin && <>
                <div className='game_btns_panel'>
                    <button onClick={backToMenu} className='back_to_towers_menu_btn'></button>
                    <button onClick={startGame} className='reset_towers_btn'></button>
                </div>

                <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className='towers_div' ref={towersDivRef}>
                    {towers.length && towers.map((tower, tower_index) =>
                        <div className='tower' key={tower_index} >
                            <div className="rod"></div>
                            {tower.length && tower.map((disk, i) => {
                                const isDraggingDisk = carryingDisk?.disk === disk;

                                return <div className='disk'
                                    key={i}
                                    style={{
                                        width:isDraggingDisk?disk * 100/disksNum/3+"%"  : disk * 100/disksNum + '%',
                                        height: disk * 5 + 'px',
                                        position: isDraggingDisk ? 'absolute' : 'relative',
                                        left: isDraggingDisk? mousePosition.x - disk * 15 + 'px' : '0',
                                        top: isDraggingDisk? mousePosition.y - disk * 2.5 + 'px' : '0',
                                        zIndex: isDraggingDisk? '1000' : '1',
                                        cursor: isDraggingDisk? 'grabbing' : 'grab'
                                    }}

                                    onMouseDown={(e) => { handleMouseDown(e, tower_index, i) }} />
                            })}
                        </div>)}
                </div>

                <div className='towers_tools_div'>
                    <p className='moves_number'>{`Moves: ${movesNumber}`}</p>
                    <button className="auto_play_btn" disabled={towers[0]?.length !== disksNum} onClick={() => hanoiTowersAuto(disksNum, 0, 2)}>Auto</button>
                </div></>}
        </>
    )
}
