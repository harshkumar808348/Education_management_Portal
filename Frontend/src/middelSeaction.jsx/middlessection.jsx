// EducationalServicesSection.jsx
import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Card from './cardSection.jsx';
import Class9 from "../Classes/Class9.jsx";
import Class10 from '../Classes/Class10.jsx';
import Class11 from '../Classes/Class11.jsx';
import Class12 from '../Classes/Class12.jsx';                                     
import Jee from '../Classes/Jee.jsx';
import Neet from '../Classes/Neet.jsx';
import CompetativeExam from '../Classes/CompetativeExam.jsx';
import UpscExam from '../Classes/UpscExam.jsx';
import Payment from '../BookingButton/Payment.jsx';

const EducationalServicesSection = () => {
  return (
    <div className="min-h-screen bg-white px-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center font-sans text-black-400 mt-4 md:mt-8 mb-2 md:mb-4 px-2 md:px-4 py-1 md:py-2 truncate">
        Educational Services Section
      </h1>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-wrap justify-center gap-8 py-8">
              <Card
                title="Class 9"
                description="Prepare for Class 9 exams with clarity and confidence. Get step-by-step solutions to your doubts from expert teachers on our portal"
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/class9.jpg"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/class9/"
              />
              <Card
                title="Class 10"
                description="Master Class 10 board exams with ease. Ask your doubts to our experienced educators anytime and get instant answers to ace your subjects and secure top marks."
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/class10.png"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/class10"
              />
              <Card
                title="Class 11"
                description="Class 11 is the gateway to advanced learning. Clear your concepts in physics, chemistry, math, and biology by resolving doubts with the help of our expert teachers on the portal."
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/class11.png"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/class11"
              />
              <Card
                title="Class 12"
                description="Crack Class 12 board exams with thorough understanding. Ask doubts anytime on our platform, where expert educators provide detailed answers for your success."
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/class12.webp"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/class12"
              />
              <Card
                title="JEE"
                description="Excel in JEE preparation with targeted doubt-solving sessions. Get precise answers from subject matter experts and enhance your problem-solving skills to secure a top rank"
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/jee.jpg"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/jee"
              />
              <Card
                title="NEET"
                description="NEET success starts here! Resolve all your doubts with detailed explanations from biology, physics, and chemistry experts. Stay ahead with accurate answers to every query"
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/neet.jpg"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/neet"
              />
              <Card
                title="Competitive Exams"
                description="Crack any competitive exam with ease. From logical reasoning to subject-specific queries, get your doubts cleared by experts and achieve your dream career"
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/competitive_Exam_Preparation.png"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/competitive-exams"
              />
              <Card
                title="UPSC Exams"
                description="Prepare for UPSC with confidence! From conceptual clarity to current affairs, get personalized doubt-solving support from seasoned educators to ace the Civil Services Examination."
                descriptionClassName="text-gray-300 text-sm leading-relaxed"
                imageUrl="../src/assets/upsc.jpg"
                buttonText="Ask My Teacher"
                linkTo="/educational-services/upsc-exams"
              />
            </div>
          }
        />
        <Route path="class9" element={<Class9 />} />
        <Route path="class10" element={<Class10 />} />
        <Route path="class11" element={<Class11 />} />
        <Route path="class12" element={<Class12 />} />
        <Route path="jee" element={<Jee />} />
        <Route path="neet" element={<Neet />} />
        <Route path="competitive-exams" element={<CompetativeExam />} />
        <Route path="upsc-exams" element={<UpscExam />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default EducationalServicesSection;