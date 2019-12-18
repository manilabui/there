import React, { useState, useEffect } from 'react';
import { getAll } from './modules/apiManager';
import { getUserInfo, sortByModifiedDate } from './modules/helpers';
import { ReactComponent as Logo } from './assets/Logo.svg';
import Login from './components/auth/Login';
import FestList from './components/fest/FestList';
import Schedule from './components/schedule/Schedule';
import Timeline from './components/timeline/Timeline';
import './App.css';

export default () => {
  const [scheduleId, setScheduleId] = useState('');
  const [user, setUser] = useState(getUserInfo()); //maybe remove
  const [userFests, setUserFests] = useState([]);
  const [userFestIds, setUserFestIds] = useState([]);
  const [newsFests, setNewsFests] = useState([]);

  const getAllFests = () => { 
    getAll("events?public=true")
      .then(fests => {
        if (user) {
          getAll('usersToEvents?_expand=event')
            .then(events => {
              const currUserFests = events.filter(({ userId }) => user.id === userId);
              const currUserFestIds = currUserFests.map(({ eventId }) => eventId);
              const filteredFests = fests.filter(({ id }) => !currUserFestIds.includes(id));

              setUserFests(currUserFests);
              setNewsFests(sortByModifiedDate(filteredFests));
            });   
        } 
        else setNewsFests(sortByModifiedDate(fests));
      });
  };

  useEffect(getAllFests, [user, userFests]);

  const updateUser = user => setUser(user);
  const handleFestClick = id => setScheduleId(id);
  const updateFestList = arr => setNewsFests(arr); 

  return (
    <div className='avenir'>
      <header className='section-banner flex'>
        <section className='w-third'></section>
        <section className='w-third tc'><Logo /></section>
        <section className='w-third'><Login updateUser={updateUser} /></section>
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
        <section className='section-schedule'><Schedule scheduleId={scheduleId} /></section>
        <section className='section-timeline'>
          <Timeline handleFestClick={handleFestClick} fests={userFests}/>
        </section>
      </div>
      <footer className='absolute bottom-0'>
        <p className='f7 black-70 mb2'>Made by Manbootay | 2020</p>
      </footer>
    </div>
  );
}