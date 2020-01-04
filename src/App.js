import React, { useState, useEffect } from 'react';
import { getAll, getItem } from './modules/apiManager';
import { getUserInfo } from './modules/helpers';
import { reverse, sortBy, isEmpty } from 'lodash';
import { ReactComponent as Logo } from './assets/Logo.svg';
import Login from './components/auth/Login';
import FestList from './components/fest/FestList';
import Schedule from './components/schedule/Schedule';
import Timeline from './components/timeline/Timeline';
import './App.css';

const sortDescending = (arr, sortKey) => reverse(sortBy(arr, sortKey));

const createDaysObj = arr => {
    const result = {};

    arr.forEach(currSet => {
        const currDay = currSet.day;
        // add set to the result obj by pushing to existing array or starting new one
        result[currDay] ? result[currDay].push(currSet) : result[currDay] = [currSet];
    });

    return result;
};

export default () => {
  const [scheduleId, setScheduleId] = useState('');
  const [user, setUser] = useState(getUserInfo());
  const [userFests, setUserFests] = useState([]);
  const [newsFests, setNewsFests] = useState([]);
  const [festDays, setFestDays] = useState({});
  const [userDays, setUserDays] = useState({});
  const [name, setName] = useState('Festival Name');
  const [location, setLocation] = useState('Location');
  const [day, setDay] = useState(0);

  const getAllFests = () => { 
    getAll('events?public=true')
      .then(fests => {
        if (user) {
          getAll('usersToEvents?_expand=event')
            .then(events => {
              const currUserFests = events.filter(({ userId }) => user.id === userId);
              const currUserFestIds = currUserFests.map(({ eventId }) => eventId);
              const filteredFests = fests.filter(({ id }) => !currUserFestIds.includes(id));
              const sortedUserFests = sortDescending(currUserFests, 'start');

              setNewsFests(sortDescending(filteredFests, 'modifiedAt'));
              setUserFests(sortedUserFests);
            });   
        }

        else setNewsFests(sortDescending(fests, 'modifiedAt'));
      });
  };

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

  const getSchedules = id => {
    getItem('events', `${id}?_embed=artistsToEvents`)
      .then(({ name, location, artistsToEvents }) => {
          const daysObj = createDaysObj(artistsToEvents);

          setName(name);
          setLocation(location);
          setDay(1);
          setFestDays(daysObj);

          if (user) getUserSchedule();
      })
  };

  // const getSchedules = async id => {
  //   const getFestInfo = await getResource("A");
  //   setValueA(valueA);
  //   getItem('events', `${id}?_embed=artistsToEvents`)
  //     .then(({ name, location, artistsToEvents }) => {
  //         const daysObj = createDaysObj(artistsToEvents);

  //         setName(name);
  //         setLocation(location);
  //         setDay(1);
  //         setFestDays(daysObj);
          
  //         if (user) getUserSchedule();
  //     })
  // };

  useEffect(getAllFests, [user]);
  
  const updateUser = user => setUser(user);
  const handleFestClick = id => setScheduleId(id);
  const updateFestList = arr => setNewsFests(arr);

  return (
    <div className='avenir'>
      <header className='section-banner flex'>
        <section className='w-third'></section>
        <section className='w-third tc'><Logo /></section>
        <section className='w-third'><Login updateUser={updateUser}/></section>
      </header>
      <div className='container-main flex'>
        <section className='section-festList'>
          <FestList
            fests={newsFests}
            user={user}
            updateFestList={updateFestList}
            handleFestClick={handleFestClick}
            getAllFests={getAllFests}
          />
        </section>
        <section className='section-schedule'>
          <Schedule getSchedules={getSchedules} festDays={festDays} userDays={userDays} name={name} location={location} day={day} user={user}/>
        </section>
        <section className='section-timeline'>
          <Timeline fests={userFests} handleFestClick={handleFestClick}/>
        </section>
      </div>
      <footer className='absolute bottom-0'>
        <p className='f7 black-70 mb2'>Made by Manbootay | 2020</p>
      </footer>
    </div>
  );
}