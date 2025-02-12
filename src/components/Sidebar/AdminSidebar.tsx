import { GrDashboard, GrUser, GrCube, GrClipboard, GrCart, GrSettingsOption } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface LinkProps {
  name: string;
  href?: string;
  icon: React.ElementType;
  subLinks?: { name: string; href: string }[];
}

const AdminSidebar = () => {
  const activeClass = "bg-[#1E304B] border-l-[6px] border-red-500";
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const links: LinkProps[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: GrDashboard },
    {
      name: "Users", href: "/admin/users", icon: GrUser, subLinks: [
        { name: "All Users", href: "/admin/users" },
        { name: "Add User", href: "/admin/users/add" }
      ]
    },
    {
      name: "Products", href: "/admin/products", icon: GrCube
      , subLinks: [
        { name: "All Products", href: "/admin/products" },
        { name: "Add Product", href: "/admin/products/add" }
      ]
    },
    { name: "Categories", href: "/admin/categories", icon: GrClipboard },
    { name: "Orders", href: "/admin/orders", icon: GrCart },
    { name: "Settings", href: "/admin/settings", icon: GrSettingsOption },
  ];

  const { pathname } = useLocation();

  return (
    <div className="bg-[#16283C] border-r min-h-screen w-48 sticky top-0 left-0 text-white text-center py-6">
      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <div key={index}>
            <div className="flex items-center justify-between  transition-all duration-300 hover:bg-[#1E304B]">
              <Link
                to={link.href || "#"}
                className={`flex items-center w-full gap-3 px-4 py-3 text-sm  transition-all duration-300 hover:bg-[#1E304B] ${pathname === link.href ? activeClass : ""}`}
              >
                <link.icon className="text-lg" />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
              {link.subLinks && (
                <button
                  onClick={() => toggleMenu(link.name)}
                  className="text-white focus:outline-none"
                >
                  <FaChevronDown className={`transition-transform mr-2 ${openMenus[link.name] ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
            {link.subLinks && openMenus[link.name] && (
              <div className="ml-8 flex flex-col gap-1">
                {link.subLinks.map((subLink, subIndex) => (
                  <Link
                    to={subLink.href}
                    key={subIndex}
                    className={`px-4 py-2 text-sm transition-all duration-300 hover:bg-[#1E304B] ${pathname === subLink.href ? activeClass : ""
                      }`}
                  >
                    {subLink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;