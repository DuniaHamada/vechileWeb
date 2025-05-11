import Sidebar from '../Pages/Sidebar';
import { Outlet } from 'react-router-dom';

const MechanicLayout = () => {
  return (
    <div className="flex font-['Poppins']">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MechanicLayout;
