import React, { Fragment, useState, useEffect } from 'react';
import FestCard from '../fest/FestCard';
import useAuth from '../../hooks/useAuth';
import { getAll } from '../../modules/apiManager';
import { getUserInfo } from '../../modules/helpers';

export default props => {
	const [fests, setFests] = useState([]);
	const { isAuthenticated } = useAuth();

    const getUserFests = () => {
    	if (isAuthenticated()) {
    		getAll('usersToEvents?_expand=event')
    			.then(events => {
    				console.log(events)
    				const currUserEvents = events.filter(({ userId }) => getUserInfo().id === userId);

    				setFests(currUserEvents);

    			})};
    };

    useEffect(getUserFests, []);

    const festCardArr = fests.map(({ event }) => <FestCard key={event.id} {...event} {...props} />);

    return (
        <Fragment>
            <h5 className='fr pointer dim'>+ Create New Fest</h5>
            {festCardArr}
        </Fragment>
    );
};