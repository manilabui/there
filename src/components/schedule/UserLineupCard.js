import React, { useState, useEffect } from 'react';
import { ReactComponent as Delete } from '../../assets/deleteIcon.svg';
import { getItem } from '../../modules/apiManager';

export default ({ setId }) => {
	const [artist, setArtist] = useState('Artist');
	const [stage, setStage] = useState('Stage');

	const expandUrl = `?userId=${userId}&_expand=artistsToEvent`; 
	const getSet = () => { 
		getItem('usersToArtistEvents', expandUrl)
			.then(({ artist, stage }) => {
				setArtist(artist.name);
				setStage(stage.name);
			});
	};
	
	useEffect(getSet, []);

	return (
		<article>
			<div className='dib'>
				<h6 className='dib'>{artist}</h6>
				<h6 className='dib'>{stage}</h6>
			</div>
			<Delete className='dib pointer dim' />
		</article>
	);
};