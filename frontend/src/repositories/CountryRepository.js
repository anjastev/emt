import axios from "axios";

const API_URL = "/api/countries";

class CountryRepository {
    async getAllCountries() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching countries:", error);
            throw error;
        }
    }

    async addCountry(countryData) {
        try {
            const response = await axios.post(API_URL, countryData);
            return response.data;
        } catch (error) {
            console.error("There was an error adding the country:", error);
            throw error;
        }
    }

    async deleteCountry(countryId) {
        try {
            await axios.delete(`${API_URL}/${countryId}`);
        } catch (error) {
            console.error("There was an error deleting the country:", error);
            throw error;
        }
    }

    async updateCountry(countryId, updatedCountryData) {
        try {
            const response = await axios.put(`${API_URL}/${countryId}`, updatedCountryData);
            return response.data;
        } catch (error) {
            console.error("There was an error updating the country:", error);
            throw error;
        }
    }
}

export default new CountryRepository();
