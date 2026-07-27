import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";

// Confirmation popup shown before deleting a student.
const ConfirmDialog = ({ isOpen, onClose, onConfirm, studentName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete student" maxWidth="max-w-md">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
          <FiAlertTriangle />
        </div>
        <div>
          <p className="text-slate-700">
            Delete <span className="font-semibold">{studentName}</span> from the
            student list?
          </p>
          <p className="mt-1 text-sm text-slate-500">
            This cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Keep student
        </button>
        <button
          onClick={onConfirm}
          className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
        >
          Delete student
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
