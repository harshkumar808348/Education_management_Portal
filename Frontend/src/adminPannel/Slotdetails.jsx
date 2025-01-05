import React, { useState, useEffect } from 'react';

const SlotDetails = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3000/MainAdmin/get-bookings');
        const data = await response.json();
        
        if (data.success) {
          // Log the received data to check its structure
          console.log('Received bookings:', data.bookings);
          
          // Transform the data if needed
          const formattedBookings = data.bookings.map(booking => ({
            ...booking,
            // Ensure time is properly formatted
            time: booking.hour && booking.minute && booking.period 
              ? `${booking.hour}:${booking.minute} ${booking.period}`
              : booking.time || 'N/A',
            // Ensure teacherId exists, use a default if not present
            teacherId: booking.teacherId || 'Not assigned'
          }));
          
          setBookings(formattedBookings);
        } else {
          setError('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Booked Slots</h2>
      <div className="grid gap-4">
        {bookings.length === 0 ? (
          <div className="text-center text-gray-500">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking, index) => {
                  // Log individual booking data for debugging
                  console.log('Rendering booking:', booking);
                  
                  return (
                    <tr key={booking._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {booking.teacherId || 'Not assigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.email || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.date || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.time || 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotDetails;