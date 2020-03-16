import React from 'react';
import home from '../../images/home.svg';
import './home.css';
import Searchbar from '../../components/searchbar/searchbar'

function App() {
  return (
    <div className="App">
       <img src={home} className="home-image" alt="home" />
       <h1 className="coblima-header">COBLIMA</h1>
       <Searchbar />
    </div>
  );
}

export default App;
