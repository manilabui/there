import React, { Fragment, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as Check } from '../../assets/checkIcon.svg';
import { ReactComponent as Star } from '../../assets/starIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg';
import { getItem, postItem, patchItem, deleteItem } from '../../modules/apiManager';

export default ({ set, user, isPublic, handleUserToArtistEventUpdate }) => {
	const [artist, setArtist] = useState('');
	const [stage, setStage] = useState('');
	const { isAuthenticated } = useAuth();

	const getSet = () => { 
		getItem('artistsToEvents', `${set.id}?&_expand=artist&_expand=stage`)
			.then(({ artist, stage }) => {
				setArtist(artist.name);
				setStage(stage.name);
			});
	};
	
	useEffect(getSet, []);

	const addToUserSchedule = attendance => {
		if (isAuthenticated()) {
			const item = {
				userId: user.id,
				artistsToEventId: set.id,
				attendance
			};

			postItem('usersToArtistEvents', item)
				.then(currSet => {
					// format set like festSet objects
					set.userToArtistsEventId = currSet.id;
					set.attendance = attendance;
					handleUserToArtistEventUpdate(set, 'post');
				});
		} else {
			window.alert('Sign in to add create your own fest schedule.');
		};
	};

	const editUserScheduleItem = attendance => {
		const item = {
			id: set.userToArtistsEventId,
			attendance
		}

		patchItem('usersToArtistEvents', item)
			.then(currSet => {
				set.attendance = currSet.attendance;
				handleUserToArtistEventUpdate(set, 'patch');
			});
	};

	const removeFromUserSchedule = () => {
		deleteItem('usersToArtistEvents', set.userToArtistsEventId);
		// format set like festSet objects
		delete set.userToArtistsEventId;
		handleUserToArtistEventUpdate(set, 'delete');
	};

	const festSideButtons =
		<Fragment>
			<Check className='dib pointer dim' onClick={() => addToUserSchedule('confirmed')}/>
			<Star className='dib pointer dim' onClick={() => addToUserSchedule('interested')}/>
		</Fragment>;

	const userSideButtons =
		<Fragment>
			{set.attendance === 'interested'
				? <Check className='dib pointer dim' onClick={() => editUserScheduleItem('confirmed')}/>
				: <Star className='dib pointer dim' onClick={() => editUserScheduleItem('interested')}/>
			}
			<CloseIcon className='dib pointer dim' onClick={removeFromUserSchedule}/>
		</Fragment>;

	return (
		<article>
			{isPublic ? festSideButtons : null}
			<div className='dib'>
				<h6 className='dib'>{artist}</h6>
				<h6 className='dib'>{stage}</h6>
			</div>
			{!isPublic ? userSideButtons : null}
		</article>
	);
};