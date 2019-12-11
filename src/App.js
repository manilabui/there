import React from 'react';
import { ReactComponent as Logo } from './assets/Logo.svg';
import Login from './components/auth/Login';
import FestList from './components/news/NewsList';
import Schedule from './components/schedule/Schedule';
import Timeline from './components/timeline/Timeline';
import './App.css';

export default () => {
  return (
    <div className='avenir'>
      <header className='flex'>
        <section className='w-third'></section>
        <section className='w-third tc'><Logo /></section>
        <section className='w-third'><Login /></section>
      </header>
      <div className='flex'>
        <section className='section-festList'><FestList /></section>
        <section className='section-schedule tc'><Schedule /></section>
        <section className='section-timeline'><Timeline /></section>
      </div>
      <footer className='absolute bottom-0'>
        <p className='f7 black-70 mb2'>Made by Manbootay | 2020</p>
      </footer>
    </div>
  );
}