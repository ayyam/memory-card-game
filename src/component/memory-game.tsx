
"use client";
import { UseGameState } from "@/hook/usegamestate";
import { useState, useEffect } from "react";


// Card data structure
const cardData = [
    { id: 1, value: '🐶' },
    { id: 2, value: '🐱' },
    { id: 3, value: '🐭' },
    { id: 4, value: '🐹' },
    { id: 5, value: '🐰' },
    { id: 6, value: '🦊' },
    { id: 7, value: '🐻' },
    { id: 8, value: '🐼' }
];


// Sample Card component structure
const Card = ({ onClick, card }) => {
    return (
        <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card.id)}>
            <div className="front">
                {card.isFlipped && <span>{card.value}</span>}

            </div>
            <div className="back"></div>
        </div>
    )
};

// Sample Game component structure
export const MemoryGame = () => {

    const { cards, flipCard, moves, matches, gameOver, restartGame } = UseGameState(cardData)

    return (
        <>
            <h1 className="text-center text-2xl mb-4"> Memory card game</h1>

            <div className="grid grid-cols-4 gap-4">
                {cards.map(card => (
                    <Card key={card.id} card={card} onClick={flipCard} />
                ))}
            </div>
            <div className="mt-4">
                <p>moves: {moves}</p>
                <p>matches: {matches}</p>
                {gameOver && <p className="text-green-500"> You win </p>}
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={restartGame}> Restart</button>
            </div>
        </>
    )
};