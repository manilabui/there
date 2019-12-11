import React, { Fragment } from 'react';
import Lineup from './Lineup';

export default () => {
	// DEMO
	const date = 'Fri, May 10, 2019';
	const time = '5:00AM'

	return (
		<Fragment>
			<h5>{date}</h5>
			<section className='flex column'>
				<article className='w-40 tl'><Lineup /></article>
				<article className='w-20'>{time}</article>
				<article className='w-40 tr'><Lineup /></article>
			</section>
		</Fragment>
	);

	// return (
	// 	
	// 		
	// 		
	// 			<Lineup isPublic={true} />
	// 			{/* TODO: if user, then display personal sched */}
	// 			<Lineup isPublic={false}/>
	// 		
	// 	
	// );
};