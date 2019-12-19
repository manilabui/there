import React, { Fragment } from 'react';
import FestTime from './FestTime';
import Moment from 'react-moment';
import { sortBy } from 'lodash';

const createTimesObj = arr => {
    const result = {};

    arr.forEach(currSet => {
        const time = currSet.start.slice(-5);
        // add time to the result obj by pushing to existing array or starting new one
        result[time] ? result[time].push(currSet) : result[time] = [currSet];
    });
    
    return result;
};

export default ({ festLineup, userLineup, user }) => {
	const date = festLineup[0].start;
	const sortedFestLineup = sortBy(festLineup, ({ start }) => new Date(start));
	const sortedUserLineup = userLineup ? sortBy(userLineup, ({ start }) => new Date(start)) : null;
	const festTimes = createTimesObj(sortedFestLineup);
	const userTimes = userLineup ? createTimesObj(sortedUserLineup) : null;
	const festTimesArr = sortBy(festTimes).map((lineup, i) => {
		const currTime = lineup[0].start.slice(-5);
		const userSets = userTimes 
			? (userTimes[currTime] ? userTimes[currTime] : null)
			: null;
        const userSetIds = userSets 
            ? userSets.map(({ artistsToEventId }) => artistsToEventId) 
            : null;
        const festSets = userSets
        	? userSets.filter(({ id }) => userSetIds.includes(id)) 
        	: lineup;

		return <FestTime key={i} festSets={festSets} userSets={userSets} user={user}/>
	});

	return (
		<Fragment>
			<article className='tc'><Moment format='dddd, LL' date={date} /></article>
			{festTimesArr}
		</Fragment>
	);
};