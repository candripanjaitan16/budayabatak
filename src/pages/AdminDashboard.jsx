import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import LogoJabuBolon from "../assets/logojabubolon.png";

function AdminDashboard({ language }) {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail");

  const categories = [
    { id: 1, name: "Sejarah", icon: "📜", route: "/admin/sejarah" },
    { id: 2, name: "Budaya", icon: "🎭", route: "/admin/budaya" },
    { id: 3, name: "Tradisi", icon: "🎪", route: "/admin/tradisi" },
    { id: 4, name: "Kuliner", icon: "🍜", route: "/admin/kuliner" },
    { id: 5, name: "Destinasi", icon: "🏞️", route: "/admin/destinasi" },
    { id: 6, name: "Teknologi", icon: "💻", route: "/admin/teknologi" },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <img
              src={LogoJabuBolon}
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-cyan-300"
            />
            <div>
              <h1 className="text-4xl font-black">Admin Dashboard</h1>
              <p className="text-cyan-300">👤 {adminEmail}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            🚪 Logout
          </button>
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Pilih Kategori:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(category.route)}
                className="group bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-300/30 hover:border-cyan-300 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 text-left"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-cyan-300 group-hover:text-cyan-200 transition">
                  {category.name}
                </h3>
                <p className="text-gray-300 mt-2">
                  Kelola data {category.name.toLowerCase()}
                </p>
                <div className="mt-4 text-cyan-300 group-hover:translate-x-2 transition">
                  → Kelola
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-16 bg-cyan-900/30 border border-cyan-300/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-cyan-300 mb-4">ℹ️ Informasi</h3>
          <ul className="space-y-2 text-gray-200">
            <li>✅ Klik kategori untuk mengelola data</li>
            <li>✅ Anda dapat membuat, mengubah, dan menghapus data</li>
            <li>✅ Semua perubahan akan langsung tersimpan di database</li>
            <li>✅ Logout ketika selesai untuk keamanan</li>
          </ul>
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

export default AdminDashboard;
