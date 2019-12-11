import React, { Fragment, useState, useEffect, useRef } from 'react';
import FestCard from './FestCard';
import './NewsList.css';

export default () => {
    /* 
        TODO: Searchfield functionality
        
        - Get all fests
        - If user logged in, then also get all fests user is going to in order to remove those from the list
    */
    // const searchInput = useRef();

    return (
        <Fragment>
            <input
                className="search"
                type="text"
                id="search"
                placeholder="Search"
            />
            <FestCard />
        </Fragment>
    );
};