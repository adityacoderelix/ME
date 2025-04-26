import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const blogService = {
  getRecentBlogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blogs/recent`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recent blogs');
    }
  },
};
