import React from 'react';
import useAuth from '../../hooks/useAuth';
import Moment from 'react-moment';
import { postItem } from '../../modules/apiManager';
import { ReactComponent as Check } from '../../assets/largeCheckIcon.svg';
import { ReactComponent as Star } from '../../assets/largeStarIcon.svg';


export default ({ id, start, name, location, updateType, getAllFests, handleFestClick, isNewsList, user }) => {
	const { isAuthenticated } = useAuth();

	if (name.includes('Music Festival')) name = name.split(' Music Festival')[0];
	if (location.includes('USA')) location = location.split(', USA')[0];

	const addToTimeline = attendance => {
		if (isAuthenticated()) {
			const item = {
				userId: user.id,
				eventId: id,
				attendance
			};

			postItem('usersToEvents', item).then(getAllFests());
		} else {
			window.alert('Sign in to add events to your timeline.');
		};
	};

	const addToTimelineButtons =
		<div className='festList-icons dib'>
			<Check className='dib pointer dim' onClick={() => addToTimeline('confirmed')}/>
			<Star className='dib pointer dim ph1' onClick={() => addToTimeline('interested')}/>
		</div>;

	return (
		<article>
			{isNewsList ? addToTimelineButtons : null}
			<Moment className='card-date dib ph1 fw6 ttu tracked' format='MM.DD.YY' date={start}/>
			<div className='dib pointer dim' onClick={() => handleFestClick(id)}>
				<h6 className='dib cream f7 pl1 fw7 ttu tracked'>{name}</h6>
				<h6 className='card-location dib ph1 i fw5'>{location}</h6>
				<h6 className='dib cream f6 fw5 ttu tracked'>{updateType}</h6>
			</div>
		</article>
	);
};