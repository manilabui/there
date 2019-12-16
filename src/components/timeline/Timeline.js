import React, { Fragment, useState, useEffect } from 'react';
// import FestCard from '../fest/FestCard';
import { getAll } from '../../modules/apiManager';

export default () => {
	const [fests, setFests] = useState([]);

    const getFests = () => { getAll("events").then(events => setFests(events)) };

    useEffect(getFests, []);

    return (
        <Fragment>
            <h5 className='fr'>+Create New Fest</h5>
            {/* <FestCard /> */}
        </Fragment>
    );
};