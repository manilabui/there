import React, { Fragment, useState, useEffect } from 'react';
import { sortBy, isEmpty, toPairs } from 'lodash';
import { getAll, getItem } from '../../modules/apiManager';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import FestDay from './FestDay';
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
    const [day, setDay] = useState(0);
    const [festDays, setFestDays] = useState({});
    const [userDays, setUserDays] = useState({});
    const [showDelete, setDelete] = useState(false);

    const getUserSchedule = () => {
        getAll(`usersToArtistEvents/?userId=${user.id}&_expand=artistsToEvent`)
            .then(events => {
                if (events.length) {
                    const userArtistsToEvents = events.map(({ id, artistsToEvent, attendance }) => {
                        // userArtistsToEventId needed in the obj for removal of set from db
                        // attendance needed to differentiate styling in the user's schedule
                        return {userToArtistsEventId: id, attendance, ...artistsToEvent};
                    });
                    const userDaysObj = createDaysObj(userArtistsToEvents);

                    setUserDays(userDaysObj);
                }
            });
    };

    const getSchedules = () => {
        if (scheduleId) {
            getItem('events', `${scheduleId}?_embed=artistsToEvents`)
                .then(({ name, location, artistsToEvents }) => {
                    const daysObj = createDaysObj(artistsToEvents);

                    setFestDays([]);
                    setName(name);
                    setLocation(location);
                    setDay(1);
                    setFestDays(daysObj);
            });

            if (user) getUserSchedule();
        };
    };

    useEffect(getSchedules, [scheduleId]);
    // user info is left as an obj in order to access the currDay without looping again
    // const festDaysArr = sortBy(festDays).map((lineup, i) => {
    //     const currDay = lineup[0];
    //     const userLineup = userDays[currDay] ? userDays[currDay] : null;

    //     return <FestDay key={i} festLineup={lineup[1]} userLineup={userLineup} user={user}/>
    // });

    const changeDay = isPrev => {
        isPrev(
            //set the day
        )
    };

    const currDay = () => {
        return (
            <Fragment>
                <FestDay
                    className='dib'
                    festLineup={festDays[day]} 
                    userLineup={userDays[day] ? userDays[day] : null} 
                    day={day}
                    totalDays={Object.keys(festDays).length}
                    changeDay={changeDay}
                    user={user}
                />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            <section className='schedule overflow-scroll'>
                {festDays[day] ? currDay() : null}
            </section>
        </Fragment>
    );
};