import React, { Fragment, useState, useEffect } from 'react';
import FestDay from './FestDay';
import { sortBy, reverse } from 'lodash';
import { getAll, getItem } from '../../modules/apiManager';
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

    const getSchedule = scheduleId => {
        if (scheduleId) {
            getItem('events', `${scheduleId}?_embed=artistsToEvents`)
                .then(({ name, location, artistsToEvents }) => {
                    const daysObj = createDaysObj(artistsToEvents);

                    setName(name);
                    setLocation(location);
                    setFestDays(daysObj);
            });
        };
        if (user) {
            getAll(`usersToArtistEvents/?userId=${user.id}&_expand=artistsToEvent`)
                .then(events => {
                    const userArtistsToEvents = events.map(({ artistsToEvent }) => artistsToEvent);
                    const userDaysObj = createDaysObj(userArtistsToEvents);

                    setUserDays(userDaysObj);
                });
        };
    };

    useEffect(() => getSchedule(scheduleId), [scheduleId, user]);

    const festDaysArr = reverse(sortBy(festDays)).map((lineup, i) => {
        // const currDay = lineup[0].day;
        // const userLineup = userDays[currDay] ? userDays[currDay] : null;
        // const userLineupIds = userLineup 
        //     ? userLineup.map(({ artistsToEventId }) => artistsToEventId) 
        //     : null;
        // const festLineup = userLineup 
        //     ? userLineup.filter(({ id }) => userLineupIds.includes(id)) 
        //     : lineup;

            console.log(lineup)
        return 'fest day'
        //return <FestDay key={i} festLineup={festLineup} userLineup={userLineup} user={user}/>
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