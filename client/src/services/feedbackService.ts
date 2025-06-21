import axios from "axios";

const baseUrl = 'http://localhost:5000/feedback';
const createUrl = 'http://localhost:5000/submit-feedback';

export default {
    async getAll() {
        const result = await axios.get(baseUrl);

        return result.data;
    },

    async create(data: any) {
        const result = await axios.post(createUrl, data);

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
        await axios.delete(`${baseUrl}/${id}`);
    }
}