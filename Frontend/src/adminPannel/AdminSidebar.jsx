import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Users, Folder, UserPlus } from 'lucide-react';
import Class9adminPannel from './Class9adminPannel';
import Class10adminPannel from './Class10adminPannel';
import Class11adminPannel from './Class11adminPannel';
import SlotDetials from './Slotdetails';
import PaymentDetails from './PaymentDetails.jsx';
import UpscAdminPanel from './UpscadminPannel.jsx';
import Class12AdminPanel from './Class12adminPannel.jsx';
import NeetAdminPanel from './NeetAdminPannel.jsx';
import CompetativePannel from './CompetativeadminPannel.jsx';
import JeeAdminPanel from './JeeadminPannel.jsx';
import ModifyClass10 from './ModifyClass9.jsx';
import ModifyClass9 from './ModifyClass10.jsx';
// import RegisterPannel from './adminRegister.jsx';



// Sub-menu item component
const SubMenuItem = ({ icon: Icon, children, linkTo }) => (
  <Link
    to={linkTo || '#'}
    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-100 hover:font-medium cursor-pointer transition-all"
  >
    <Icon className="w-4 h-4 mr-2" />
    {children}
  </Link>
);

// Sidebar menu section component
const MenuSection = ({ icon: Icon, title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <div
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-100 cursor-pointer transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="w-4 h-4 mr-2" />
        <span>{title}</span>
      </div>
      {isOpen && <div className="ml-4">{children}</div>}
    </div>
  );
};

// Sidebar component
const Sidebar = ({ collapsed, setCollapsed }) => (
  <div
    className={`h-screen bg-white border-r transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}
  >
    {/* Sidebar Header */}
    <div className="flex items-center justify-between p-4 border-b">
      {!collapsed && <span className="font-bold text-sm tracking-wider">Justfree.com </span>}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </div>

    {/* Sidebar Content */}
    <div className="py-2">
      {!collapsed ? (
        <>
          {/* Dashboard Link */}
          <Link
            to="/MainAdmin"
            className="px-4 py-2 text-sm text-gray-700 hover:bg-emerald-100 cursor-pointer flex items-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </Link>

          {/* Educational Teachers Section */}
          <MenuSection icon={Users} title="Add Educational Teachers">
            <SubMenuItem icon={UserPlus} linkTo="/MainAdmin/Class9adminPannel">
              Class 9
            </SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo="/MainAdmin/Class10adminPannel">
              Class 10
            </SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo="/MainAdmin/Class11adminPannel">Class 11</SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo="/MainAdmin/Class12AdminPanel">Class 12</SubMenuItem>
            <SubMenuItem icon={UserPlus}linkTo={"/MainAdmin/JeeAdminPanel"}>JEE</SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo={"/MainAdmin/NeetAdminPanel"}>NEET</SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo={"/MainAdmin/CompetativePannel"}>Competitive Exam</SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo={"/MainAdmin/UpscAdminPanel"}>UPSC Exam</SubMenuItem>
          </MenuSection>

          {/* Technical Teachers Section */}
          <MenuSection icon={Users} title="Add Technical Teachers">
            <SubMenuItem icon={UserPlus}>Frontend Developer</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Backend Developer</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Advanced Backend Developer</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Advanced Frontend Developer</SubMenuItem>
            <SubMenuItem icon={UserPlus}>App Developer</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Machine Learning</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Deep Learning</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Blockchain</SubMenuItem>
            <SubMenuItem icon={UserPlus}>UI/UX</SubMenuItem>
            <SubMenuItem icon={UserPlus}>DevOps</SubMenuItem>
          </MenuSection>

          {/* Modify Teachers Section */}
          <MenuSection icon={Folder} title="Modify and Edit Teachers">
            <SubMenuItem icon={UserPlus} linkTo={"/MainAdmin/ModifyClass9"}>Class 9</SubMenuItem>
            <SubMenuItem icon={UserPlus} linkTo={"/MainAdmin/ModifyClass10"}>Class 10</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Class 11</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Class 12</SubMenuItem>
            <SubMenuItem icon={UserPlus}>JEE</SubMenuItem>
            <SubMenuItem icon={UserPlus}>NEET</SubMenuItem>
            <SubMenuItem icon={UserPlus}>Competitive Exam</SubMenuItem>
            <SubMenuItem icon={UserPlus}>UPSC Exam</SubMenuItem>
          </MenuSection>
          <MenuSection icon={Folder} title="Teachers slot Details ">
          <SubMenuItem icon={UserPlus} linkTo="/MainAdmin/SlotDetial">Details</SubMenuItem>
           
          </MenuSection>
          <MenuSection icon={Folder} title="Student Payment Details ">
          <SubMenuItem icon={UserPlus} linkTo="/MainAdmin/PaymentDetails">Details</SubMenuItem>
           
          </MenuSection>
          <MenuSection icon={Folder} title="Register as new admin ">
          <SubMenuItem icon={UserPlus} linkTo="">go here /adminRegister</SubMenuItem>
           
          </MenuSection>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Home className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer" />
          <Users className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer" />
          <Folder className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer" />
        </div>
      )}
    </div>
  </div>
);

const MainAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Routes>
          {/* Default Dashboard Route */}
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-xl font-bold">Welcome to Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to Ask My Teacher Admin Dashboard.</p>
              </div>
            }
          />
          {/* Sub-routes */}
          <Route path="/Class9adminPannel" element={<Class9adminPannel />} />
          <Route path="/Class10adminPannel" element={<Class10adminPannel />} />
          <Route path="/Class11adminPannel" element={<Class11adminPannel />} />
          <Route path="/SlotDetial" element={<SlotDetials />} />
          <Route path="/PaymentDetails" element={<PaymentDetails />} />
          <Route path="/UpscAdminPanel" element={<UpscAdminPanel />} />
          <Route path="/Class12AdminPanel" element={<Class12AdminPanel />} />
          <Route path="/NeetAdminPanel" element={<NeetAdminPanel />} />
          <Route path="/CompetativePannel" element={<CompetativePannel />} />
          <Route path="/UpscAdminPanel" element={<UpscAdminPanel />} />
          <Route path='/JeeAdminPanel' element={<JeeAdminPanel />} />
          <Route path='/ModifyClass10' element={<ModifyClass10 />} />
          <Route path='/ModifyClass9' element={<ModifyClass9 />} />
          
       
        </Routes>
      </div>
    </div>
  );
};

export default MainAdmin;
