// Proyecto 2 - Pokemon Memory Game

import { useState, useEffect } from "react";
import Card from "./P3_Components/card";
import Score from "./P3_Components/scoreboard";
import logo from "./assets/react.svg";

let poke = [
        {id: 1, tag: "Pikachu", img: logo },
        {id: 2, tag: "Charizard", img: logo },
        {id: 3, tag: "Blastoise", img: logo },
        {id: 4, tag: "Venusaur", img: logo },
        {id: 5, tag: "Mewtwo", img: logo },
        {id: 6, tag: "Articuno", img: logo },
        {id: 7, tag: "Zapdos", img: logo },
        {id: 8, tag: "Moltres", img: logo },
        {id: 9, tag: "Machamp", img: logo },
        {id: 10, tag: "Koffing", img: logo },
        {id: 11, tag: "Diglett", img: logo },
        {id: 12, tag: "Ditto", img: logo },
    ];


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

export default function PokeApp(){

    const [cards, setCards] = useState(poke)
    const [clickedCards, setClickedCards] = useState([])
    const [bestScore, setBestScore] = useState(0)

    function handleClick(id){
        
        if (clickedCards.includes(id)) {
            setClickedCards([]);
        } else {
            let newScore = clickedCards.length + 1;
            setClickedCards([...clickedCards, id]);
            if (newScore > bestScore){
                setBestScore(newScore)
            }
        }
        setCards(prev => shuffle(prev));
    }


    return(
        <div>
            <Score score={clickedCards.length} best={bestScore}/>
            {cards.map(({id, tag, img}) => (
                <Card key= {id} name={tag} image={img} onCardClicked={() => handleClick(id)}/>
            ))}
        </div>
    );
}