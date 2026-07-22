import { useStudents } from "../hooks/useStudents";
import { useClasses } from "../hooks/useClasses";

export default function Dashboard() {
  const { students } = useStudents();
  const { classes } = useClasses();

  const activeCount = students.filter((s) => s.status === "Active").length;
  const recentStudents = [...students].slice(-5).reverse();
  const recentClasses = [...classes].slice(-5).reverse();

  const cards = [
    { label: "Total Students", value: students.length, color: "bg-blue-500" },
    { label: "Total Classes", value: classes.length, color: "bg-purple-500" },
    { label: "Active Students", value: activeCount, color: "bg-green-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`${c.color} text-white p-6 rounded-xl shadow`}
          >
            <p className="text-sm opacity-90">{c.label}</p>
            <p className="text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3 dark:text-white">
            Recent Students
          </h2>
          {recentStudents.length === 0 ? (
            <p className="text-gray-400 text-sm">No students yet</p>
          ) : (
            recentStudents.map((s) => (
              <div
                key={s.id}
                className="flex justify-between py-2 border-b dark:border-gray-700 dark:text-gray-200"
              >
                <span>{s.name}</span>
                <span className="text-gray-400 text-sm">{s.className}</span>
              </div>
            ))
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3 dark:text-white">Recent Classes</h2>
          {recentClasses.length === 0 ? (
            <p className="text-gray-400 text-sm">No classes yet</p>
          ) : (
            recentClasses.map((c) => (
              <div
                key={c.id}
                className="flex justify-between py-2 border-b dark:border-gray-700 dark:text-gray-200"
              >
                <span>
                  {c.name} - {c.section}
                </span>
                <span className="text-gray-400 text-sm">{c.teacher}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
