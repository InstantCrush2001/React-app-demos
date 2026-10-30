// Proyecto 2 - Pokemon Memory Game

import { useState, useEffect } from "react";
import Card from "./P3_Components/card";
import Score from "./P3_Components/scoreboard";

function ResetButton({onResetClicked}){
    return (
    <button onClick = {onResetClicked} >
        <span>Try Again</span>
    </button>)
}

function shuffle(cards){
    // Implementación del algoritmo Fisher-Yates

    // 1. Creamos una copia para no mutar el estado anterior directamente
    const copyCards = [...cards];

    // 2. Aplicamos el algoritmo de atrás hacia adelante
    for (let i = copyCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
    // Intercambio de elementos (Destructuring assignment)
    [copyCards[i], copyCards[j]] = [copyCards[j], copyCards[i]];
    }
    return copyCards;
}

function fetchData(url){
    return fetch(url)
    .then(res => res.json())
    .then(data => ({
        id: data.id, 
        tag: data.name, 
        img: data.sprites.other.home.front_default
    }));
}

export default function PokeApp(){

    const [cards, setCards] = useState([])
    const [clickedCards, setClickedCards] = useState([])
    const [bestScore, setBestScore] = useState(0)
    const [hasWon, setHasWon] = useState(false); 

    useEffect(() => {
        const urls = Array.from({ length: 12 }, (_, i) => "https://pokeapi.co/api/v2/pokemon/" + (i + 1))
        Promise.all(urls.map(fetchData))
            .then(pokemons => setCards(shuffle(pokemons)));
        }, []);

    function handleClick(id){
        
        if (clickedCards.includes(id)) {
            setClickedCards([]);
        } else {
            let newScore = clickedCards.length + 1;
            setClickedCards([...clickedCards, id]);
            if (newScore > bestScore){
                setBestScore(newScore)
            }
            if (newScore === cards.length ) {                   
                setHasWon( true );
            }
        }
        setCards(prev => shuffle(prev));
    }

    function handleReset(){
        setHasWon(false);
        setClickedCards([]);
        setCards(prev => shuffle(prev));
    }

    if (cards.length === 0){
        return <p>Cargando...</p>;
    }
    return(
        <div>
            <div>
            <h1>Poke-Memory</h1>
            <h2>By El empinado 29/10/26</h2>
            </div>
            <Score score={clickedCards.length} best={bestScore}/>
            <div className="cards">
            {cards.map(({id, tag, img}) => (
                <Card key= {id} name={tag} image={img} hasWon= {hasWon} onCardClicked={() => handleClick(id)}/>
            ))}
            </div>
            {hasWon && (
            <div>
                <h1 className="score">Victory!!!</h1> 
                <ResetButton onResetClicked = {handleReset}/>
            </div>
            )}
        </div>
    );
}