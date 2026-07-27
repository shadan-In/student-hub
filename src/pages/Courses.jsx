import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBookOpen, FiArrowRight } from "react-icons/fi";
import { selectAllStudents, filterCourse } from "../redux/features/studentSlice";
import { COURSES } from "../data/students";

// Shows one card per course with how many students are enrolled.
// Clicking a card sets the course filter and jumps to the Students page.
const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allStudents = useSelector(selectAllStudents);

  const openCourse = (course) => {
    dispatch(filterCourse(course));
    navigate("/students");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Courses</h1>
        <p className="text-sm text-slate-500">
          Click any course to see its students
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {COURSES.map((course) => {
          const enrolled = allStudents.filter((s) => s.course === course);
          const active = enrolled.filter((s) => s.status === "Active").length;

          return (
            <button
              key={course}
              onClick={() => openCourse(course)}
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-brand-100 p-3 text-2xl text-brand-600">
                  <FiBookOpen />
                </div>
                <FiArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-600" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">{course}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {enrolled.length} enrolled &middot; {active} active
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
