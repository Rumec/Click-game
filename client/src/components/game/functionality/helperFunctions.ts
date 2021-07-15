import React from "react";

export const gameStart = (timeElapsed: number, setTimeElapsed: React.Dispatch<React.SetStateAction<number>>,
                          setGameInProgress: React.Dispatch<React.SetStateAction<boolean>>, GAME_DURATION_MS: number) => {
    setGameInProgress(true);
    setTimeElapsed(0.0);

    let timer = setInterval(() => {
        setTimeElapsed(timeElapsed => timeElapsed + 0.1);
    }, 100);

    setTimeout(() => {
        clearInterval(timer);
        setGameInProgress(false);
    }, GAME_DURATION_MS + 1);
}

export const gameResults = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpen(o => !o);
}