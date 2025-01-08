import React from 'react';
import Card from './cardSection.jsx';
import { Routes, Route } from 'react-router-dom';

//use capital first letters
import FrontendDevelopment from '../TechnologySection/frontendDevelopment.jsx';
import BackendDevelopment from '../TechnologySection/BackendDevelopment.jsx';
import AppDevelopment from '../TechnologySection/AppDevelopment.jsx';
import AdvancedBackendDevelopment from '../TechnologySection/BackendDevelopment.jsx';
import AdvancedFrontendDevelopment from '../TechnologySection/AdvanceFrontendDevelopment.jsx';
import MachineLearning from '../TechnologySection/MachineLearning.jsx';
import DeepLearning from '../TechnologySection/DeepLearning.jsx';
import BlockChain from '../TechnologySection/BlockChain.jsx';
import UIandUX from '../TechnologySection/UIandUX.jsx';
import DevOps from '../TechnologySection/Devops.jsx';




const  TechnologySection = () => {
  return (
    <Routes>
      {/* Route for the Technology Services landing page */}
      <Route
        path="/"
        element={
          <div className="px-4">
            <h1 className="text-4xl font-semibold text-center font-sans text-blue-700 mt-8 mb-4 px-4 py-2">
              Technology Services Section
            </h1>

            <div className="flex flex-wrap justify-center gap-8">
              <Card
                title="Frontend Development"
                description="Learn modern frontend development techniques."
                imageUrl="../src/assets/frontend.jpg"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/frontend-development"
              />
              <Card
                title="Advanced Frontend Development"
                description="Master advanced frontend development."
                imageUrl="../src/assets/frontend.jpg"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/advanced-frontend-development"
              />
              <Card
                title="Backend Development"
                description="Learn backend technologies and frameworks."
                imageUrl="../src/assets/backend.jpg"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/backend-development"
              />
              <Card
                title="Advanced Backend Development"
                description="Advanced techniques for backend programming."
                imageUrl="../src/assets/backend.jpg"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/advanced-backend-development"
              />
              <Card
                title="App Development"
                description="Develop cross-platform applications."
                imageUrl="../src/assets/app.avif"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/app-development"
              />
              <Card
                title="Machine Learning"
                description="Explore the world of machine learning."
                imageUrl="../src/assets/machine.webp"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/machine-learning"
              />
              <Card
                title="Deep Learning"
                description="Dive deep into deep learning technologies."
                imageUrl="../src/assets/deep.png"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/deep-learning"
              />
              <Card
                title="Blockchain"
                description="Learn about blockchain technology."
                imageUrl="../src/assets/block.jpg"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/blockchain"
              />
              <Card
                title="UI/UX"
                description="Enhance user experiences with UI/UX design."
                imageUrl="../src/assets/uiux.avif"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/ui-ux"
              />
              <Card
                title="DevOps"
                description="Master the principles of DevOps."
                imageUrl="../src/assets/dev.jpg"
                buttonText="Ask My Teacher"
                linkTo="/technology-services/devops"
              />
            </div>
          </div>
        }
      />

      {/* Dynamic child routes */}
      <Route path="/frontend-development" element={<FrontendDevelopment />} />
      <Route path="/advanced-frontend-development" element={<AdvancedFrontendDevelopment />} />
      <Route path="/backend-development" element={<BackendDevelopment />} />
      <Route path="/advanced-backend-development" element={<AdvancedBackendDevelopment />} />
      <Route path="/app-development" element={<AppDevelopment />} />
      <Route path="/machine-learning" element={<MachineLearning />} />
      <Route path="/deep-learning" element={<DeepLearning />} />
      <Route path="/blockchain" element={<BlockChain />} />
      <Route path="/ui-ux" element={<UIandUX />} />
      <Route path="/devops" element={<DevOps />} />
     
    </Routes>
  );
};

export default TechnologySection;