"use client"
  
  // components/PaymentForm.js
  import React, { useState } from 'react';
  import { loadScript } from '@/lib/loadScript';
  
  const PaymentForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      amount: '',
      name: '',
      email: '',
      contact: ''
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const initializePayment = async () => {
      try {
        setLoading(true);
  
        // Load Razorpay SDK
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
          alert('Razorpay SDK failed to load. Please check your internet connection.');
          return;
        }
  
        // Create order
        const orderResponse = await fetch('http://localhost:3001/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Number(formData.amount) * 100, // Convert to paise
            customerDetails: {
              name: formData.name,
              email: formData.email,
              contact: formData.contact
            }
          }),
        });
  
        const orderData = await orderResponse.json();
        if (!orderData.success) {
          throw new Error(orderData.error || 'Failed to create order');
        }
  
        // Configure payment options
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.data.amount,
          currency: orderData.data.currency,
          name: "Your Company Name",
          description: "Payment for your order",
          order_id: orderData.data.id,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
          },
          handler: async function (response) {
            try {
              // Verify payment
              const verifyResponse = await fetch('http://localhost:3001/api/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
  
              const verifyData = await verifyResponse.json();
              
              if (verifyData.success) {
                alert('Payment successful!');
                setFormData({
                  amount: '',
                  name: '',
                  email: '',
                  contact: ''
                });
              } else {
                throw new Error('Payment verification failed');
              }
            } catch (error) {
              console.error('Verification error:', error);
              alert('Payment verification failed');
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        // Initialize payment
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Payment error:', error);
        alert(error.message || 'Something went wrong!');
      } finally {
        setLoading(false);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.amount || !formData.name || !formData.email || !formData.contact) {
        alert('Please fill all fields');
        return;
      }
      initializePayment();
    };
  
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Make Payment
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter amount"
                min="1"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter your name"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter your email"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter your phone number"
                required
              />
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default PaymentForm;
  
  