import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teacherId: '',
    name: '',
    email: '',
    date: '',
    hour: '12',
    minute: '00',
    period: 'AM'
  });

  const [saveStatus, setSaveStatus] = useState('');

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving...');

    try {
      const response = await fetch('http://localhost:3000/MainAdmin/save-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSaveStatus('Booking slot successfully - we will connect by email shortly');
        setFormData({
          teacherId: '',
          name: '',
          email: '',
          date: '',
          hour: '12',
          minute: '00',
          period: 'AM'
        });
        navigate('/educational-services/payment');
      } else {
        setSaveStatus('Error saving booking. Please try again.');
      }
    } catch (error) {
      setSaveStatus('Error saving booking. Please try again.');
    }

    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="teacherId" className="mb-1">Teacher ID: <p>Available below the Teachername</p> </label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            required
            placeholder="Enter teacher ID"
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="mb-1">Choose Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
        </div>

        <div className="flex flex-col relative">
          <label className="mb-1">Choose Time:</label>
          <div className="flex space-x-2">
            <select
              name="hour"
              value={formData.hour}
              onChange={handleChange}
              className="border rounded p-2"
            >
              {hours.map(hour => (
                <option key={hour} value={hour}>{hour}</option>
              ))}
            </select>
            <span className="self-center">:</span>
            <select
              name="minute"
              value={formData.minute}
              onChange={handleChange}
              className="border rounded p-2"
            >
              {minutes.map(minute => (
                <option key={minute} value={minute}>{minute}</option>
              ))}
            </select>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Book Slot
        </button>

        {saveStatus && (
          <div className={`text-center p-2 rounded ${
            saveStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {saveStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;