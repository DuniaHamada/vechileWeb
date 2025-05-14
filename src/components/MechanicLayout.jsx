import Sidebar from '../Pages/Sidebar';
import { Outlet } from 'react-router-dom';
import Topbar from "./Topbar";

const MechanicLayout = () => {
  return (
    <div className="flex font-['Poppins']">
      <Sidebar />

        <Topbar />
       <main className="flex-1 pt-24 mr-36">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
    </div>
  );
};

export default MechanicLayout;
