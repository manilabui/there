import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
import LineupCard from './LineupCard';


export default ({ festSets, userSets, user }) => {
	const [festSetsArr, setFestSetsArr] = useState([]);
	const [userSetsArr, setUserSetsArr] = useState([]);

	const date = festSets.length ? festSets[0].start : userSets[0].start;

	const createLineup = () => {
		setFestSetsArr(festSets.length
			? festSets.map((set, i) =>
				<LineupCard 
					key={i} 
					set={set} 
					isPublic={true} 
					user={user}
					handleUserToArtistEventUpdate={handleUserToArtistEventUpdate}
				/>
			)
			: ''
		)
		setUserSetsArr(userSets.length
			? userSets.map((set, i) =>
				<LineupCard 
					key={i} // switched to index due to multiple items having the same key using set.id
					set={set} 
					isPublic={false}
					handleUserToArtistEventUpdate={handleUserToArtistEventUpdate}
				/>
			)
			: ''
		);
	};

	useEffect(createLineup, []);

	const handleUserToArtistEventUpdate = (currSet, updateType) => {
		if (updateType === 'post') {
			// remove the currSet from festSets
			festSets = festSets.filter(({ id }) => currSet.id !== id);
			userSets.push(currSet);
		} 
		if (updateType === 'delete') {
			// remove the currSet from the userSets
			userSets = userSets.filter(({ id }) => currSet.id !== id);
			festSets.push(currSet);
		}

		createLineup();
	};

	return (
		<Fragment>
			<section className='flex column'>
				<article className='w-40 tl'>{festSetsArr}</article>
				<article className='w-20 tc'><Moment format='h:mm A' date={date} /></article>
				{user ? <article className='w-40 tr'>{userSetsArr}</article> : ''}
			</section>
			<hr/>
		</Fragment>
	);
};