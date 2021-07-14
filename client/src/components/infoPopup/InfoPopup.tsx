import React from 'react';
import Popup from 'reactjs-popup';
import {Button} from "react-bootstrap";
import 'reactjs-popup/dist/index.css';

export const InfoPopup = () => (
    <Popup trigger={<Button> Info </Button>} modal nested>
        <span> Modal content </span>
    </Popup>
);