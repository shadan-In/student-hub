import { useDispatch } from "react-redux";
import { FiPlus } from "react-icons/fi";
import FilterBar from "../components/FilterBar";
import StudentCard from "../components/StudentCard";
import EmptyState from "../components/EmptyState";
import { useStudents } from "../hooks/useStudents";
import { resetFilters } from "../redux/features/studentSlice";

const Students = ({ onAdd, onView, onEdit, onDelete }) => {
  const dispatch = useDispatch();

  // `students` is already searched + filtered + sorted by the selector.
  const { students, stats } = useStudents();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">All Students</h1>
          <p className="text-sm text-slate-500">
            Showing {students.length} of {stats.total} students
          </p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 active:scale-95"
        >
          <FiPlus className="text-lg" />
          Add Student
        </button>
      </div>

      <FilterBar />

      {students.length === 0 ? (
        <EmptyState
          title="No students found"
          message="Nothing matches the current search or filters. Try clearing them."
          action={
            <button
              onClick={() => dispatch(resetFilters())}
              className="mt-4 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
