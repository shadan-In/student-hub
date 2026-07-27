import { createSlice } from "@reduxjs/toolkit";
import { loadStudents, saveStudents } from "../../utils/localStorage";

// The whole app state lives here:
// - list        -> every student we have
// - search      -> text typed in the search box
// - courseFilter/statusFilter -> "All" means no filter
// - sortBy      -> which sorting option is selected
const initialState = {
  list: loadStudents(),
  search: "",
  courseFilter: "All",
  statusFilter: "All",
  sortBy: "newest",
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    // ---------- CRUD ----------

    // payload = student object coming from the modal form (without id)
    addStudent: (state, action) => {
      const newStudent = {
        ...action.payload,
        id: Date.now(), // simple unique id, fine for a no-backend project
        createdAt: new Date().toISOString(),
      };
      // unshift so the newest student shows up first
      state.list.unshift(newStudent);
      saveStudents(state.list);
    },

    // payload = full student object including the id
    updateStudent: (state, action) => {
      const index = state.list.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        // keep the original createdAt, overwrite the rest
        state.list[index] = { ...state.list[index], ...action.payload };
        saveStudents(state.list);
      }
    },

    // payload = student id
    deleteStudent: (state, action) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
      saveStudents(state.list);
    },

    // payload = student id. Flips Active <-> Inactive.
    toggleStatus: (state, action) => {
      const student = state.list.find((s) => s.id === action.payload);
      if (student) {
        student.status = student.status === "Active" ? "Inactive" : "Active";
        saveStudents(state.list);
      }
    },

    // ---------- Filters / sorting ----------
    // These only change small values in state. The actual filtering
    // happens in the selector at the bottom of this file.

    searchStudent: (state, action) => {
      state.search = action.payload;
    },

    filterCourse: (state, action) => {
      state.courseFilter = action.payload;
    },

    filterStatus: (state, action) => {
      state.statusFilter = action.payload;
    },

    sortStudents: (state, action) => {
      state.sortBy = action.payload;
    },

    resetFilters: (state) => {
      state.search = "";
      state.courseFilter = "All";
      state.statusFilter = "All";
      state.sortBy = "newest";
    },
  },
});

export const {
  addStudent,
  updateStudent,
  deleteStudent,
  toggleStatus,
  searchStudent,
  filterCourse,
  filterStatus,
  sortStudents,
  resetFilters,
} = studentSlice.actions;

// ---------- Selectors ----------
// Small functions that read from the store. Keeping them here means
// components don't have to know the shape of the state.

export const selectAllStudents = (state) => state.students.list;
export const selectFilters = (state) => state.students;

// Search + filter + sort, all in one place.
// We copy the array with [...] before sorting because sort() mutates.
export const selectVisibleStudents = (state) => {
  const { list, search, courseFilter, statusFilter, sortBy } = state.students;

  let result = list.filter((student) => {
    const text = search.toLowerCase().trim();
    const matchesSearch =
      student.name.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text);

    const matchesCourse =
      courseFilter === "All" || student.course === courseFilter;

    const matchesStatus =
      statusFilter === "All" || student.status === statusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  result = [...result].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "age-asc") return a.age - b.age;
    if (sortBy === "age-desc") return b.age - a.age;
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    // default: newest first
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return result;
};

// Numbers shown on the statistics cards.
export const selectStats = (state) => {
  const list = state.students.list;
  const active = list.filter((s) => s.status === "Active").length;
  const courses = new Set(list.map((s) => s.course));
  const totalAge = list.reduce((sum, s) => sum + Number(s.age), 0);

  return {
    total: list.length,
    active,
    inactive: list.length - active,
    courses: courses.size,
    avgAge: list.length ? Math.round(totalAge / list.length) : 0,
  };
};

export default studentSlice.reducer;
