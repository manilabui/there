import React, { useState, useEffect } from 'react';
import { ReactComponent as Check } from '../../assets/checkIcon.svg';
import { ReactComponent as Star } from '../../assets/starIcon.svg';
import { getItem } from '../../modules/apiManager';

export default ({ setId }) => {
	const [artist, setArtist] = useState('Artist');
	const [stage, setStage] = useState('Stage');

	const expandUrl = `${setId}?&_expand=artist&_expand=stage`; 
	const getExpandedSet = () => { 
		getItem('artistsToEvents', expandUrl)
			.then(({ artist, stage }) => {
				setArtist(artist.name);
				setStage(stage.name);
			});
	};
	
	useEffect(getExpandedSet, []);

	return (
		<article>
			<Check className='dib pointer dim' />
			<Star className='dib pointer dim' />
			<div className='dib'>
				<h6 className='dib'>{artist}</h6>
				<h6 className='dib'>{stage}</h6>
			</div>
		</article>
	);
};