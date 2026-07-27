import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiBookOpen,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";

// The links are kept in an array so adding a new page later
// is just one more object here.
const links = [
  { to: "/", label: "Dashboard", icon: <FiGrid /> },
  { to: "/students", label: "Students", icon: <FiUsers /> },
  { to: "/courses", label: "Courses", icon: <FiBookOpen /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Dark overlay, only on mobile when the sidebar is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed z-30 flex h-full w-64 flex-col bg-brand-900 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-2xl text-brand-200" />
            <h1 className="text-xl font-bold">
              Student<span className="text-brand-200">Hub</span>
            </h1>
          </div>
          {/* Close button only makes sense on mobile */}
          <button onClick={onClose} className="lg:hidden" aria-label="Close menu">
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Nav links. NavLink gives us an isActive flag for free. */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-600 text-white"
                    : "text-brand-100 hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom card - static, just for the look */}
        <div className="p-4">
          <div className="rounded-xl bg-white/10 p-4">
            <p className="text-sm font-semibold">Session 2024-25</p>
            <p className="mt-1 text-xs text-brand-200">
              Admissions open till 30 Sep
            </p>
          </div>
          <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-brand-100 transition-colors hover:bg-white/10">
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
