import './MemoryGame.css';
import '../../fonts/FatPix-SVG.ttf'
import '../../fonts/fibberish.ttf'
import { useState, useEffect } from 'react';
import gameCards from './cards.json'
import { v4 as uuidv4 } from 'uuid'

function MemoryCard({ card, flipped, chooseCard }) {
    const cardClickHandle = () => {
        chooseCard(card)
    }
    return (
        <div className={`memory_card ${flipped ? "matched" : ""}`} onClick={cardClickHandle}>
            <img className='memory_card_img' src={card.src} alt=''/>
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 32 32" id="blackquestionmark_Dark" data-name="blackquestionmark/Dark" className='memory_card_back'>
                <path id="Path" d="M0,0H10V2H8V4H6V6H4v6H6v2H8V12h2V10h4v4H12v6h2v2H12v2H10v4h2v2h2v2H0Z" fill="none" />
                <path id="Path-2" data-name="Path" d="M6,0H16V2h2V4h2V6h2v6H20v2H18v2H16v2H14v2H12v2h2v2h2v4H14v2H12v2H10V30H8V28h2V26h2V24H8V22h2V20H8V14h2v4h2V14h2V8H12V6H6V8H4v2H6v2H4v2H2V12H0V6H2V4H4V2H6Z" transform="translate(4)" fill="white" />
                <path id="Path-3" data-name="Path" d="M4,0H16V32H0V30H2V28H4V24H2V22H0V20H2V18H4V16H6V14H8V12h2V6H8V4H6V2H4Z" transform="translate(16)" fill="none" />
                <path id="Path-4" data-name="Path" d="M0,0H6V2H0Z" transform="translate(10 6)" fill="none" />
                <path id="Path-5" data-name="Path" d="M0,0H2V2H0Z" transform="translate(8 8)" fill="none" />
                <path id="Path-6" data-name="Path" d="M0,0H6V6H4V2H0Z" transform="translate(10 8)" fill="#ffffff" />
                <path id="Path-7" data-name="Path" d="M0,0H2V6H0Z" transform="translate(16 8)" fill="none" />
                <path id="Path-8" data-name="Path" d="M0,0H2V4H0Z" transform="translate(14 14)" fill="none" />
                <path id="Path-9" data-name="Path" d="M0,0H2V4H0Z" transform="translate(10 24)" fill="#ffffff" />
                <path id="Path-10" data-name="Path" d="M0,0H4V2H2V4H0Z" transform="translate(12 24)" fill="none" />
            </svg>
        </div>
    )
}

export const MemoryGame = ({setOpened}) => {
    const [cards, setCards] = useState([]);
    const [cardOne, setCardOne] = useState(null);
    const [cardTwo, setCardTwo] = useState(null);
    const [isWin, setWin] = useState(false);
    const [canChoose, setCanChoose] = useState(false)

    const startGame = () => {
        setCanChoose(false)
        setWin(false);

        const newCards = [...gameCards, ...gameCards].sort(() => Math.random() - 0.5).map(card => ({ ...card, id: uuidv4() }));
        setCards(newCards);

        setTimeout(() => {
            setCards(newCards.map(card => ({ ...card, matched: true })))
        }, 500)

        setTimeout(() => {
            setCards(newCards)
            setCanChoose(true)
        }, 3000)
    }

    const chooseCard = (card) => {
        if (canChoose) cardOne ? (card !== cardOne && setCardTwo(card)) : setCardOne(card);
    }

    const exitGame = () => {
        setCards([])
    }
    useEffect(() => {
        if (cardOne && cardTwo) {
            setCanChoose(false)
            if (cardOne.src === cardTwo.src) {
                cardOne.matched = cardTwo.matched = true;
                if (cards.every(card => card.matched))
                    setTimeout(() => { setWin(true) }, 500)
            }
            setTimeout(()=>{ setCardOne(null);
                setCardTwo(null);
                setCanChoose(true)}, 500)
        }
    }, [cardOne, cardTwo, cards]);

    return (<div className='memory_game_wrapper'>
        {cards.length ?
            <>
            {!isWin && 
            <svg className='memory_game_back_btn' xmlns="http://www.w3.org/2000/svg"  onClick={exitGame}  x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
                <path d="M 13 4 L 13 6 L 9 6 L 9 8 L 5 8 L 5 10 L 2 10 L 2 11 L 2 12 L 2 13 L 4 13 L 4 28 L 28 28 L 28 13 L 30 13 L 30 12 L 30 11 L 30 10 L 27 10 L 27 9 L 27 8 L 27 4 L 25 4 L 25 8 L 23 8 L 23 6 L 19 6 L 19 4 L 13 4 z M 14 7 L 18 7 L 18 8 L 18 9 L 22 9 L 22 10 L 22 11 L 26 11 L 26 12 L 26 13 L 26 26 L 22 26 L 22 14 L 10 14 L 10 26 L 6 26 L 6 13 L 6 12 L 6 11 L 10 11 L 10 10 L 10 9 L 14 9 L 14 8 L 14 7 z M 12 16 L 20 16 L 20 20 L 18 20 L 18 22 L 20 22 L 20 26 L 12 26 L 12 16 z"></path>
                </svg>
            }
                <div className='mgame_block'>
                    {cards.map((card) => <MemoryCard key={card.id} card={card} chooseCard={chooseCard} flipped={card === cardOne || card === cardTwo || card.matched} />)}
                </div>

            {isWin && <div className='congratulations_div'>
                    <h1>Congratulations!</h1>
                    <button onClick={startGame}>Replay</button>
                    <button onClick={exitGame}>Exit</button>
                </div>}
            </>
            : <> 
            <h1 className='memory_game_title'>Memory Game</h1>
                <button className='start_memory_game' onClick={startGame}>Start</button></>}
    </div>)
}