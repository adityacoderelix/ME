"use client"


import axios from 'axios';

// Base URL for all API calls - using environment variable with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

// Creating an axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to handle common response transformations and errors
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    // Extract the most meaningful error message
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    
  }
);

export const authService = {
  // Request OTP for new registration
  requestOtp: async (userData) => {
    try {
      const response = await apiClient.post('/register/request-otp', {
        phoneNumber: userData.phoneNumber,
        email: userData.email,
    fullName: userData.fullName
      });
      return response;
    } catch (error) {
      console.lod(error.message || 'Failed to send OTP');
    }
  },

  // Verify OTP and complete registration
  verifyOtp: async (verificationData) => {
    try {
      const response = await apiClient.post('/register/verify-otp', {
        phoneNumber: verificationData.phoneNumber,
        otp: verificationData.otp
      });
      return response;
    } catch (error) {
      console.error('Failed to verify OTP', error);

    }
  }
};