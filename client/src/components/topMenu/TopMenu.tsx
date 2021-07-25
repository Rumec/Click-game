import {InfoPopup} from "../infoPopup/InfoPopup";
import React from "react";
import './TopMenu.css'
import BEMHelper from "react-bem-helper";
import {LeaderboardPopup} from "../leaderboardPopup/LeaderboardPopup";

const classes = new BEMHelper({
    name: 'top-menu'
});

export const TopMenu = () => {
        return(
        <div {...classes()}>
            <LeaderboardPopup />
            <InfoPopup/>
        </div>
    )
}

