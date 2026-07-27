import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from "react-icons/fi";
import { hideToast, selectToasts } from "../redux/features/toastSlice";

const styles = {
  success: { bar: "bg-green-500", icon: <FiCheckCircle className="text-green-500" /> },
  info: { bar: "bg-brand-500", icon: <FiInfo className="text-brand-500" /> },
  error: { bar: "bg-red-500", icon: <FiAlertCircle className="text-red-500" /> },
};

// One toast. It removes itself after 3 seconds.
const ToastItem = ({ toast }) => {
  const dispatch = useDispatch();
  const style = styles[toast.type] || styles.success;

  useEffect(() => {
    const timer = setTimeout(() => dispatch(hideToast(toast.id)), 3000);
    // clearTimeout so we don't dispatch after the toast is already gone
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  return (
    <div className="flex w-72 items-center gap-3 overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-lg animate-slideIn">
      <span className={`h-10 w-1 rounded-full ${style.bar}`} />
      <span className="text-xl">{style.icon}</span>
      <p className="flex-1 text-sm text-slate-700">{toast.message}</p>
      <button
        onClick={() => dispatch(hideToast(toast.id))}
        className="text-slate-400 hover:text-slate-600"
        aria-label="Close notification"
      >
        <FiX />
      </button>
    </div>
  );
};

// Container is rendered once in App.jsx.
const Toast = () => {
  const toasts = useSelector(selectToasts);

  return (
    <div className="fixed bottom-5 right-5 z-[60] space-y-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toast;
