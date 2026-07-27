import { useState } from "react";
import { useDispatch } from "react-redux";
import { FiMail, FiPhone, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { toggleStatus } from "../redux/features/studentSlice";
import { useToast } from "../hooks/useToast";
import { courseColor, getInitials, formatDate } from "../utils/helpers";

const StudentCard = ({ student, onView, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  // If the avatar URL is broken we show the initials instead.
  const [imgError, setImgError] = useState(false);

  const handleToggle = () => {
    dispatch(toggleStatus(student.id));
    const newStatus = student.status === "Active" ? "Inactive" : "Active";
    toast(`${student.name} marked as ${newStatus}`, "info");
  };

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
      {/* Top row: avatar + name + status */}
      <div className="flex items-start gap-3">
        {imgError ? (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">
            {getInitials(student.name)}
          </div>
        ) : (
          <img
            src={student.avatar}
            alt={student.name}
            onError={() => setImgError(true)}
            className="h-14 w-14 shrink-0 rounded-full border-2 border-brand-100 object-cover"
          />
        )}

        <div className="min-w-0 flex-1">
          {/* truncate stops long names from breaking the layout */}
          <h3 className="truncate font-semibold text-slate-800">
            {student.name}
          </h3>
          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${courseColor(
              student.course
            )}`}
          >
            {student.course}
          </span>
        </div>

        {/* Clicking the badge toggles Active / Inactive */}
        <button
          onClick={handleToggle}
          title="Click to change status"
          className={`rounded-full px-3 py-1 text-xs font-medium transition hover:opacity-80 ${
            student.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          {student.status}
        </button>
      </div>

      {/* Contact details */}
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <FiMail className="shrink-0 text-brand-500" />
          <span className="truncate">{student.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <FiPhone className="shrink-0 text-brand-500" />
          {student.phone}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">
          {student.age} yrs &middot; Joined {formatDate(student.createdAt)}
        </span>

        {/* Action buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => onView(student)}
            title="View"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-600"
          >
            <FiEye />
          </button>
          <button
            onClick={() => onEdit(student)}
            title="Edit"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => onDelete(student)}
            title="Delete"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
