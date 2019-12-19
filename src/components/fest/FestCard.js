// can potentially be used by both news (aka FestList) + timeline sections
import React from 'react';
import Moment from 'react-moment';
import { postItem } from '../../modules/apiManager';
import { ReactComponent as Check } from '../../assets/checkIcon.svg';
import { ReactComponent as Star } from '../../assets/starIcon.svg';

export default ({ id, start, name, location, updateType, handleFestClick, handleTimelineUpdate, isNewsList, user }) => {
	if (name.includes('Music Festival')) name = name.split(' Music Festival')[0];
	if (location.includes('USA')) location = location.split(', USA')[0];

	const addToTimeline = attendance => {
		const item = {
			userId: user.id,
			eventId: id,
			attendance
		};

		postItem('usersToEvents', item)
			.then(event => handleTimelineUpdate(event));
	};

	const addToTimelineButtons = 
		<div className='dib'>
			<Check className='dib pointer dim' onClick={() => addToTimeline('confirmed')}/>
			<Star className='dib pointer dim' onClick={() => addToTimeline('interested')}/>
		</div>;

	return (
		<article>
			{isNewsList ? addToTimelineButtons : null}
			<Moment className='dib' format='MM.DD.YY' date={start}/>
			<div className='dib pointer dim' onClick={() => handleFestClick(id)}>
				<h6 className='dib'>{name}</h6>
				<h6 className='dib'>{location}</h6>
				<h6 className='dib'>{updateType}</h6>
			</div>
		</article>
	);
};