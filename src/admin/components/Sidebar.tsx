import { NavLink } from "react-router-dom";
import { LayoutDashboard, Building2, UserCircle } from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      to: "/admin/organisations",
      label: "Organisations",
      icon: <Building2 size={18} />,
    },
    {
      to: "/admin/teachers",
      label: "Teachers",
      icon: <UserCircle size={18} />,
    },
  ];
  return (
    <div className="w-64 hidden md:block">
      <div className="w-64 bg-[#FAFBFC] shadow-lg fixed inset-0 flex-col">
        <h2 className="text-2xl font-bold p-6 text-[#151D48]">Admin Panel</h2>
        <nav className="flex-1 flex flex-col gap-4 px-7 mt-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 rounded-lg py-3 text-[#737791] hover:bg-[#5D5FEF]/97 hover:text-white transition ${
                  isActive ? "bg-[#5D5FEF] font-semibold text-white" : ""
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
