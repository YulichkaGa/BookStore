import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5066/api'
});

export const getBooks = async () => {
    const response = await api.get('/books');
    return response.data;
};

export const deleteBook = async (isbn: string): Promise<void> => {
    await api.delete(`/books/${isbn}`);
};
export const addBook = async (book: any) => {
    await api.post('/books', book);
};


export default api;