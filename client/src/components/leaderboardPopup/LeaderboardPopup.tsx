import React from "react";
import useSWR from "swr";
import './LeaderboardPopup.css'
import {fetcher} from "../../helpers/fetcher";
import {Button} from "react-bootstrap";
import Popup from "reactjs-popup";
import {ITopPerson} from "../game/Game";

export const LeaderboardPopup = () => {
    const {data, error} = useSWR('http://localhost:5000/api/topTen', fetcher);

    const names = data?.map((obj: ITopPerson) => <tr>
        <td>{obj.name}</td>
        <td>{obj.clickCount}</td>
    </tr>)

    return (
        <Popup
            trigger={
                <Button className={'info-button'}>Leaderboard</Button>
            }
            modal
        >
            <table className={'result-table'}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Click count</th>
                    </tr>
                    {(data && !error)? names : 'Error while loading data'}
                </tbody>
            </table>
        </Popup>
    )
}