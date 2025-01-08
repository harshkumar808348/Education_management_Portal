import React, { useEffect, useState } from 'react';
import BookingButton from "../BookingButton/BookingButton.jsx";

const Class10 = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await fetch('https://education-management-portal-1.onrender.com/class10');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTeacherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Class 10 Teachers
          </h1>
          <p className="text-gray-600 mt-1">Expert Faculty Members for Class 10</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {teacherData && teacherData.length > 0 ? (
            teacherData.map((teacher) => (
              <div
                key={teacher._id || teacher.teacherId}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img
                    src={teacher.Image}
                    alt={`${teacher.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-4">
                    <h2 className="text-white text-base sm:text-xl font-semibold">
                      {teacher.name}
                    </h2>
                    <p className="text-white/90 text-xs sm:text-sm">
                      {teacher.subject}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
                  {/* Teacher Details */}
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {teacher.email}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      ID: {teacher.teacherId}
                    </div>
                  </div>
                  {/* Amount */}
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Amount: ₹{teacher.Amount}
                  </div>
                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                    {teacher.description}
                  </p>

                  {/* Booking Button */}
                  <div className="pt-2 sm:pt-3">
                    <BookingButton className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-200" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 20V4" />
              </svg>
              <p className="mt-4 text-gray-500 text-lg">No teachers available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Class10;
