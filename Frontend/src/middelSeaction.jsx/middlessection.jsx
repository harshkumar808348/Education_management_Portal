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
    <div className="px-4">
     <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center font-sans text-blue-600 mt-4 md:mt-8 mb-2 md:mb-4 px-2 md:px-4 py-1 md:py-2 truncate">
  Educational Services Section
</h1>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-wrap justify-center gap-8">
              <Card
                title="Class 9"
                description="This is the first card. It has a unique description and image."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Learn More"
                linkTo="/educational-services/class9"
              />
              <Card
                title="Class 10"
                description="This is the second card with a different description and content."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="View Details"
                linkTo="/educational-services/class10"
              />
              <Card
                title="Class 11"
                description="Here's the third card. You can customize it with any text and image."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Explore"
                linkTo="/educational-services/class11"
              />
              <Card
                title="Class 12"
                description="Here's the fourth card. You can customize it with any text and image."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Explore"
                linkTo="/educational-services/class12"
              />
              <Card
                title="JEE"
                description="Prepare for JEE with our resources."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Explore"
                linkTo="/educational-services/jee"
              />
              <Card
                title="NEET"
                description="Prepare for NEET with our resources."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Explore"
                linkTo="/educational-services/neet"
              />
              <Card
                title="Competitive Exams"
                description="Resources for competitive exams."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Explore"
                linkTo="/educational-services/competitive-exams"
              />
              <Card
                title="UPSC Exams"
                description="Prepare for UPSC exams with expert guidance."
                imageUrl="https://via.placeholder.com/400x300"
                buttonText="Explore"
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