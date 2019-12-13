import React, { Fragment, useState, useEffect } from 'react';
import FestDay from './FestDay';
import Moment from 'react-moment';
import { sortBy } from 'lodash';
import { getItem } from '../../modules/apiManager';

export default ({ scheduleId }) => {
    const [name, setName] = useState('Festival Name');
    const [location, setLocation] = useState('Location');
    const [events, setEvents] = useState([]);

    const getSchedule = scheduleId => {
        const scheduleWithLineup = `${scheduleId}?_embed=artistsToEvents`;

        if (scheduleId) {
            getItem('events', scheduleWithLineup)
                .then(({ name, location, artistsToEvents, eventDays }) => {
                    setName(name);
                    setLocation(location);
                    // don't actually need to sort yet.
                    // create arrays first.
                    // sort that array by the day

                    setEvents(sortBy(artistsToEvents, ({ start }) => new Date(start)));
                    console.log(sortBy(artistsToEvents, ({ start }) => new Date(start)));
            });
        };
    };

    // events needs to be an array for each day

    useEffect(() => getSchedule(scheduleId), [scheduleId]);

    const festDayArr = days.map(day => {
        return (
            <FestDay
                key={day.id}
                {...day}
            />
        );
    });

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            {/*festDayArr*/}
        </Fragment>
    );
};