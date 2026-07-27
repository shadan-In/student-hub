// Tiny helper functions used by more than one component.

// "2024-06-11T12:25:00.000Z"  ->  "11 Jun 2024"
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// "Aarav Sharma" -> "AS" (used when the avatar image fails to load)
export const getInitials = (name) => {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

// Different badge colour for each course chip.
export const courseColor = (course) => {
  const colors = {
    React: "bg-sky-100 text-sky-700",
    JavaScript: "bg-amber-100 text-amber-700",
    Python: "bg-emerald-100 text-emerald-700",
    Java: "bg-orange-100 text-orange-700",
    "UI/UX Design": "bg-purple-100 text-purple-700",
    "Data Science": "bg-rose-100 text-rose-700",
  };
  return colors[course] || "bg-slate-100 text-slate-700";
};

// Very basic email check. Good enough for a form like this.
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Phone must be exactly 10 digits.
export const isValidPhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};
