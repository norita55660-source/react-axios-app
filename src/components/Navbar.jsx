import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">MediaApp</div>
                <div className="nav-links">
                    <button 
                        className={`nav-link ${activeTab === 'images' ? 'active' : ''}`}
                        onClick={() => setActiveTab('images')}
                    >
                        Images
                    </button>
                    <button 
                        className={`nav-link ${activeTab === 'weather' ? 'active' : ''}`}
                        onClick={() => setActiveTab('weather')}
                    >
                        Météo
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;