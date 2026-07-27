import { useSelector } from "react-redux";
import {
  selectVisibleStudents,
  selectStats,
  selectFilters,
} from "../redux/features/studentSlice";

// Small custom hook so pages don't have to import three selectors each time.
// It just reads from the store, nothing more.
export const useStudents = () => {
  const students = useSelector(selectVisibleStudents);
  const stats = useSelector(selectStats);
  const { search, courseFilter, statusFilter, sortBy } =
    useSelector(selectFilters);

  return { students, stats, search, courseFilter, statusFilter, sortBy };
};
