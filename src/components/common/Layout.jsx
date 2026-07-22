import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export default function Layout() {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
          <Link to="/dashboard" className="font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </Link>
          <Link to="/students" className="text-gray-600 dark:text-gray-300">
            Students
          </Link>
          <Link to="/classes" className="text-gray-600 dark:text-gray-300">
            Classes
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded-full border dark:border-gray-600 dark:text-white"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}