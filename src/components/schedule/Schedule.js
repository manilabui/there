import React, { Fragment, useState, useEffect } from 'react';
import { sortBy, isEmpty, toPairs } from 'lodash';
// import { getAll, getItem } from '../../modules/apiManager';
import { ReactComponent as DeleteIcon } from '../../assets/deleteIcon.svg';
import FestDay from './FestDay';
import './Schedule.css';

export default ({ scheduleId, getSchedules, name, location, day, user }) => {
    
    // const [showDelete, setDelete] = useState(false);

    // user info is left as an obj in order to access the currDay without looping again
    // const festDaysArr = sortBy(festDays).map((lineup, i) => {
    //     const currDay = lineup[0];
    //     const userLineup = userDays[currDay] ? userDays[currDay] : null;

    //     return <FestDay key={i} festLineup={lineup[1]} userLineup={userLineup} user={user}/>
    // });


    // <div onClick={() => setDay(prevDay => prevDay + 1)}>></div>

    useEffect(getSchedules, [scheduleId]);

    return (
        <Fragment>
            <h2 className='tc'>{name}</h2>
            <header className='flex'>
            	<h4 className='w-20 tl underline'>Fest Schedule</h4>
                <h5 className='w-60 tc'>{location}</h5>
                <h4 className='w-20 tr underline'>Your Schedule</h4>
            </header>
            <section className='schedule overflow-scroll'>
                {/* !isEmpty(festDays) 
                    ? <FestDay festLineup={festDays[day]} userLineup={userDays[day]} user={user} />
                    : null */
                }
            </section>
        </Fragment>
    );
};