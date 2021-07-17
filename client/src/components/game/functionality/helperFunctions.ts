import React from "react";
import {gameState} from "../Game";

export const gameStart = (timeElapsed: number, setTimeElapsed: React.Dispatch<React.SetStateAction<number>>,
                          setGameInProgress: React.Dispatch<React.SetStateAction<number>>, GAME_DURATION_MS: number) => {
    setGameInProgress(gameState.inProgress);
    setTimeElapsed(0.0);

    let timer = setInterval(() => {
        setTimeElapsed(timeElapsed => timeElapsed + 0.1);
    }, 100);

    setTimeout(() => {
        clearInterval(timer);
        setGameInProgress(gameState.finished);
    }, GAME_DURATION_MS + 1);
}

export const gameResults = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpen(o => !o);
}

export const buttonState = (actualState: number) => {
    switch (actualState) {
        case gameState.ready: {
            return 'Click to start!';
        }
        case gameState.inProgress: {
            return 'Click here!';
        }
        case gameState.finished: {
            return 'Restart the game!';
        }
    }
}