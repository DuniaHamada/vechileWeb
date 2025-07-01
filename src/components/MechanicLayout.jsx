import Sidebar from '../Pages/Sidebar';
import { Outlet } from 'react-router-dom';
import Topbar from "../Pages/Topbar";

const MechanicLayout = () => {
  return (
    <div className="flex font-['Poppins']">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 pt-24 pl-64 pr-8"> 
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MechanicLayout;