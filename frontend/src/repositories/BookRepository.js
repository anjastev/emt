import axios from "axios";

const API_URL = "/api/books";

class BookRepository {
    async getAllBooks() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("There was an error fetching books:", error);
            throw error;
        }
    }

    async addBook(bookData) {
        try {
            const response = await axios.post(API_URL, bookData);
            return response.data;
        } catch (error) {
            console.error("There was an error adding the book:", error);
            throw error;
        }
    }

    async deleteBook(bookId) {
        try {
            await axios.delete(`${API_URL}/${bookId}`);
        } catch (error) {
            console.error("There was an error deleting the book:", error);
            throw error;
        }
    }

    async updateBook(bookId, updatedBookData) {
        try {
            const response = await axios.put(`${API_URL}/${bookId}`, updatedBookData);
            return response.data;
        } catch (error) {
            console.error("There was an error updating the book:", error);
            throw error;
        }
    }
}

export default new BookRepository();
