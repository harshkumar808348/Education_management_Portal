import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, UserPlus, GraduationCap } from 'lucide-react';

const LoginOptions = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Admin Login",
      description: "Access your administrative dashboard",
      icon: <UserCircle size={48} className="text-indigo-500" />,
      path: "/adminlogin",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      hoverColor: "hover:from-indigo-100 hover:to-indigo-200",
      borderColor: "border-indigo-200",
    },
    {
      title: "Register as Admin",
      description: "Create a new admin account",
      icon: <UserPlus size={48} className="text-emerald-500" />,
      path: "/adminregister",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      hoverColor: "hover:from-emerald-100 hover:to-emerald-200",
      borderColor: "border-emerald-200",
    },
    {
      title: "Teacher Login",
      description: "Access your teaching portal",
      icon: <GraduationCap size={48} className="text-purple-500" />,
      path: "/teacherlogin",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      hoverColor: "hover:from-purple-100 hover:to-purple-200",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="relative min-h-[75vh] bg-black overflow-hidden">
      {/* Animated beam background */}
      <div className="absolute inset-0">
        {/* Purple beam */}
        <div
          className="absolute w-96 h-[100vh] -left-32 top-0 
          bg-purple-500/20 rotate-[20deg] blur-3xl 
          animate-[pulse_4s_ease-in-out_infinite] delay-300"
        ></div>

        {/* Blue beam */}
        <div
          className="absolute w-96 h-[100vh] left-1/4 top-0 
          bg-blue-500/20 rotate-[20deg] blur-3xl 
          animate-[pulse_4s_ease-in-out_infinite] delay-100"
        ></div>

        {/* Indigo beam */}
        <div
          className="absolute w-96 h-[100vh] right-1/4 top-0 
          bg-indigo-500/20 rotate-[20deg] blur-3xl 
          animate-[pulse_4s_ease-in-out_infinite] delay-500"
        ></div>

        {/* Pink beam */}
        <div
          className="absolute w-96 h-[100vh] -right-32 top-0 
          bg-pink-500/20 rotate-[20deg] blur-3xl 
          animate-[pulse_4s_ease-in-out_infinite] delay-700"
        ></div>

        {/* Overlay gradient to enhance beam effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-4 px-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Education Portal
            </h1>
            <p className="text-xl text-gray-300">
              Choose your login option to get started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => navigate(card.path)}
                className={`cursor-pointer transform transition-all duration-300 hover:scale-105 
                  hover:rotate-3 hover:-translate-y-2 rounded-2xl shadow-lg overflow-hidden border 
                  ${card.borderColor} ${card.bgColor} ${card.hoverColor} p-6
                  flex flex-col items-center justify-center space-y-4`}
              >
                <div className="p-3 rounded-full bg-white shadow-md">{card.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800">{card.title}</h2>
                <p className="text-gray-600 text-center">{card.description}</p>
                <button
                  className="mt-4 px-6 py-2 bg-white rounded-full shadow-md 
                    text-gray-800 font-medium hover:shadow-lg 
                    transform transition-all duration-300 hover:-translate-y-1"
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
