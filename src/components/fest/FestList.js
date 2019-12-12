import React, { Fragment, useState, useEffect, useRef } from 'react';
import FestCard from './FestCard';
import { reverse, sortBy } from 'lodash';
import { getAll } from '../../modules/apiManager';
import './FestList.css';

const sortByDate = arr => reverse(sortBy(arr, 'modifiedAt'));

export default () => {
    const [fests, setFests] = useState([]);

    const getFests = () => { getAll("events").then(events => setFests(sortByDate(events))) };

    useEffect(getFests, []);

    console.log(sortByDate(fests))
    /* 
        TODO: Searchfield functionality
        
        - Get all fests
        - If user logged in, then also get all fests user is going to in order to remove those from the list
    */
    // const searchInput = useRef();

    const festNewsArr = fests.map(fest => {
        return (
            <FestCard
                key={fest.id}
                {...fest}
            />
        );
    });

    return (
        <Fragment>
            <input
                className="search"
                type="text"
                id="search"
                placeholder="Search"
            />
            {festNewsArr}
        </Fragment>
    );
};