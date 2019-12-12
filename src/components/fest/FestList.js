import React, { Fragment, useState, useEffect, useRef } from 'react';
import FestCard from './FestCard';
import { reverse, sortBy, toLower } from 'lodash';
import { getAll } from '../../modules/apiManager';
import './FestList.css';

const sortByDate = arr => reverse(sortBy(arr, 'modifiedAt'));

export default () => {
    const [fests, setFests] = useState([]);
    const searchInput = useRef();
    // TO DO: If user logged in, remove fests current user is going to from the list
    const getFests = () => { getAll("events").then(events => setFests(sortByDate(events))) };

    useEffect(getFests, []);
    
    const getSearchResults = () => {
        // NOT WORKING
        const festsArr = fests; // This was to keep the original array to filter over it rather than a small updated one
        const results = festsArr.filter(({ name, location }) => {
            const userInput = toLower(searchInput.current.value);

            return toLower(name).includes(userInput) || toLower(location).includes(userInput);
        });

        setFests(results);
    };

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
                ref={searchInput}
                onChange={getSearchResults}
                placeholder=""
            />
            {festNewsArr}
        </Fragment>
    );
};