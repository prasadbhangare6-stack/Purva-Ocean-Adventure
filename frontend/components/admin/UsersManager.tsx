"use client";

import { useState, useEffect } from "react";
import { Users, Shield, Plus, X, Lock } from "lucide-react";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/auth/roles";

type UserEntry = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "invited";
  createdAt?: string;
  lastLoginAt?: string;
};

const DEFAULT_USERS: UserEntry[] = [
  {
    id: "usr-drpurva",
    name: "Dr. Purva",
    email: "purvaoceanadventures@gmail.com",
    role: "owner",
    status: "active",
  },
  {
    id: "usr-editor",
    name: "Content Editor",
    email: "editor@purvaoceanadventures.com",
    role: "editor",
    status: "active",
  },
];

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  owner: "Full control across all trips, certifications, gallery photos, settings, and team roles.",
  admin: "Manage trips, courses, photos, FAQs, Instagram reels, and customer inquiries.",
  editor: "Create and edit trips, courses, and gallery photos. Cannot delete or change website settings.",
  enquiry_manager: "Read and manage incoming trip bookings and contact form submissions.",
  viewer: "Read-only access to view published content, media library, and analytics.",
};

export function UsersManager() {
  const [users, setUsers] = useState<UserEntry[]>(DEFAULT_USERS);
  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("PurvaOcean@2025");
  const [newUserRole, setNewUserRole] = useState<Role>("editor");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load live users from API
  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      })
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_role", userId, role: newRole }),
      });

      const data = await res.json();
      if (data.success) {
        setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
        setFeedback(data.message || "Role updated successfully.");
      } else {
        setFeedback(data.message || "Failed to update role.");
      }
    } catch {
      setFeedback("Network error updating role.");
    }
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          name: newUserName,
          email: newUserEmail,
          role: newUserRole,
          defaultPassword: newUserPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUsers([...users, data.user]);
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPassword("PurvaOcean@2025");
        setIsAdding(false);
        setFeedback(data.message);
      } else {
        setFeedback(data.message || "Failed to add user.");
      }
    } catch {
      setFeedback("Error adding user.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove user "${name}"?`)) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", userId: id }),
      });

      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u.id !== id));
        setFeedback(data.message || "User removed.");
      } else {
        setFeedback(data.message || "Failed to remove user.");
      }
    } catch {
      setFeedback("Error deleting user.");
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">User & Permission Management</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Email & password accounts, team member access levels, and role permissions.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0a2346] hover:bg-[#123363] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {feedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 flex items-center justify-between">
          <span className="font-medium">{feedback}</span>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-700">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2">
            <Users className="size-4 text-[#1865db]" />
            <span>Authorized Team Members ({users.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Provider: Email & Password (PBKDF2)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0a2346] text-white text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Role & Access Level</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#0a2558] whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 font-mono whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      disabled={user.role === "owner"}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {ROLE_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-700">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role !== "owner" && (
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Team Member Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-lg font-serif font-bold text-[#0a2558]">Add Team Member</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Captain Ananya"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="name@purvaoceanadventures.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
                  Temporary Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    placeholder="Initial password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm font-mono text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">
                  Assigned Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as Role)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="admin">Admin — Full Content & Inquiry Control</option>
                  <option value="editor">Editor — Trips, Courses & Gallery Photos</option>
                  <option value="enquiry_manager">Enquiry Manager — Leads & Spreadsheets Only</option>
                  <option value="viewer">Viewer — Read Only</option>
                </select>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {ROLE_DESCRIPTIONS[newUserRole]}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-[#0a2346] hover:bg-[#123363] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors cursor-pointer"
                >
                  {isLoading ? "Adding..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permission Matrix */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0a2558] flex items-center gap-2">
          <Shield className="size-4 text-[#1865db]" />
          <span>Role Permissions Reference</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {ROLES.map((role) => (
            <div key={role} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0a2558] uppercase tracking-wider">{ROLE_LABELS[role]}</span>
                <span className="text-[0.65rem] text-[#1865db] font-mono font-bold uppercase">{role}</span>
              </div>
              <p className="mt-2 text-slate-600 leading-relaxed">{ROLE_DESCRIPTIONS[role]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
