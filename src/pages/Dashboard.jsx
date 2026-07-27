import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiBookOpen,
  FiArrowRight,
} from "react-icons/fi";
import StatCard from "../components/StatCard";
import StudentCard from "../components/StudentCard";
import { selectStats, selectAllStudents } from "../redux/features/studentSlice";
import { COURSES } from "../data/students";

const Dashboard = ({ onView, onEdit, onDelete }) => {
  const stats = useSelector(selectStats);
  const allStudents = useSelector(selectAllStudents);

  // Show only the 6 most recent students on the dashboard.
  // slice() copies the array first so we never sort the store data.
  const recent = [...allStudents]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  // How many students per course - used for the small bar chart.
  const courseCount = COURSES.map((course) => ({
    course,
    count: allStudents.filter((s) => s.course === course).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of all students in the institute
        </p>
      </div>

      {/* Statistics cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats.total}
          icon={<FiUsers />}
          color="bg-brand-100 text-brand-600"
        />
        <StatCard
          title="Active"
          value={stats.active}
          icon={<FiUserCheck />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Inactive"
          value={stats.inactive}
          icon={<FiUserX />}
          color="bg-slate-100 text-slate-600"
        />
        <StatCard
          title="Courses Running"
          value={stats.courses}
          icon={<FiBookOpen />}
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Simple bar chart made with plain divs - no chart library needed */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-slate-800">Students per course</h2>
        <div className="mt-4 space-y-3">
          {courseCount.map((item) => (
            <div key={item.course} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm text-slate-600">
                {item.course}
              </span>
              <div className="h-2.5 flex-1 rounded-full bg-slate-100">
                <div
                  className="h-2.5 rounded-full bg-brand-500 transition-all duration-500"
                  style={{
                    // width as a % of the total, guard against divide by zero
                    width: stats.total
                      ? `${(item.count / stats.total) * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <span className="w-6 text-right text-sm font-medium text-slate-700">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recently added students */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Recently added</h2>
          <Link
            to="/students"
            className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            View all <FiArrowRight />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recent.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
