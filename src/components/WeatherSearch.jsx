import React, { useState } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = '3c99b89648be7bffffa9c92088eb73ca';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function WeatherSearch() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchWeather = async () => {
        if (!city.trim()) {
            setError('Veuillez entrer un nom de ville');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(WEATHER_API_URL, {
                params: {
                    q: city,
                    appid: WEATHER_API_KEY,
                    units: 'metric',
                    lang: 'fr'
                }
            });
            
            setWeather(response.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Ville non trouvée');
            } else {
                setError('Erreur de connexion');
            }
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="page-header">
                <h2>Météo par ville</h2>
                <p>Obtenez les informations météo d'une ville</p>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Entrez un nom de ville..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                />
                <button className="search-btn" onClick={searchWeather}>
                    Rechercher
                </button>
            </div>

            {loading && <div className="loading">Chargement...</div>}
            {error && <div className="error">{error}</div>}

            {weather && (
                <div className="weather-card">
                    <div className="weather-main">
                        <div>
                            <div className="city-name">{weather.name}</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>
                                {weather.sys.country}
                            </div>
                        </div>
                        <div className="temperature">
                            {Math.round(weather.main.temp)}°C
                        </div>
                    </div>
                    
                    <div className="weather-details-grid">
                        <div className="detail-item">
                            <div className="detail-label">Ressenti</div>
                            <div className="detail-value">{Math.round(weather.main.feels_like)}°C</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Humidité</div>
                            <div className="detail-value">{weather.main.humidity}%</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Vent</div>
                            <div className="detail-value">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Pression</div>
                            <div className="detail-value">{weather.main.pressure} hPa</div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Min / Max</div>
                            <div className="detail-value">
                                {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
                            </div>
                        </div>
                        <div className="detail-item">
                            <div className="detail-label">Condition</div>
                            <div className="detail-value">
                                {weather.weather[0].description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherSearch;