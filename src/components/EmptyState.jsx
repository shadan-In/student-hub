import { FiInbox } from "react-icons/fi";

// Shown when the filtered list has no students.
const EmptyState = ({ title, message, action }) => {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <FiInbox className="text-5xl text-slate-300" />
      <h3 className="mt-4 text-lg font-semibold text-slate-700">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;
