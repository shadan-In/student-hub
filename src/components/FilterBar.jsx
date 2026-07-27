import { useDispatch } from "react-redux";
import { FiRotateCcw, FiFilter } from "react-icons/fi";
import {
  filterCourse,
  filterStatus,
  sortStudents,
  resetFilters,
} from "../redux/features/studentSlice";
import { useStudents } from "../hooks/useStudents";
import { COURSES, STATUS_OPTIONS } from "../data/students";

const selectClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

const FilterBar = () => {
  const dispatch = useDispatch();
  const { courseFilter, statusFilter, sortBy, search } = useStudents();

  // Used to show the "Reset" button only when something is actually filtered.
  const isFiltered =
    search !== "" ||
    courseFilter !== "All" ||
    statusFilter !== "All" ||
    sortBy !== "newest";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <FiFilter className="text-brand-600" />
        Filters
      </span>

      {/* Filter by course */}
      <select
        value={courseFilter}
        onChange={(e) => dispatch(filterCourse(e.target.value))}
        className={selectClass}
      >
        <option value="All">All Courses</option>
        {COURSES.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>

      {/* Filter by status */}
      <select
        value={statusFilter}
        onChange={(e) => dispatch(filterStatus(e.target.value))}
        className={selectClass}
      >
        <option value="All">All Status</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        value={sortBy}
        onChange={(e) => dispatch(sortStudents(e.target.value))}
        className={selectClass}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="name-asc">Name (A - Z)</option>
        <option value="name-desc">Name (Z - A)</option>
        <option value="age-asc">Age (Low - High)</option>
        <option value="age-desc">Age (High - Low)</option>
      </select>

      {isFiltered && (
        <button
          onClick={() => dispatch(resetFilters())}
          className="ml-auto flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-brand-600"
        >
          <FiRotateCcw />
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterBar;
