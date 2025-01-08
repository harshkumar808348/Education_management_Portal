import React from 'react'

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* Main Content Container */}
      <div className="max-w-3xl text-center space-y-8">
        {/* Logo/Title Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Ask My Teacher
        </h1>
        
        {/* Coming Soon Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-400">
            Our Services Are Coming Soon
          </h2>
          <p className="text-gray-300 text-lg md:text-xl">
            We're currently working hard to bring you the best educational experience.
          </p>
        </div>

        {/* Feature Preview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-2xl mx-auto">
          <h3 className="text-xl text-white mb-4">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-300">Expert Teachers</span>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-300">24/7 Doubt Resolution</span>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-300">Interactive Learning</span>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-300">Personalized Support</span>
            </div>
          </div>
        </div>

        {/* Notify Section */}
        <div className="space-y-4">
          <p className="text-gray-300">
            Want to know when we launch?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none w-full sm:w-auto"
            />
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto">
              Notify Me
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-gray-400 text-sm">
          <p>For inquiries, contact us at:</p>
          <p className="text-blue-400">support@askmyteacher.com</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

