import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import LogoJabuBolon from "../assets/logojabubolon.png";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await authService.login(email, password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.error || "Login gagal!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 flex items-center justify-center p-5 pt-24">
      <div className="w-full max-w-md bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-300/30 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={LogoJabuBolon}
            alt="Logo"
            className="w-20 h-20 rounded-full object-cover border-2 border-cyan-300 shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black text-white text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-cyan-300 text-center mb-8">Budaya Batak</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-6">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@budayabatak.id"
              className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/50 transition"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-cyan-300 font-semibold mb-2">
              🔐 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/50 transition"
              required
            />
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-cyan-900/30 border border-cyan-300/50 rounded-lg p-4 mt-6">
            <p className="text-cyan-200 text-sm font-semibold mb-2">📝 Demo:</p>
            <p className="text-gray-300 text-xs">Email: admin@budayabatak.id</p>
            <p className="text-gray-300 text-xs">
              Password: budayabatakidkompetisi
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-400 text-cyan-950 font-bold py-3 rounded-lg transition duration-300 transform hover:scale-105 disabled:scale-100 mt-8"
          >
            {loading ? "🔄 Loading..." : "🔓 Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-cyan-300 hover:text-cyan-200 text-sm font-semibold transition"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        div {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;
