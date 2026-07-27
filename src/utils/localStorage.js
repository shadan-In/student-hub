// Small wrapper around localStorage so the slice file stays clean.
// Everything is wrapped in try/catch because localStorage can throw
// (private mode, storage full, corrupted JSON, etc).

import { students as dummyStudents } from "../data/students";

const STORAGE_KEY = "studenthub_students";

// Runs once when the app starts. If nothing is saved yet, we fall back
// to the dummy data so the dashboard is not empty on first load.
export const loadStudents = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return dummyStudents;
    return JSON.parse(saved);
  } catch (error) {
    console.log("Could not read students from localStorage:", error);
    return dummyStudents;
  }
};

// Called after every add / update / delete so data survives a refresh.
export const saveStudents = (students) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.log("Could not save students to localStorage:", error);
  }
};
