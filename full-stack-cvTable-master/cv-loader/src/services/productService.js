import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`http://localhost:5000/api/product`);
        return res.data || [];
    },

    post: async (cv_text) => {
        await axios.post(`http://localhost:5000/api/product`, {cv_text});

    }
}