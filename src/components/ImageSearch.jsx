import React, { useState } from 'react';
import axios from 'axios';

const PIXABAY_API_KEY = '55450262-335910d306c051a6d12bb13ae';
const PIXABAY_API_URL = 'https://pixabay.com/api/';

function ImageSearch() {
    const [keyword, setKeyword] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchImages = async () => {
        if (!keyword.trim()) {
            setError('Veuillez entrer un mot-clé');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            const response = await axios.get(PIXABAY_API_URL, {
                params: {
                    key: PIXABAY_API_KEY,
                    q: keyword,
                    image_type: 'photo',
                    per_page: 20,
                    safesearch: true
                }
            });
            
            setImages(response.data.hits);
            if (response.data.hits.length === 0) {
                setError('Aucune image trouvée');
            }
        } catch (err) {
            setError('Erreur lors de la recherche');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="page-header">
                <h2>Recherche d'images</h2>
                <p>Recherchez des images libres de droits</p>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Entrez un mot-clé..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchImages()}
                />
                <button className="search-btn" onClick={searchImages}>
                    Rechercher
                </button>
            </div>

            {loading && <div className="loading">Chargement...</div>}
            {error && <div className="error">{error}</div>}

            {images.length > 0 && (
                <div className="images-grid">
                    {images.map((image) => (
                        <div key={image.id} className="image-item">
                            <img src={image.webformatURL} alt={image.tags} />
                            <div className="image-details">
                                <p>Likes: {image.likes}</p>
                                <p>Vues: {image.views}</p>
                                <p>Téléchargements: {image.downloads}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && !loading && keyword && !error && (
                <div className="no-results">Aucun résultat</div>
            )}
        </div>
    );
}

export default ImageSearch;