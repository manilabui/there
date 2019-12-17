import React, { Fragment, useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import FestCard from './FestCard';
import { toLower } from 'lodash';
import { getAll } from '../../modules/apiManager';
import './FestList.css';

export default props => {
    const { fests } = props;
    const searchInput = useRef();
    // TO DO: If user logged in, remove fests current user is going to from the list
    
    const getSearchResults = () => {
        const userInput = toLower(searchInput.current.value);
        const results = fests.filter(({ name, location }) => {
            return toLower(name).includes(userInput) || toLower(location).includes(userInput);
        });
        // If search is empty, then get all fests
        userInput ? setFests(results) : props.getAllFests();
    };

    const festNews = fests.map(fest => <FestCard key={fest.id} isNewsList={true} {...fest} {...props} />);

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
            {festNews}
        </Fragment>
    );
};