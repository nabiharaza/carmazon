import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import AppRouter from './router/router';

function App(): JSX.Element {
    return (
      <div className='container'>
        <div className='navbar'>
            <Header />
        </div>
        <div className='app-body'>
          <AppRouter />
        </div>
      </div>
    );
}

export default App;
