import React, { Fragment, useState, useEffect } from 'react';
import FestDay from './FestDay';
import { getItem } from '../../modules/apiManager';

export default ({ scheduleId }) => {
    const [name, setName] = useState('Festival Name');
    const [location, setLocation] = useState('Location');
    const [events, setEvents] = useState([]);

    const getSchedule = scheduleId => {
        // TO DO: need an embed/expand to get the artist to events info
        getItem('events', scheduleId).then(({ name, location }) => {
            setName(name);
            setLocation(location);
        });
    };

    useEffect(() => getSchedule(scheduleId), []);

    const festDayArray = () => {
        //

        return <FestDay />
    };

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            {festDayArray}
        </Fragment>
    );
};