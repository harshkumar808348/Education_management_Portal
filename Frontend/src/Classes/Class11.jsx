import React, { useEffect, useState } from 'react';

const Class11 = () => {
  const [class11Data, setClass11Data] = useState([]);

  useEffect(() => {
    const fetchClass11Data = async () => {
      const response = await fetch('http://localhost:3000/educational-services/class11');
      const data = await response.json();
      // console.log(data); // Verify data is an array
      setClass11Data(data);
    };

    fetchClass11Data();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Class 11 Information
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {class11Data.length > 0 ? (
          class11Data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600">
                <strong>Email:</strong> {item.email}
              </p>
              <p className="text-gray-600">
                <strong>Subject:</strong> {item.subject}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default Class11;
