import { useEffect } from "react";
import { FiX } from "react-icons/fi";

// A reusable popup box. The Add/Edit form, the View box and the
// Delete confirmation all render inside this same shell.
const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
  // Close the modal when the user presses Escape.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);

    // cleanup, otherwise we keep adding listeners on every open
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Clicking the dark area closes the modal */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-xl animate-popUp ${maxWidth}`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
