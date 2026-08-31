import { LockKeyhole, LogIn } from "lucide-react";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminLogin({ onAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to sign in.");
      }

      onAuthenticated(data.user);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-16 text-slate-900 dark:bg-[#0B0F19] dark:text-slate-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/20 sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
          <LockKeyhole size={22} aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Admin Login</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Sign in to manage portfolio contact messages.</p>

        <label className="mt-7 block text-xs font-medium text-slate-700 dark:text-slate-300" htmlFor="admin-username">Username</label>
        <input id="admin-username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white" />

        <label className="mt-5 block text-xs font-medium text-slate-700 dark:text-slate-300" htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-slate-950 dark:text-white" />

        {error && <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button type="submit" disabled={status === "loading"} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          <LogIn size={17} aria-hidden="true" />
          {status === "loading" ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
