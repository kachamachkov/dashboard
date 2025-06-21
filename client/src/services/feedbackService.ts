import axios from "axios";

const baseUrl = 'http://localhost:5000/feedback';

export default {
    async getFeedbackItems() {
        const result = await axios.get(baseUrl);

        return result.data;
    },

    async updateFeedbackItem(data: any) {
        const result = await axios.put(`${baseUrl}/${data._id}`, data);

        console.log(result);
        return result;
    },

    async deleteFeedbackItem(data: any) {
        await axios.delete(`${baseUrl}/${data._id}`);
    }
}