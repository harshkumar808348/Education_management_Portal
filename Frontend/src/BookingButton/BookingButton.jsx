import React, { useState } from 'react';
import BookingForm from './Bookingform.jsx';

const BookingButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <>
      {!showForm && (
      <button 
      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 font-serif" 
      onClick={handleButtonClick}
    >
      Book Now
    </button>
      )}
      {showForm && <BookingForm />}
    </>
  );
};

export default BookingButton;