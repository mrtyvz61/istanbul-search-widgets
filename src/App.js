import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddressWidget from './components/address/AddressWidget';
import ParcelWidget from './components/parcel/ParcelWidget';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Address and Parcel Widgets</p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <p className='pTop headerStyle'>Address Widget</p>
      <AddressWidget />
      <p className='pTop headerStyle'>Parcel Widget</p>
      <ParcelWidget />
    </div>
  );
}

export default App;
