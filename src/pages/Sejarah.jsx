import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sejarahService } from "../services/sejarahService";
import LogoJabuBolon from "../assets/logojabubolon.png";

function Sejarah({ language, setLanguage }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

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

  const text = {
    ID: {
      judul: "Budaya",
      judulSpan: "Batak",
      title: "Sejarah Batak",
      intro:
        "Sejarah Batak adalah perjalanan panjang yang penuh dengan legenda, perjuangan, dan warisan budaya yang mendalam. Dari asal-usul mitologi hingga perlawanan heroik melawan penjajahan, suku Batak telah meninggalkan jejak yang kuat dalam sejarah Nusantara.",
      beranda: "Beranda",
      sejarah: "Sejarah",
      budaya: "Budaya",
      tradisi: "Tradisi",
      kuliner: "Kuliner",
      destinasi: "Destinasi",
      teknologi: "Teknologi",
      teknologiPerkembangan: "Perkembangan Teknologi",
      potensiModern: "Potensi Modern",
      peta: "Peta",
      bacaSelengkapnya: "Baca Selengkapnya",
    },

    EN: {
      judul: "Batak",
      judulSpan: "Culture",
      title: "Batak History",
      intro:
        "The history of the Batak people is a long journey filled with legends, struggles, and deep cultural heritage. From mythological origins to heroic resistance against colonization, the Batak ethnic group has left a strong mark in the history of the archipelago.",
      beranda: "Home",
      sejarah: "History",
      budaya: "Culture",
      tradisi: "Traditions",
      kuliner: "Culinary",
      destinasi: "Destination",
      teknologi: "Technology",
      teknologiPerkembangan: "Technological Development",
      potensiModern: "Modern Potential",
      peta: "Map",
      bacaSelengkapnya: "Read More",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white">
      {/* Navbar */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={LogoJabuBolon}
              alt="Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-cyan-300 shadow-lg"
            />
            <h1 className="text-xl md:text-2xl font-bold">
              {text[language].judul}
              <span className="text-cyan-300">{text[language].judulSpan}</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-medium">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-cyan-300 transition bg-none border-none p-0 text-white cursor-pointer"
                >
                  {text[language].beranda}
                </button>
              </li>

              <li>
                <a href="#sejarah" className="hover:text-cyan-300 transition">
                  {text[language].sejarah}
                </a>
              </li>

              <li>
                <a href="#budaya" className="hover:text-cyan-300 transition">
                  {text[language].budaya}
                </a>
              </li>

              <li>
                <a href="#tradisi" className="hover:text-cyan-300 transition">
                  {text[language].tradisi}
                </a>
              </li>

              <li>
                <a href="#kuliner" className="hover:text-cyan-300 transition">
                  {text[language].kuliner}
                </a>
              </li>

              <li>
                <a href="#destinasi" className="hover:text-cyan-300 transition">
                  {text[language].destinasi}
                </a>
              </li>

              <li className="relative">
                <button
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                  className="hover:text-cyan-300 transition flex items-center gap-1"
                >
                  {text[language].teknologi}
                  <span
                    className={`text-sm transition-transform ${
                      submenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {submenuOpen && (
                  <ul className="absolute left-0 mt-2 w-48 bg-cyan-950/95 backdrop-blur-md rounded-lg shadow-lg z-50">
                    <li>
                      <a
                        href="#perkembangan-teknologi"
                        onClick={() => setSubmenuOpen(false)}
                        className="block px-4 py-3 hover:bg-cyan-300 hover:text-cyan-950 transition"
                      >
                        {text[language].teknologiPerkembangan}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#potensi-modern"
                        onClick={() => setSubmenuOpen(false)}
                        className="block px-4 py-3 hover:bg-cyan-300 hover:text-cyan-950 transition"
                      >
                        {text[language].potensiModern}
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <a href="#peta" className="hover:text-cyan-300 transition">
                  {text[language].peta}
                </a>
              </li>
            </ul>

            {/* Language Toggle */}
            <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-cyan-300">
              <button
                onClick={() => setLanguage("ID")}
                className={`px-4 py-1 text-sm font-semibold transition ${
                  language === "ID" ? "bg-cyan-300 text-cyan-950" : "text-white"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-4 py-1 text-sm font-semibold transition ${
                  language === "EN" ? "bg-cyan-300 text-cyan-950" : "text-white"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-screen w-[270px] bg-cyan-950/95 backdrop-blur-md z-50 p-8 animate-slideLeft overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-cyan-300">
              <button
                onClick={() => setLanguage("ID")}
                className={`px-4 py-1 text-sm font-semibold transition ${
                  language === "ID" ? "bg-cyan-300 text-cyan-950" : "text-white"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-4 py-1 text-sm font-semibold transition ${
                  language === "EN" ? "bg-cyan-300 text-cyan-950" : "text-white"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl text-white"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col gap-8 text-lg font-medium text-white">
            <li>
              <button
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="cursor-pointer bg-none border-none p-0 text-left w-full hover:text-cyan-300 transition"
              >
                {text[language].beranda}
              </button>
            </li>

            <li>
              <a
                href="#sejarah"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {text[language].sejarah}
              </a>
            </li>

            <li>
              <a
                href="#budaya"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {text[language].budaya}
              </a>
            </li>

            <li>
              <a
                href="#tradisi"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {text[language].tradisi}
              </a>
            </li>

            <li>
              <a
                href="#kuliner"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {text[language].kuliner}
              </a>
            </li>

            <li>
              <a
                href="#destinasi"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {text[language].destinasi}
              </a>
            </li>

            <li>
              <button
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className="flex items-center gap-2 w-full hover:text-cyan-300 transition"
              >
                {text[language].teknologi}
                <span
                  className={`text-sm transition-transform ${
                    submenuOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {submenuOpen && (
                <ul className="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-cyan-300 pl-4">
                  <li>
                    <a
                      href="#perkembangan-teknologi"
                      onClick={() => {
                        setMenuOpen(false);
                        setSubmenuOpen(false);
                      }}
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].teknologiPerkembangan}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#potensi-modern"
                      onClick={() => {
                        setMenuOpen(false);
                        setSubmenuOpen(false);
                      }}
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].potensiModern}
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="#peta"
                onClick={() => setMenuOpen(false)}
                className="hover:text-cyan-300 transition"
              >
                {text[language].peta}
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-24 pb-20">
        {/* Header Section - Centered */}
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            {text[language].title}
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            {text[language].intro}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded-lg mb-6">
              ❌ {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <p className="text-2xl text-gray-300">Loading...</p>
            </div>
          )}

          {/* Cards */}
          {!loading && cards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => navigate(`/sejarah/${card.file_name}`)}
                  className="group bg-gradient-to-br from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-xl overflow-hidden border border-cyan-300/30 hover:border-cyan-300 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {card.image_url ? (
                      <img
                        src={card.image_url}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-cyan-900/30 flex items-center justify-center">
                        <span className="text-gray-400">📸 No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-cyan-300 mb-2 group-hover:text-cyan-200 transition">
                      {language === "ID" ? card.title : card.title_en}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">
                      {language === "ID"
                        ? card.short_description
                        : card.short_description_en}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-cyan-300 font-semibold group-hover:translate-x-2 transition">
                      <span className="text-sm">
                        {text[language].bacaSelengkapnya}
                      </span>
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && cards.length === 0 && (
            <div className="bg-cyan-900/30 border border-cyan-300/50 rounded-xl p-12 text-center">
              <p className="text-2xl text-gray-300 mb-4">
                {language === "ID"
                  ? "Belum ada data sejarah"
                  : "No history data available"}
              </p>
              <p className="text-gray-400">
                {language === "ID"
                  ? "Data akan ditampilkan di sini"
                  : "Data will be displayed here"}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(270px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideLeft {
          animation: slideLeft 0.3s ease-out forwards;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Sejarah;
