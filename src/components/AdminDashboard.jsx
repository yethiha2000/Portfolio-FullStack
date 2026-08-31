import { Archive, Check, LogOut, Mail, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminDashboard({ user, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const loadMessages = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/messages`, { credentials: "include" });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        onLogout();
        return;
      }
      if (!response.ok) throw new Error(data.message || "Unable to load messages.");

      setMessages(data.messages || []);
      setStatus("ready");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, [onLogout]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  async function updateStatus(id, nextStatus) {
    try {
      const response = await fetch(`${API_URL}/api/admin/messages/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (response.status === 401) return onLogout();
      if (!response.ok) throw new Error("Unable to update message.");
      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteMessage(id) {
    if (!window.confirm("Delete this message permanently?")) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/messages/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.status === 401) return onLogout();
      if (!response.ok) throw new Error("Unable to delete message.");
      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  }

  async function logout() {
    await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
    onLogout();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-10 text-slate-900 dark:bg-[#0B0F19] dark:text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[.2em] text-blue-600 dark:text-blue-400">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold">Messages</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Signed in as {user?.username}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadMessages} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"><RefreshCw size={16} /> Refresh</button>
            <button onClick={logout} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-400/20 dark:bg-white/5 dark:text-red-400 dark:hover:bg-red-400/10"><LogOut size={16} /> Logout</button>
          </div>
        </header>

        {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300">{error}</p>}

        {status === "loading" ? (
          <div className="py-16 text-center text-sm text-slate-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <Mail className="mx-auto text-slate-400" />
            <p className="mt-4 font-medium">No messages yet.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {messages.map((message) => (
              <article key={message._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{message.name}</h2>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${message.status === "unread" ? "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300" : message.status === "read" ? "bg-green-50 text-green-700 dark:bg-green-400/10 dark:text-green-300" : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400"}`}>{message.status}</span>
                    </div>
                    <a href={`mailto:${message.email}`} className="mt-1 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400">{message.email}</a>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(message.createdAt)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {message.status === "unread" && <button onClick={() => updateStatus(message._id, "read")} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs font-medium hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"><Check size={14} /> Mark read</button>}
                    {message.status !== "archived" && <button onClick={() => updateStatus(message._id, "archived")} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-3 text-xs font-medium hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"><Archive size={14} /> Archive</button>}
                    <button onClick={() => deleteMessage(message._id)} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-red-200 px-3 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-400/10"><Trash2 size={14} /> Delete</button>
                  </div>
                </div>
                <p className="mt-5 whitespace-pre-wrap border-t border-slate-100 pt-5 text-sm leading-7 text-slate-700 dark:border-white/5 dark:text-slate-300">{message.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
