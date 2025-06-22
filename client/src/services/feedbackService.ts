import axios from "axios";

const baseUrl = 'http://localhost:5000/feedback';

export default {
    async getPaginated(page: number = 0) {
        const result = await axios.get(`${baseUrl}?page=${page}`);
        return result.data;
    },

    async create(data: any) {
        const result = await axios.post(baseUrl, data);
        return result;
    },

    async getOne(id: string) {
        const result = await axios.get(`${baseUrl}/${id}`);
        return result.data;
    },

    async update(data: any) {
        const result = await axios.put(`${baseUrl}/${data._id}`, data);
        return result;
    },

    async delete(id: string) {
        const result = await axios.delete(`${baseUrl}/${id}`);
        return result;
    }
}