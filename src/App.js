import React, { useState, useEffect } from 'react';
import { getAll } from './modules/apiManager';
import { getUserInfo } from './modules/helpers';
import { reverse, sortBy } from 'lodash';
import { ReactComponent as Logo } from './assets/Logo.svg';
import Login from './components/auth/Login';
import FestList from './components/fest/FestList';
import Schedule from './components/schedule/Schedule';
import Timeline from './components/timeline/Timeline';
import './App.css';

const sortDescending = (arr, sortKey) => reverse(sortBy(arr, sortKey));

export default () => {
  const [scheduleId, setScheduleId] = useState('');
  const [user, setUser] = useState(getUserInfo());
  const [userFests, setUserFests] = useState([]);
  const [newsFests, setNewsFests] = useState([]);

  const getAllFests = () => { 
    getAll('events?public=true')
      .then(fests => {
        if (user) {
          getAll('usersToEvents?_expand=event')
            .then(events => {
              const currUserFests = events.filter(({ userId }) => user.id === userId);
              const currUserFestIds = currUserFests.map(({ eventId }) => eventId);
              const filteredFests = fests.filter(({ id }) => !currUserFestIds.includes(id));

              setNewsFests(sortDescending(filteredFests, 'modifiedAt'));
              setUserFests(sortDescending(currUserFests, [o => o.event.start]));
            });   
        }

        else setNewsFests(sortDescending(fests, 'modifiedAt'));
      });
  };

  useEffect(getAllFests, [user, scheduleId]);
  
  const updateUser = user => {setUser(null); setUser(user)};
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
        <section className='section-festList pl3'>
          <FestList
            fests={newsFests}
            user={user}
            updateFestList={updateFestList}
            handleFestClick={handleFestClick}
            getAllFests={getAllFests}
          />
        </section>
        <section className='section-schedule'>
          <Schedule scheduleId={scheduleId} user={user}/>
        </section>
        <section className="section-timeline pl4 pr3 dt">
          <div className="dtc v-mid">
            <Timeline fests={userFests} handleFestClick={handleFestClick}/>
          </div>
        </section>
      </div>
      <footer className='absolute bottom-0 fr'>
        <p className='f7 cream mb2'>Made with anguish by Manbootay | 2020</p>
      </footer>
    </div>
  );
}