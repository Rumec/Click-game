import React, {useRef, useState} from 'react';
import './Game.css';
import BEMHelper from 'react-bem-helper';
import {Button, Row} from "react-bootstrap";
import {gameStart, gameResults, buttonState} from "./functionality/helperFunctions";
import {ResultsPopup} from "../resultsPopup/ResultsPopup";
import {TopMenu} from "../topMenu/TopMenu";
import useSWR from "swr";
import {fetcher} from "../../helpers/fetcher";

const GAME_DURATION_MS = 10000;

const classes = new BEMHelper({
    name: 'game'
});

export const gameState = {
    ready: 0,
    inProgress: 1,
    finished: 2
}

export interface ITopPerson {
    name: string,
    clickCount: number
}

export const Game: React.FC = () => {
    const [timeElapsed, setTimeElapsed] = useState(0.0);
    const [actualState, setActualState] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    /**
     * Using reference to be able to access actual value of clickCount
     */
    const clickCountRef = useRef(clickCount);
    clickCountRef.current = clickCount;

    const {data, error} = useSWR('http://localhost:5000/api/topTen', fetcher);
    const minRecordValue = (data && !error) ? data.reduce((acum: ITopPerson, next: ITopPerson) => acum.clickCount < next.clickCount ? acum : next).clickCount :
        99999;

    const handleClick = () => {
        switch (actualState) {
            case gameState.ready: {
                gameStart(timeElapsed, setTimeElapsed, setActualState, GAME_DURATION_MS);
                setTimeout(() => {
                    gameResults(setOpen);
                }, GAME_DURATION_MS + 1);
                break;
            }
            case gameState.inProgress: {
                setClickCount((clickCount) => clickCount + 1);
                break;
            }
            case gameState.finished: {
                setTimeElapsed(0.0);
                setClickCount(0);
                setActualState(gameState.ready);
                break;
            }
        }
    }

    return (
        <div {...classes()}>
            <TopMenu/>
            <div {...classes('window')}>
                <label htmlFor={'timer'}>Time elapsed:</label>
                <Row
                    {...classes('timer')}
                    id={'timer'}>
                    {timeElapsed.toFixed(1)}
                </Row>
                <label htmlFor={'clickCount'}>Clicks total:</label>
                <Row
                    {...classes('click-count')}
                    id={'clickCount'}>
                    {clickCount}
                </Row>
                <Button
                    {...classes('button')}
                    variant="primary"
                    onClick={handleClick}>
                    {buttonState(actualState)}
                </Button>
            </div>
            <ResultsPopup
                open={open}
                closeModal={closeModal}
                clickCountRef={clickCountRef}
                minRecordValue={minRecordValue}
            />
        </div>
    );
};
