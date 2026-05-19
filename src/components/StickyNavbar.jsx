import { useState, useEffect } from "react";
import LogoJabuBolon from "../assets/logojabubolon.png";

function StickyNavbar({ language, setLanguage }) {
  const [isSticky, setIsSticky] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const text = {
    ID: {
      judul: "Budaya",
      judulSpan: "Batak",
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
    },
    EN: {
      judul: "Batak",
      judulSpan: "Culture",
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
    },
  };

  return (
    <>
      {isSticky && (
        <nav className="fixed top-0 left-0 right-0 bg-cyan-950/95 backdrop-blur-md border-b border-cyan-300/30 z-40 shadow-lg animate-slideDown">
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={LogoJabuBolon}
                  alt="Logo"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-cyan-300 shadow-lg"
                />
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  {text[language].judul}
                  <span className="text-cyan-300">
                    {text[language].judulSpan}
                  </span>
                </h1>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <ul className="flex items-center gap-8 font-medium text-white">
                  <li>
                    <a
                      href="#beranda"
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].beranda}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#sejarah"
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].sejarah}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#budaya"
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].budaya}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tradisi"
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].tradisi}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#kuliner"
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].kuliner}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#destinasi"
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].destinasi}
                    </a>
                  </li>
                  <li className="relative">
                    <button
                      onClick={() => setSubmenuOpen(!submenuOpen)}
                      className="hover:text-cyan-300 transition flex items-center gap-1 bg-none border-none p-0"
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

                <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-cyan-300 backdrop-blur-md">
                  <button
                    onClick={() => setLanguage("ID")}
                    className={`px-4 py-1 text-sm font-semibold transition ${
                      language === "ID"
                        ? "bg-cyan-300 text-cyan-950"
                        : "text-white"
                    }`}
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLanguage("EN")}
                    className={`px-4 py-1 text-sm font-semibold transition ${
                      language === "EN"
                        ? "bg-cyan-300 text-cyan-950"
                        : "text-white"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-3xl text-white bg-none border-none p-0 cursor-pointer"
              >
                ☰
              </button>
            </div>

            {menuOpen && (
              <div className="fixed top-0 right-0 h-screen w-[270px] bg-cyan-950/95 backdrop-blur-md z-50 p-8 shadow-2xl overflow-y-auto">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-cyan-300">
                    <button
                      onClick={() => setLanguage("ID")}
                      className={`px-4 py-1 text-sm font-semibold transition ${
                        language === "ID"
                          ? "bg-cyan-300 text-cyan-950"
                          : "text-white"
                      }`}
                    >
                      ID
                    </button>
                    <button
                      onClick={() => setLanguage("EN")}
                      className={`px-4 py-1 text-sm font-semibold transition ${
                        language === "EN"
                          ? "bg-cyan-300 text-cyan-950"
                          : "text-white"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl text-white bg-none border-none p-0 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <ul className="flex flex-col gap-8 text-lg font-medium text-white">
                  <li>
                    <a
                      href="#beranda"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-cyan-300 transition"
                    >
                      {text[language].beranda}
                    </a>
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
                      className="flex items-center gap-2 w-full hover:text-cyan-300 transition bg-none border-none p-0"
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
          </div>
        </nav>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default StickyNavbar;
