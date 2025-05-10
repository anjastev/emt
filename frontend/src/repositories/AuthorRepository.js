import axios from "axios";

const API_URL = "/api/authors";

class AuthorRepository {
    async getAllAuthors() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching authors:", error);
            throw error;
        }
    }

    async addAuthor(authorData) {
        try {
            const response = await axios.post(API_URL, authorData);
            return response.data;
        } catch (error) {
            console.error("There was an error adding the author:", error);
            throw error;
        }
    }

    async deleteAuthor(authorId) {
        try {
            await axios.delete(`${API_URL}/${authorId}`);
        } catch (error) {
            console.error("There was an error deleting the author:", error);
            throw error;
        }
    }

    async updateAuthor(authorId, updatedAuthorData) {
        try {
            const response = await axios.put(`${API_URL}/${authorId}`, updatedAuthorData);
            return response.data;
        } catch (error) {
            console.error("There was an error updating the author:", error);
            throw error;
        }
    }
}

export default new AuthorRepository();
