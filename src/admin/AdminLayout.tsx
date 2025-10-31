import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#FAFBFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
