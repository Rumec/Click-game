import React from 'react';
import Popup from 'reactjs-popup';
import {Button} from "react-bootstrap";
import 'reactjs-popup/dist/index.css';
import './InfoPopup.css';

export const InfoPopup = () => (
    <Popup
        trigger={
            <Button className={'info-button'}>Info</Button>
        }
        position={'left top'}
        on={['hover', 'focus']}
    >
        <div title={'left top'}>Click as fast as you can for 10 seconds!</div>
    </Popup>
);