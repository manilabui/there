// Lineup at specific time
import React from 'react';
import Moment from 'react-moment';
import LineupCard from './LineupCard';
import useAuth from '../../hooks/useAuth';
import { getUserInfo } from '../../modules/helpers';

export default ({ lineup }) => {
	console.log(lineup)
	const date = lineup[0].start;
	const festSetsArr = lineup.map(({ id }) => <LineupCard key={id} setId={id} />);

	const userSetsArr = '';

	return (
		<section className='flex column'>
			<article className='w-40 tl'>{festSetsArr}</article>
			<article className='w-20 tc'><Moment format='h:mm A' date={date} /></article>
			<article className='w-40 tr'>{userSetsArr}</article>
		</section>
	);
};