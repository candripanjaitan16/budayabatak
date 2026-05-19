import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sejarahService } from "../services/sejarahService";

function SejarahDetail({ language }) {
  const { fileName } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCard();
  }, [fileName]);

  const fetchCard = async () => {
    setLoading(true);
    const result = await sejarahService.getAll();
    if (result.success) {
      const foundCard = result.data.find((c) => c.file_name === fileName);
      if (foundCard) {
        setCard(foundCard);
        setBlocks(foundCard.content_blocks || []);
      } else {
        setError("Data tidak ditemukan");
      }
    } else {
      setError("Gagal mengambil data");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white pt-24 flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="bg-red-500/20 border border-red-400 text-red-300 px-6 py-4 rounded-lg mb-6">
            ❌ {error || "Data tidak ditemukan"}
          </div>
          <button
            onClick={() => navigate("/sejarah")}
            className="bg-cyan-300 hover:bg-cyan-200 text-cyan-950 font-bold px-6 py-3 rounded-lg transition"
          >
            ← Kembali ke Sejarah
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        {/* Header with Image */}
        <div className="mb-12">
          {/* Back Button */}
          <button
            onClick={() => navigate("/sejarah")}
            className="mb-6 bg-cyan-300 hover:bg-cyan-200 text-cyan-950 font-bold px-6 py-2 rounded-lg transition"
          >
            ← Kembali
          </button>

          {/* Hero Image */}
          {card.image_url && (
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8 border border-cyan-300/30 shadow-2xl">
              <img
                src={card.image_url}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            {language === "ID" ? card.title : card.title_en}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {language === "ID"
              ? card.short_description
              : card.short_description_en}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-md rounded-2xl p-8 border border-cyan-300/30 mb-12">
          {/* Description */}
          {(language === "ID"
            ? card.full_description
            : card.full_description_en) && (
            <div className="mb-8 pb-8 border-b border-cyan-300/50">
              <p className="text-lg text-gray-200 leading-relaxed">
                {language === "ID"
                  ? card.full_description
                  : card.full_description_en}
              </p>
            </div>
          )}

          {/* Content Blocks */}
          {blocks && blocks.length > 0 && (
            <div className="space-y-8">
              {blocks.map((block, idx) => (
                <div key={block.id || idx}>
                  {/* Heading Block */}
                  {block.type === "heading" && (
                    <div className="mb-6">
                      <h2 className="text-4xl font-black text-cyan-300 mb-2">
                        {language === "ID" ? block.text : block.text_en}
                      </h2>
                      <div className="h-1 w-20 bg-cyan-300 rounded" />
                    </div>
                  )}

                  {/* Paragraph Block */}
                  {block.type === "paragraph" && (
                    <p className="text-lg text-gray-200 leading-relaxed mb-6">
                      {language === "ID" ? block.text : block.text_en}
                    </p>
                  )}

                  {/* Image Block */}
                  {block.type === "image" && (
                    <div className="my-8">
                      <img
                        src={block.image_url}
                        alt={`Content ${idx}`}
                        className="w-full rounded-xl border border-cyan-300/30 shadow-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No Blocks Message */}
          {(!blocks || blocks.length === 0) && (
            <p className="text-gray-400 italic">
              {language === "ID"
                ? "Belum ada konten tambahan"
                : "No additional content"}
            </p>
          )}
        </div>

        {/* Back to List */}
        <button
          onClick={() => navigate("/sejarah")}
          className="w-full bg-cyan-300 hover:bg-cyan-200 text-cyan-950 font-bold px-6 py-4 rounded-lg transition text-lg"
        >
          ← Kembali ke Daftar Sejarah
        </button>
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

export default SejarahDetail;
