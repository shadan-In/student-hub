import { useDispatch } from "react-redux";
import { showToast } from "../redux/features/toastSlice";

// Usage:  const toast = useToast();  toast("Student added");
export const useToast = () => {
  const dispatch = useDispatch();

  return (message, type = "success") => {
    dispatch(showToast(message, type));
  };
};
