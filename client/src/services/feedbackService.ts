import axios from "axios";

const baseUrl = 'http://localhost:5000/feedback';

export default {
    async getAll() {
        const result = await axios.get(baseUrl);

        return result.data;
    },

    async getOne(data: any) {
        const result = await axios.get(`${baseUrl}/${id}`);

        return result.data;
    },

    async update(data: any) {
        const result = await axios.put(`${baseUrl}/${data._id}`, data);

        return result;
    },

    async delete(id: number) {
        await axios.delete(`${baseUrl}/${id}`);
    }
}