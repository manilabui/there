import React, { Fragment, useState, useEffect } from 'react';
import FestDay from './FestDay';
import { sortBy } from 'lodash';
import { getItem } from '../../modules/apiManager';

const createDaysObj = arr => {
    const result = {};

    arr.forEach(currSet => {
        const currDay = currSet.day;
        // add set to the result obj by pushing to existing array or starting new one
        result[currDay] ? result[currDay].push(currSet) : result[currDay] = [currSet];
    });
    
    return result;
};

export default ({ scheduleId }) => {
    const [name, setName] = useState('Festival Name');
    const [location, setLocation] = useState('Location');
    const [days, setDays] = useState([]);

    const getSchedule = scheduleId => {
        if (scheduleId) {
            getItem('events', `${scheduleId}?_embed=artistsToEvents`)
                .then(({ name, location, artistsToEvents }) => {
                    const daysObj = createDaysObj(artistsToEvents);

                    setName(name);
                    setLocation(location);
                    setDays(daysObj);
            });
        };
    };

    useEffect(() => getSchedule(scheduleId), [scheduleId]);

    const festDayArr = sortBy(days).reverse().map((lineup, i) =>  <FestDay key={i} lineup={lineup} />);

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            <section className=''>{festDayArr}</section>
        </Fragment>
    );
};