import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as Check } from '../../assets/checkIcon.svg';
import { ReactComponent as Star } from '../../assets/starIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg';
import { getItem, postItem, deleteItem } from '../../modules/apiManager';

export default ({ set, user, isPublic, handleUserToArtistEventUpdate }) => {
	const [artist, setArtist] = useState('');
	const [stage, setStage] = useState('');

	const getSet = () => { 
		getItem('artistsToEvents', `${set.id}?&_expand=artist&_expand=stage`)
			.then(({ artist, stage }) => {
				setArtist(artist.name);
				setStage(stage.name);
			});
	};
	
	useEffect(getSet, []);

	const addToUserSchedule = attendance => {
		const item = {
			userId: user.id,
			artistsToEventId: set.id,
			attendance
		};

		postItem('usersToArtistEvents', item)
			.then(currSet => {
				// format set like festSet objects
				set.userToArtistsEventId = currSet.id;
				handleUserToArtistEventUpdate(set);
			});
	};

	const removeFromUserSchedule = () => {
		deleteItem('usersToArtistEvents', set.userToArtistsEventId);
		// format set like festSet objects
		delete set.userToArtistsEventId;
		handleUserToArtistEventUpdate(set);
	};

	const addToUserScheduleButtons =
		<Fragment>
			<Check className='dib pointer dim' onClick={() => addToUserSchedule('confirmed')}/>
			<Star className='dib pointer dim' onClick={() => addToUserSchedule('interested')}/>
		</Fragment>;

	const removeFromUserScheduleButton =
		<CloseIcon className='dib pointer dim' onClick={removeFromUserSchedule}/>;

	return (
		<article>
			{isPublic ? addToUserScheduleButtons : null}
			<div className='dib'>
				<h6 className='dib'>{artist}</h6>
				<h6 className='dib'>{stage}</h6>
			</div>
			{!isPublic ? removeFromUserScheduleButton : null}
		</article>
	);
};