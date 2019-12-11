import React from 'react';
import Login from './components/auth/Login';
import { ReactComponent as Logo } from './assets/Logo.svg';
import './App.css';

const App = () => {
  return (
    <div className='avenir'>
      <header className='flex column'>
        <section className='w-third'></section>
        <section className='w-third tc'><Logo /></section>
        <section className='w-third'><Login /></section>
      </header>
      <div className='flex column tc'>
        <section className='section-festList'>Fest List</section>
        <section className='section-schedule'>Schedule</section>
        <section className='section-timeline'>Timeline</section>
      </div>
      <footer className='absolute bottom-0 tc'>
        <p className='f7 black-70 mb2'>Made by Manbootay | 2020</p>
      </footer>
    </div>
  );
}

export default App;