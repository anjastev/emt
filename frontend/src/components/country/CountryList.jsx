import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryItem from './CountryItem';
import CountryModal from './CountryModal';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editCountry, setEditCountry] = useState(null);

    useEffect(() => {
        axios.get('https://your-api-url/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleAddCountry = () => {
        setShowModal(true);
        setEditCountry(null);
    };

    const handleEditCountry = (country) => {
        setEditCountry(country);
        setShowModal(true);
    };

    const handleDeleteCountry = (id) => {
        axios.delete(`https://your-api-url/countries/${id}`)
            .then(() => {
                setCountries(countries.filter(country => country.id !== id));
            })
            .catch(error => {
                console.error('Error deleting country:', error);
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditCountry(null);
    };

    return (
        <div className="country-list">
            <h2>Country List</h2>
            <button className="add-country-btn" onClick={handleAddCountry}>Add New Country</button>
            <div className="country-items">
                {countries.map(country => (
                    <CountryItem
                        key={country.id}
                        country={country}
                        onEdit={handleEditCountry}
                        onDelete={handleDeleteCountry}
                    />
                ))}
            </div>
            {showModal && <CountryModal country={editCountry} onClose={closeModal} />}
        </div>
    );
};

export default CountryList;
