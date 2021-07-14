import React from 'react';
import Popup from 'reactjs-popup';
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import 'reactjs-popup/dist/index.css';
import './InfoPopup.css';

export const InfoPopup = () => (
    <Popup
        trigger={
            <Button type="button" className="button">
                Info
            </Button>
        }
        position={'left top'}
        on={['hover', 'focus']}
    >
        <Card title={'left top'}>Click as fast as you can for 10 seconds!</Card>
    </Popup>
);