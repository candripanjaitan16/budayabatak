import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sejarahService } from "../services/sejarahService";

function AdminSejarah({ language }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    file_name: "",
    title: "",
    title_en: "",
    short_description: "",
    short_description_en: "",
    full_description: "",
    full_description_en: "",
    image_url: "",
    image_file: null,
    content_blocks: [],
  });

  // Fetch data
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoading(true);
    const result = await sejarahService.getAll();
    if (result.success) {
      setCards(result.data);
    } else {
      setError("Gagal mengambil data");
    }
    setLoading(false);
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image_file: file,
          image_url: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.file_name || !formData.title || !formData.title_en) {
      setError("File name, title ID, dan title EN wajib diisi!");
      return;
    }

    setLoading(true);

    const submitData = {
      file_name: formData.file_name,
      title: formData.title,
      title_en: formData.title_en,
      short_description: formData.short_description,
      short_description_en: formData.short_description_en,
      full_description: formData.full_description,
      full_description_en: formData.full_description_en,
      image_url: formData.image_url,
      content_blocks: formData.content_blocks,
    };

    let result;
    if (editingId) {
      result = await sejarahService.update(editingId, submitData);
    } else {
      result = await sejarahService.create(submitData);
    }

    if (result.success) {
      setSuccess(
        editingId ? "✅ Data berhasil diupdate!" : "✅ Data berhasil dibuat!",
      );
      setFormData({
        file_name: "",
        title: "",
        title_en: "",
        short_description: "",
        short_description_en: "",
        full_description: "",
        full_description_en: "",
        image_url: "",
        image_file: null,
        content_blocks: [],
      });
      setShowForm(false);
      setEditingId(null);
      fetchCards();
    } else {
      setError(result.error || "Gagal menyimpan data!");
    }

    setLoading(false);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus?")) return;

    setLoading(true);
    const result = await sejarahService.delete(id);

    if (result.success) {
      setSuccess("✅ Data berhasil dihapus!");
      fetchCards();
    } else {
      setError("Gagal menghapus data!");
    }

    setLoading(false);
  };

  // Handle edit basic info
  const handleEditBasicInfo = (card) => {
    setFormData({
      file_name: card.file_name,
      title: card.title,
      title_en: card.title_en,
      short_description: card.short_description,
      short_description_en: card.short_description_en,
      full_description: card.full_description,
      full_description_en: card.full_description_en,
      image_url: card.image_url,
      image_file: null,
      content_blocks: card.content_blocks || [],
    });
    setEditingId(card.id);
    setShowForm(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black">Admin Sejarah</h1>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-cyan-300 hover:bg-cyan-200 text-cyan-950 font-bold px-6 py-3 rounded-lg transition"
          >
            ← Kembali
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-400 text-green-300 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Create Button */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({
                file_name: "",
                title: "",
                title_en: "",
                short_description: "",
                short_description_en: "",
                full_description: "",
                full_description_en: "",
                image_url: "",
                image_file: null,
                content_blocks: [],
              });
            }}
            className="bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold px-6 py-3 rounded-lg transition mb-8"
          >
            ➕ Tambah Data Baru
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl p-8 border border-cyan-300/30 mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? "Edit Sejarah" : "Tambah Sejarah Baru"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  File Name *
                </label>
                <input
                  type="text"
                  name="file_name"
                  value={formData.file_name}
                  onChange={handleInputChange}
                  placeholder="asal_usul_batak"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                  required
                  disabled={editingId}
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Judul (Indonesia) *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Asal Usul Batak"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Title (English) *
                </label>
                <input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleInputChange}
                  placeholder="The Origins of Batak"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                  required
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Deskripsi Singkat (Indonesia)
                </label>
                <textarea
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi singkat..."
                  rows="2"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Short Description (English)
                </label>
                <textarea
                  name="short_description_en"
                  value={formData.short_description_en}
                  onChange={handleInputChange}
                  placeholder="Short description..."
                  rows="2"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Deskripsi Lengkap (Indonesia)
                </label>
                <textarea
                  name="full_description"
                  value={formData.full_description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi lengkap..."
                  rows="2"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  Full Description (English)
                </label>
                <textarea
                  name="full_description_en"
                  value={formData.full_description_en}
                  onChange={handleInputChange}
                  placeholder="Full description..."
                  rows="2"
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                />
              </div>

              <div>
                <label className="block text-cyan-300 font-semibold mb-2">
                  🖼️ Upload Gambar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-white/10 border border-cyan-300/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-300"
                />
                {formData.image_url && (
                  <div className="mt-4">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full max-w-xs h-32 object-cover rounded-lg border border-cyan-300/50"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-400 text-cyan-950 font-bold px-6 py-3 rounded-lg transition"
                >
                  {loading ? "Loading..." : editingId ? "Update" : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-lg transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Data Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Data Sejarah ({cards.length})
          </h2>

          {loading && !showForm ? (
            <p className="text-gray-300">Loading...</p>
          ) : cards.length === 0 ? (
            <p className="text-gray-300">Belum ada data. Buat data baru!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="group bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-xl overflow-hidden border border-cyan-300/30 hover:border-cyan-300 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 flex flex-col"
                >
                  {/* Image */}
                  <div
                    onClick={() => navigate(`/admin/sejarah/${card.id}`)}
                    className="relative h-48 overflow-hidden cursor-pointer"
                  >
                    {card.image_url ? (
                      <img
                        src={card.image_url}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-cyan-900/30 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      onClick={() => navigate(`/admin/sejarah/${card.id}`)}
                      className="text-xl font-bold text-cyan-300 mb-2 cursor-pointer hover:text-cyan-200"
                    >
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-1">
                      {card.title_en}
                    </p>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                      {truncateText(card.short_description, 80)}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => navigate(`/admin/sejarah/${card.id}`)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition text-sm"
                      >
                        ➕ Content
                      </button>
                      <button
                        onClick={() => handleEditBasicInfo(card)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition text-sm"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default AdminSejarah;
