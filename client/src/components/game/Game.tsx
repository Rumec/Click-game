import React, {useRef, useState} from 'react';
import './Game.css';
import BEMHelper from 'react-bem-helper';
import {Button, Row} from "react-bootstrap";
import {gameStart, gameResults} from "./functionality/helperFunctions";
import {InfoPopup} from "../infoPopup/InfoPopup";
import {ResultsPopup} from "../resultsPopup/ResultsPopup";

const GAME_DURATION_MS = 10000;

const classes = new BEMHelper({
    name: 'game'
});


export const Game: React.FC = () => {

    const [timeElapsed, setTimeElapsed] = useState(0.0);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    /**
     * Using reference to be able to access actual value of clickCount
     */
    const clickCountRef = useRef(clickCount);
    clickCountRef.current = clickCount;

    //TODO: refactor this horrible JSX
    return (
        <div {...classes()}>
            <div {...classes('info-popup-row')}>
                <InfoPopup/>
            </div>
            <div {...classes('window')}>

                <label htmlFor={'timer'}>Time elapsed:</label>
                <Row
                    {...classes('timer')}
                    id={'timer'}
                >
                    {timeElapsed.toFixed(1)}
                </Row>
                <label htmlFor={'clickCount'}>Clicks total:</label>
                <Row
                    {...classes('click-count')}
                    id={'clickCount'}
                >
                    {clickCount}
                </Row>
                <Button
                    {...classes('button')}
                    variant="primary"
                    onClick={
                        () => {
                            if (!gameInProgress) {
                                gameStart(timeElapsed, setTimeElapsed, setGameInProgress, GAME_DURATION_MS);
                                setTimeout(() => {
                                    gameResults(setOpen);
                                }, GAME_DURATION_MS + 1);
                            } else {
                                setClickCount((clickCount) => clickCount + 1);
                            }
                        }
                    }
                >
                    {(gameInProgress) ? "Click here" : "Start the game"}
                </Button>
            </div>
            <ResultsPopup
                open={open}
                closeModal={closeModal}
                clickCountRef={clickCountRef}
            />
        </div>

    );
};
