import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ;

export const kycService = {
  getAllProperties: async (type = null) => {
    try {
      const params = type ? { type } : {};
      const response = await axios.get(`${API_BASE_URL}/kyc`, {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch kyc"
      );
    }
  },

  getPropertyById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kyc/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch property"
      );
    }
  },
  createProperty: async (propertyData) => {
    delete propertyData._id;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/verify-kyc/`,
        propertyData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to verify KYC"
      );
    }
  },

  updateProperty: async (id, propertyData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/kyce/update-kyc/${id}`,
        propertyData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update kyc"
      );
    }
  },

  getUserPropertyListings: async (userEmail, page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/kyc/${userEmail}`,
        {
          params: { page, limit },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user listings"
      );
    }
  },
  getUserListingById: async (hostEmail, id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/verify-kyc/${id}`, {
        params: { hostEmail },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user kyc"
      );
    }
  },
};
