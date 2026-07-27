import { FiMail, FiPhone, FiBookOpen, FiCalendar, FiUser } from "react-icons/fi";
import Modal from "./Modal";
import { formatDate, courseColor } from "../utils/helpers";

// Read-only popup that shows one student's full details.
const Row = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
    <span className="text-lg text-brand-600">{icon}</span>
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  </div>
);

const ViewStudentModal = ({ isOpen, onClose, student }) => {
  // student is null before anyone clicks the eye icon
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Student details">
      <div className="flex flex-col items-center text-center">
        <img
          src={student.avatar}
          alt={student.name}
          className="h-24 w-24 rounded-full border-4 border-brand-100 object-cover"
        />
        <h3 className="mt-3 text-xl font-bold text-slate-800">{student.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${courseColor(student.course)}`}>
            {student.course}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              student.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {student.status}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Row icon={<FiMail />} label="Email" value={student.email} />
        <Row icon={<FiPhone />} label="Phone" value={student.phone} />
        <Row icon={<FiUser />} label="Age" value={`${student.age} years`} />
        <Row icon={<FiBookOpen />} label="Course" value={student.course} />
        <Row
          icon={<FiCalendar />}
          label="Joined on"
          value={formatDate(student.createdAt)}
        />
        <Row icon={<FiUser />} label="Student ID" value={`#${student.id}`} />
      </div>
    </Modal>
  );
};

export default ViewStudentModal;
