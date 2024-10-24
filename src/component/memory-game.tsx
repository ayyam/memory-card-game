"use client";
import { useGameState } from "@/hook/usegamestate";
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

// Card component structure with styling
const Card = ({ onClick, card }) => {
    return (
        <div className={`card ${card.isFlipped ? 'flipped' : ''} w-20 h-28 md:w-24 md:h-32 bg-gray-800 rounded-lg shadow-lg cursor-pointer`} onClick={() => onClick(card.id)}>
            <div className="relative w-full h-full flex items-center justify-center text-4xl">
                {card.isFlipped ? (
                    <span className="text-white">{card.value}</span>
                ) : (
                    <span className="text-transparent">?</span>
                )}
            </div>
        </div>
    );
};

// Memory Game component structure
export const MemoryGame = () => {
    const { cards, flipCard, moves, matches, gameOver, restartGame } = useGameState(cardData);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-6">Memory Card Game</h1>

            <div className="grid grid-cols-4 gap-4">
                {cards.map(card => (
                    <Card key={card.id} card={card} onClick={flipCard} />
                ))}
            </div>

            <div className="mt-8">
                <p className="text-lg mb-2">Moves: {moves}</p>
                <p className="text-lg mb-4">Matches: {matches}</p>
                {gameOver && <p className="text-green-500 text-xl font-bold mb-4">You Win!</p>}
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300" onClick={restartGame}>Restart</button>
            </div>
        </div>
    );
};
