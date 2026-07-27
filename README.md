# StudentHub

A Student Management System built with React + Vite + Tailwind CSS + Redux Toolkit.
No backend - data is kept in Redux and saved to localStorage, so it survives a refresh.

## Run it

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

## Folder structure

```
src
├── components      reusable UI pieces (cards, modals, navbar, sidebar)
├── pages           one file per screen (Dashboard, Students, Courses)
├── redux
│   ├── features    studentSlice.js, toastSlice.js
│   └── store.js    configureStore
├── hooks           small custom hooks (useStudents, useToast)
├── utils           localStorage wrapper + helper functions
├── data            dummy students + course list
├── assets
├── App.jsx
└── main.jsx
```

## Features

- Dashboard with statistics cards and a per-course bar
- Add / Edit / View / Delete students (delete asks for confirmation first)
- Click a status badge to toggle Active / Inactive
- Search by name or email
- Filter by course and by status, sort by name / age / date
- Toast notifications
- Fully responsive, sidebar collapses on mobile
- Redux DevTools works out of the box

## How the state works

Everything lives in `studentSlice.js`:

- `list` holds the students
- `search`, `courseFilter`, `statusFilter`, `sortBy` hold the current filters
- `selectVisibleStudents` does the search + filter + sort in one place,
  so components never filter anything themselves
- every reducer that changes `list` calls `saveStudents()` to write to localStorage

To reset the data, clear the `studenthub_students` key from localStorage
(DevTools > Application > Local Storage) and refresh.
