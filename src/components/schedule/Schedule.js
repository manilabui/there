import React, { Fragment, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import FestDay from './FestDay';
import { sortBy, reverse } from 'lodash';
import { getAll } from '../../modules/apiManager';
import './Schedule.css';

const createDaysObj = arr => {
    const result = {};

    arr.forEach(currSet => {
        const currDay = currSet.day;
        // add set to the result obj by pushing to existing array or starting new one
        result[currDay] ? result[currDay].push(currSet) : result[currDay] = [currSet];
    });
    
    return result;
};

export default ({ scheduleId, user }) => {
    const [name, setName] = useState('Festival Name');
    const [location, setLocation] = useState('Location');
    const [festDays, setFestDays] = useState([]);
    const [userDays, setUserDays] = useState([]);
    const { isAuthenticated } = useAuth();

    const getSchedule = scheduleId => {
        if (scheduleId) {
            getAll(`events/${scheduleId}?_embed=artistsToEvents`)
                .then(({ name, location, artistsToEvents }) => {
                    const daysObj = createDaysObj(artistsToEvents);

                    setName(name);
                    setLocation(location);
                    setFestDays(daysObj);
            });
        };
        if (isAuthenticated()) {
            //getAll('usersToArtistEvents', ``)
        }
    };

    useEffect(() => getSchedule(scheduleId), [scheduleId]);

    const festDaysArr = reverse(sortBy(festDays)).map((lineup, i) => {
        return <FestDay key={i} festLineup={lineup} user={user}/>
    });

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            <section className='schedule overflow-scroll'>{festDaysArr}</section>
        </Fragment>
    );
};