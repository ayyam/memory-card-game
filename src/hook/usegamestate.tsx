"use client";
import { useState, useEffect } from "react";

// Function to shuffle and create unique card pairs
const shuffleCards = (cards) => {
    const duplicatedCards = [...cards, ...cards.map(card => ({ ...card, id: card.id + '_duplicate' }))];
    const shuffled = duplicatedCards
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, isFlipped: false }));
    return shuffled;
}

// Custom hook to manage the game state
export const useGameState = (cardData) => {
    const [cards, setCards] = useState(shuffleCards(cardData));
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (firstCard && secondCard) {
            setDisabled(true);
            if (firstCard.value === secondCard.value) {
                setCards((prevCards) => prevCards.map(card =>
                    card.value === firstCard.value ? { ...card, isFlipped: true } : card
                ));
                setMatches(prev => prev + 1);
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [firstCard, secondCard]);

    useEffect(() => {
        if (matches === cardData.length) {
            setGameOver(true);
        }
    }, [matches, cardData.length]);

    const flipCard = (id) => {
        if (disabled) return;

        const cardToFlip = cards.find(card => card.id === id);
        if (!cardToFlip.isFlipped) {
            cardToFlip.isFlipped = true;
            setCards([...cards]);
            firstCard ? setSecondCard(cardToFlip) : setFirstCard(cardToFlip);
            setMoves(prev => prev + 1);
        }
    };

    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setDisabled(false);
    };

    const restartGame = () => {
        setCards(shuffleCards(cardData));
        setMatches(0);
        setMoves(0);
        setGameOver(false);
    };

    return {
        cards,
        moves,
        matches,
        flipCard,
        resetTurn,
        restartGame,
        gameOver
    };
};
