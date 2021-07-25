import React, {useRef, useState} from "react";
import {Button, InputGroup, FormControl} from "react-bootstrap";
import {mutate} from "swr";
import './ResultsPopup.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface IResultsPopupPropsType {
    open: boolean | undefined,
    closeModal: any,
    clickCountRef: React.MutableRefObject<number>,
    minRecordValue: number
}

interface IHandleResultPropsType {
    clickCountRef: React.MutableRefObject<number>,
    minRecordValue: number,
    closeTooltip: any
}

const HandleResult = (props: IHandleResultPropsType) => {
    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handlePlayerDataSend = () => {
        if (name === '') {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, clickCount: props.clickCountRef.current })
        };
        fetch('http://localhost:5000/api/topTen', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    console.log('There was an error sending the data!');
                } else {
                    // Forcing refetch
                    await mutate('http://localhost:5000/api/topTen');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        // Closing popup
        props.closeTooltip();
    }

    if (props.clickCountRef.current <= props.minRecordValue) {
        return (
            <div>
                <p>You have clicked {props.clickCountRef.current} times in total</p>
                <p>Meaning {props.clickCountRef.current * 6} clicks per minute
                    or {props.clickCountRef.current / 10} clicks per second</p>
                <Button type="button" className="button" onClick={props.closeTooltip}>
                    Close
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <p>You have made it to top 10!</p>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Your name:</InputGroup.Text>
                    <FormControl
                        id={'playerName'}
                        placeholder="Enter your name"
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                    />
                </InputGroup>
                <Button type="button" className="button" onClick={handlePlayerDataSend}>
                    Send result!
                </Button>
            </div>
        )
    }
}

export const ResultsPopup = (props: IResultsPopupPropsType) => {
    const ref = useRef(null);
    // @ts-ignore
    const closeTooltip = () => ref.current.close();

    return (
        <Popup
            open={props.open}
            closeOnDocumentClick={false}
            onClose={props.closeModal}
            ref={ref}
        >
            <HandleResult clickCountRef={props.clickCountRef} minRecordValue={props.minRecordValue} closeTooltip={closeTooltip}/>

        </Popup>
    );
}

