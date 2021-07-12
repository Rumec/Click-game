import React, {useState} from 'react';
import './Game.css';
import BEMHelper from 'react-bem-helper';
import {Button, Row} from "react-bootstrap";

const classes = new BEMHelper({
    name: 'game'
});

export const Game: React.FC = () => {
    let timer: NodeJS.Timer;
    const [timeElapsed, setTimeElapsed] = useState(0.0);
    const [clickCount, setClickCount] = useState(0);

    const interval = () => {
        timer = setInterval(() => {
            setTimeElapsed(timeElapsed => timeElapsed + 0.1);
        }, 100);

        setTimeout(() => {
            clearInterval(timer);
        }, 10000);
    }

    return (
        <div>
            <Row>
                {timeElapsed.toFixed(1)}
            </Row>
            <Button
                onClick={
                    interval
                }
            >
                Click me
            </Button>
        </div>
    );
};
