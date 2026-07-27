import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiBell, FiPlus } from "react-icons/fi";
import { searchStudent } from "../redux/features/studentSlice";
import { useStudents } from "../hooks/useStudents";

const Navbar = ({ onMenuClick, onAddClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useStudents();

  // Typing here updates Redux, and the Students page re-renders.
  // If the user is on another page we send them to /students so they
  // can actually see the results.
  const handleSearch = (e) => {
    dispatch(searchStudent(e.target.value));
    navigate("/students");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-6">
      {/* Hamburger - hidden on large screens */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Search box */}
      <div className="relative flex-1 max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 active:scale-95 md:px-4"
        >
          <FiPlus className="text-lg" />
          <span className="hidden sm:inline">Add Student</span>
        </button>

        <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
          <FiBell className="text-xl" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Fake logged-in user */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="Admin"
            className="h-9 w-9 rounded-full border-2 border-brand-100 object-cover"
          />
          <div className="hidden text-sm md:block">
            <p className="font-medium text-slate-800">Admin</p>
            <p className="text-xs text-slate-500">Coordinator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
