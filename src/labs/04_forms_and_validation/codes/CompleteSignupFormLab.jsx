import { useState } from "react";

/**
 * Author: raysi
 * Lecture 04 Lab: Controlled Forms & Client Validation
 * Backend Analogy: Form state = Java DTO. [e.target.name] = bean property reflection.
 */
export default function CompleteSignupFormLab() {
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents full HTTP page reload
    const errs = {};
    if (formData.username.trim().length < 3) errs.username = "Username must be ≥ 3 chars";
    if (!formData.email.includes("@")) errs.email = "Valid email is required";
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setSubmitted(formData);
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="p-4 bg-white border rounded-xl space-y-2.5">
        <h3 className="font-bold text-slate-800 text-sm">Developer Registration DTO</h3>
        <div>
          <label className="block text-[11px] font-semibold text-gray-600">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-1 text-xs rounded outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. raysi"
          />
          {errors.username && <p className="text-[10px] text-red-500">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-gray-600">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-1 text-xs rounded outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="dev@spring.io"
          />
          {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
        </div>
        <button type="submit" className="w-full py-1.5 bg-blue-600 text-white text-xs font-semibold rounded">
          Submit DTO
        </button>
      </form>
      {submitted && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs">
          <p className="font-bold text-emerald-800">✅ Dispatched Payload:</p>
          <pre className="text-[10px] font-mono text-emerald-900">{JSON.stringify(submitted)}</pre>
        </div>
      )}
    </div>
  );
}
