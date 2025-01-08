import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrImage from '../assets/Qr.jpg';

const Payment = () => {
  const [showQR, setShowQR] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    transactionHour: '',
    transactionAMPM: '',
    transactionId: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const { transactionHour, transactionAMPM } = formData;
    if (!transactionHour || !transactionAMPM) {
      setError('Please provide a valid transaction time.');
      setIsLoading(false);
      return;
    }
  
    const fullTransactionTime = `${transactionHour} ${transactionAMPM}`;
  
    try {
      const response = await fetch('https://education-management-portal-1.onrender.com/MainAdmin/PaymentDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          transactionTime: fullTransactionTime,
          transactionId: formData.transactionId,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Payment submission failed: ${errorData}`);
      }
  
      const data = await response.json();
      console.log('Payment submitted successfully:', data);
      setShowDialog(true);
    } catch (err) {
      console.error('Error submitting payment:', err);
      setError(err.message || 'Failed to submit payment details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <h4 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6">
            If the amount is free, then write{' '}
            <span className="text-red-500 animate-pulse">Transaction ID -- Free</span>
          </h4>
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6">Payment Details</h2>
          <h2 className="text-lg sm:text-2xl font-bold text-center mb-4 sm:mb-6">8083484534-2@ybl</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
          )}

          <div className="mb-6">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </button>
          </div>

          {showQR && (
            <div className="mb-6 flex justify-center">
              <img
                src={QrImage}
                alt="QR Code"
                className="w-48 sm:w-64 h-48 sm:h-64 object-contain"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="transactionTime"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Transaction Time
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  id="transactionHour"
                  name="transactionHour"
                  value={formData.transactionHour}
                  onChange={handleInputChange}
                  min="1"
                  max="12"
                  placeholder="Hour (1-12)"
                  required
                  className="w-1/2 sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  id="transactionAMPM"
                  name="transactionAMPM"
                  value={formData.transactionAMPM}
                  onChange={handleInputChange}
                  required
                  className="w-1/2 sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="transactionId"
                className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
              >
                Transaction ID
              </label>
              <input
                type="text"
                id="transactionId"
                name="transactionId"
                placeholder="Enter transaction ID"
                value={formData.transactionId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Submitting...' : 'Submit Details'}
            </button>
          </form>
        </div>
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Thanks for entering the details. We will connect with you soon.
              </p>
              <button
                onClick={() => {
                  setShowDialog(false);
                  navigate('/');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Thank You
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
