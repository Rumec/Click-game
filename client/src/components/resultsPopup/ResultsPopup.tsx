import React, {useRef} from "react";
import {Button} from "react-bootstrap";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface IResultsPopupPropsType {
    open: boolean | undefined,
    closeModal: any,
    clickCountRef: React.MutableRefObject<number>
}

export const ResultsPopup = (props: IResultsPopupPropsType) => {
    const ref = useRef();
    // @ts-ignore
    const closeTooltip = () => ref.current.close();

    return(
        <Popup
            open={props.open}
            closeOnDocumentClick={false}
            onClose={props.closeModal}
            ref={ref}
        >
            <p>You have clicked {props.clickCountRef.current} times in total</p>
            <p>Meaning {props.clickCountRef.current * 6} clicks per minute or {props.clickCountRef.current / 10} clicks per second</p>
            <Button type="button" className="button" onClick={closeTooltip}>
                close
            </Button>
        </Popup>
    );
}

