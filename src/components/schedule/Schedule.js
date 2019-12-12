import React, { Fragment, useState } from 'react';
import FestDay from './FestDay';

export default () => {
    const [name, setName] = useState('Festival Name');
    const [location, setLocation] = useState('Location');

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            {/* map: Fest Day */}
            <FestDay />
        </Fragment>
    );
};