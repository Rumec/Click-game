import React, {useRef, useState} from 'react';
import './Game.css';
import BEMHelper from 'react-bem-helper';
import {Button, Row} from "react-bootstrap";
import {gameStart, gameResults} from "./functionality/helperFunctions";
import {InfoPopup} from "../infoPopup/InfoPopup";

const GAME_DURATION_MS = 10000;

const classes = new BEMHelper({
    name: 'game'
});


export const Game: React.FC = () => {

    const [timeElapsed, setTimeElapsed] = useState(0.0);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    /**
     * Using reference to be able to access actual value of clickCount
     */
    const clickCountRef = useRef(clickCount);
    clickCountRef.current = clickCount;

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
                                    gameResults(clickCountRef)
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
        </div>

    );
};
