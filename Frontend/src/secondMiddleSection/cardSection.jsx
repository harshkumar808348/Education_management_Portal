import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, imageUrl, buttonText, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    if (linkTo) navigate(linkTo);
  };

  return (
    <div 
      className="w-72 bg-gray-900 border border-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Image Container with overlay effect */}
      <div className="relative group">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-white tracking-wide">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">
          {description}
        </p>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg 
                     transition-colors duration-300 transform hover:translate-y-[-2px] 
                     shadow-lg hover:shadow-blue-500/25 active:scale-95"
          onClick={handleClick}
        >
          <span className="flex items-center justify-center gap-2">
            {buttonText}
            <svg 
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Card;