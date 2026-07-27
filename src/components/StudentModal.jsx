import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { addStudent, updateStudent } from "../redux/features/studentSlice";
import { useToast } from "../hooks/useToast";
import { isValidEmail, isValidPhone } from "../utils/helpers";
import { COURSES, STATUS_OPTIONS } from "../data/students";

// Empty form used when adding a new student.
const emptyForm = {
  name: "",
  email: "",
  course: "React",
  age: "",
  status: "Active",
  phone: "",
  avatar: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

// The SAME modal is used for Add and Edit.
// If `editStudent` is passed we are editing, otherwise we are adding.
const StudentModal = ({ isOpen, onClose, editStudent }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Whenever the modal opens, fill the form with the student we are
  // editing (or reset it for a fresh add).
  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editStudent, isOpen]);

  // One handler for every input - works because each input has a `name`.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Simple validation. Returns true if the form is fine.
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(form.email)) newErrors.email = "Enter a valid email";

    if (!form.phone) newErrors.phone = "Phone is required";
    else if (!isValidPhone(form.phone)) newErrors.phone = "Phone must be 10 digits";

    if (!form.age) newErrors.age = "Age is required";
    else if (form.age < 15 || form.age > 60) newErrors.age = "Age must be 15-60";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const data = {
      ...form,
      age: Number(form.age),
      // If no avatar link is given, generate one from the name.
      avatar:
        form.avatar.trim() ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          form.name
        )}&background=2563eb&color=fff`,
    };

    if (editStudent) {
      dispatch(updateStudent(data));
      toast("Student details updated");
    } else {
      dispatch(addStudent(data));
      toast("Student added");
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editStudent ? "Edit student" : "Add student"}
    >
      {/* Note: no <form> tag, we just use a button + onClick. */}
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Aarav Sharma"
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@gmail.com"
            className={inputClass}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Two inputs side by side on tablet and up */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10 digit number"
              className={inputClass}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="21"
              className={inputClass}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-600">{errors.age}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Course
            </label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className={inputClass}
            >
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Avatar URL <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 active:scale-95"
        >
          {editStudent ? "Save changes" : "Add student"}
        </button>
      </div>
    </Modal>
  );
};

export default StudentModal;
