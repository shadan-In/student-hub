import { useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StudentModal from "./components/StudentModal";
import ViewStudentModal from "./components/ViewStudentModal";
import ConfirmDialog from "./components/ConfirmDialog";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";

import { deleteStudent } from "./redux/features/studentSlice";
import { useToast } from "./hooks/useToast";

const App = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  // Sidebar open/close (only matters on mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Which popup is open right now.
  // editStudent  -> null means "add mode", an object means "edit mode"
  // viewStudent  -> student shown in the read-only popup
  // deleteTarget -> student waiting for delete confirmation
  const [formOpen, setFormOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAdd = () => {
    setEditStudent(null);
    setFormOpen(true);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setFormOpen(true);
  };

  // Runs only after the user clicks "Delete student" in the confirm box.
  const handleConfirmDelete = () => {
    dispatch(deleteStudent(deleteTarget.id));
    toast(`${deleteTarget.name} removed`, "error");
    setDeleteTarget(null);
  };

  // Same three callbacks are needed by both pages, so we keep them here.
  const cardActions = {
    onView: setViewStudent,
    onEdit: handleEdit,
    onDelete: setDeleteTarget,
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            onAddClick={handleAdd}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard {...cardActions} />} />
              <Route
                path="/students"
                element={<Students onAdd={handleAdd} {...cardActions} />}
              />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </main>
        </div>
      </div>

      {/* All popups live at the bottom so they can cover the whole screen */}
      <StudentModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        editStudent={editStudent}
      />

      <ViewStudentModal
        isOpen={Boolean(viewStudent)}
        onClose={() => setViewStudent(null)}
        student={viewStudent}
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        studentName={deleteTarget?.name}
      />

      <Toast />
    </BrowserRouter>
  );
};

export default App;
