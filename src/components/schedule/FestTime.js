// Lineup at specific time
import React, { Fragment } from 'react';
import Moment from 'react-moment';
import LineupCard from './LineupCard';

export default ({ festSets, userSets, user }) => {
	const date = festSets[0].start;
	const festSetsArr = festSets.map(({ id }) => {
		return <LineupCard key={id} setId={id} isPublic={true} user={user}/>
	});
	// TO DO: user schedule
	const userSetsArr = userSets 
		? userSets.map(({ id }) => <LineupCard key={id} setId={id} isPublic={false} user={user}/>)
		: '';

	return (
		<Fragment>
			<section className='flex column'>
				<article className='w-40 tl'>{festSetsArr}</article>
				<article className='w-20 tc'><Moment format='h:mm A' date={date} /></article>
				<article className='w-40 tr'>{userSetsArr}</article>
			</section>
			<hr/>
		</Fragment>
	);
};