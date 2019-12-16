import React, { Fragment, useState } from 'react';
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

export default ({ lineup }) => {
	const date = lineup[0].start;
	const sortedLineup = sortBy(lineup, ({ start }) => new Date(start));
	const timesObj = createTimesObj(sortedLineup);
	const festTimesArr = sortBy(timesObj).map((lineup, i) => <FestTime key={i} lineup={lineup} />);

	return (
		<Fragment>
			<article className='tc'><Moment format='dddd, LL' date={date} /></article>
			{festTimesArr}
		</Fragment>
	);
};