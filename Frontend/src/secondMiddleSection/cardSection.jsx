import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, imageUrl, buttonText, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Prevent event from bubbling if button is clicked directly
    e.stopPropagation();
    if (linkTo) navigate(linkTo);
  };

  return (
    <div 
      className="w-64 border rounded-lg shadow-lg p-4 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-40 object-cover rounded-t-lg" 
      />
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;