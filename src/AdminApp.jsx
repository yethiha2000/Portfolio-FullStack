import { useCallback, useEffect, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const logout = useCallback(() => setUser(null), []);

  useEffect(() => {
    let active = true;

    fetch(`${API_URL}/api/auth/me`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json();
      })
      .then((data) => {
        if (active && data?.success) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => { active = false; };
  }, []);

  if (checking) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-500 dark:bg-[#0B0F19] dark:text-slate-400">Loading admin...</main>;
  }

  if (!user) return <AdminLogin onAuthenticated={setUser} />;

  return <AdminDashboard user={user} onLogout={logout} />;
}
