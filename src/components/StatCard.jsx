// Statistics card used at the top of the Dashboard.
// It is a "dumb" component - it only shows what it receives as props.

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        {/* color comes from the parent, e.g. "bg-brand-100 text-brand-600" */}
        <div className={`rounded-xl p-3 text-2xl ${color}`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
