// can potentially be used by both news (aka FestList) + timeline sections
import React from 'react';
import Moment from 'react-moment';
import { ReactComponent as Check } from '../../assets/checkIcon.svg';
import { ReactComponent as Star } from '../../assets/starIcon.svg';

export default ({ id, start, name, location, updateType, handleFestClick }) => {
	if (name.includes('Music Festival')) name = name.split(' Music Festival')[0];
	if (location.includes('USA')) location = location.split(', USA')[0];

	return (
		<article>
			<Check className='dib pointer dim' />
			<Star className='dib pointer dim' />
			<Moment className='dib' format='MM.DD.YY' date={start} />
			<div className='dib pointer dim' onClick={() => handleFestClick(id)}>
				<h6 className='dib'>{name}</h6>
				<h6 className='dib'>{location}</h6>
				<h6 className='dib'>{updateType}</h6>
			</div>
		</article>
	);
};