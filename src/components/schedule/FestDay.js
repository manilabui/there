import React, { Fragment } from 'react';
import Lineup from './Lineup';
import Moment from 'react-moment';

export default ({ date }) => {
	return (
		<Fragment>
			<article className='tc'><Moment format='dddd, LL' date={date} /></article>
			<section className='flex column'>
				<article className='w-40 tl'><Lineup /></article>
				<article className='w-20 tc'><Moment format='h:hh A' date={date} /></article>
				<article className='w-40 tr'><Lineup /></article>
			</section>
		</Fragment>
	);
};