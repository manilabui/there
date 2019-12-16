// Lineup at specific time
import React from 'react';
import Moment from 'react-moment';
import LineupCard from './LineupCard';

export default ({ lineup }) => {
	const date = lineup[0].start;
	const festSetsArr = lineup.map(({ id }) => <LineupCard key={id} setId={id} />);

	return (
		<section className='flex column'>
			<article className='w-40 tl'>{festSetsArr}</article>
			<article className='w-20 tc'><Moment format='h:mm A' date={date} /></article>
			<article className='w-40 tr'>user lineup</article>
		</section>
	);
};