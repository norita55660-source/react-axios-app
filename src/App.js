import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ImageSearch from './components/ImageSearch';
import WeatherSearch from './components/WeatherSearch';

function App() {
    const [activeTab, setActiveTab] = useState('images');

    return (
        <div className="app">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="container">
                {activeTab === 'images' ? <ImageSearch /> : <WeatherSearch />}
            </div>
        </div>
    );
}

export default App;