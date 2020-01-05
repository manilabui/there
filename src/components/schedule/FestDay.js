import React, { Fragment } from 'react';
import FestTime from './FestTime';
import Moment from 'react-moment';
import { sortBy, toPairs } from 'lodash';

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
	const festTimes = sortBy(toPairs(createTimesObj(sortedFestLineup)));
	const userTimes = userLineup ? createTimesObj(sortedUserLineup) : null;
	const festTimesArr = sortBy(festTimes).map((lineup, i) => {
		const currTime = lineup[1][0].start.slice(-5);
		// empty arrays rather than null to match festSets, which will never be null
		// also for pushing any changes user makes to their schedule
		// userTimes left as an obj so that we can access the info without an additional loop
		const userSets = userTimes
			? (userTimes[currTime] ? userTimes[currTime] : [])
			: [];
        const userSetIds = userSets.length
            ? userSets.map(({ artistsToEventId }) => artistsToEventId) 
            : null;
        const festSets = userSets.length
        	? userSets.filter(({ id }) => userSetIds.includes(id))
        	: lineup[1];

		return <FestTime key={i} festSets={festSets} userSets={userSets} user={user}/>
	});

	return (
		<Fragment>
			<article className='card-location f7 fw5 tc pt4 pb3'><Moment format='dddd, LL' date={date} /></article>
			{festTimesArr}
		</Fragment>
	);
};