import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Batak from "../assets/batak.png";
import LogoJabuBolon from "../assets/logojabubolon.png";

function Beranda({ language, setLanguage }) {
  const navigate = useNavigate();

  const textID =
    "Jelajahi Keindahan Budaya Batak. Temukan budaya Batak yang kaya, destinasi wisata terbaik, kuliner khas Sumatera Utara, dan pengalaman tak terlupakan di kawasan Danau Toba.";

  const textEN =
    "Explore the Beauty of Batak Culture. Discover rich Batak traditions, amazing destinations, North Sumatra culinary delights, and unforgettable experiences around Lake Toba.";

  const [displayedText, setDisplayedText] = useState("");
  const [step, setStep] = useState("typing");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fullText = language === "ID" ? textID : textEN;

  useEffect(() => {
    let timeout;

    if (step === "typing") {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setStep("waiting");
        }, 5000);
      }
    } else if (step === "waiting") {
      timeout = setTimeout(() => {
        setStep("deleting");
      }, 1000);
    } else if (step === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, 20);
      } else {
        setStep("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, step, fullText]);

  const text = {
    ID: {
      judul: "Budaya",
      judulSpan: "Batak",
      title1: "Jelajahi Keindahan",
      title2: "Budaya Toba",
      button: "Jelajahi Sekarang",
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
      title1: "Explore The Beauty of",
      title2: "Toba Culture",
      button: "Explore Now",
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
    <section
      id="beranda"
      className="min-h-screen bg-gradient-to-b from-cyan-950 via-blue-900 to-sky-700 text-white overflow-hidden relative"
    >
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in-visible {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .fade-in-text {
          animation: fadeInUp 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .fade-in-button {
          animation: fadeInUp 1s ease-out 0.6s forwards;
          opacity: 0;
        }

        .fade-in-image {
          animation: fadeInRight 1s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="absolute w-[400px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-6 relative z-10">
        <div
          className={`flex items-center justify-between ${isVisible ? "fade-in-visible" : ""}`}
        >
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

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 font-medium">
              <li>
                <a href="#beranda" className="hover:text-cyan-300 transition">
                  {text[language].beranda}
                </a>
              </li>

              <li>
                <button
                  onClick={() => navigate("/sejarah")}
                  className="hover:text-cyan-300 transition cursor-pointer bg-none border-none p-0"
                >
                  {text[language].sejarah}
                </button>
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
                    className={`text-sm transition-transform ${submenuOpen ? "rotate-180" : ""}`}
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

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="fixed top-0 right-0 h-screen w-[270px] bg-cyan-950/95 backdrop-blur-md z-50 p-8 animate-slideLeft shadow-2xl overflow-y-auto">
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
                className="text-3xl text-white"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-8 text-lg font-medium text-white">
              <li>
                <a href="#beranda" onClick={() => setMenuOpen(false)}>
                  {text[language].beranda}
                </a>
              </li>

              <li>
                <button
                  onClick={() => {
                    navigate("/sejarah");
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer bg-none border-none p-0 text-left w-full hover:text-cyan-300 transition"
                >
                  {text[language].sejarah}
                </button>
              </li>

              <li>
                <a href="#budaya" onClick={() => setMenuOpen(false)}>
                  {text[language].budaya}
                </a>
              </li>

              <li>
                <a href="#tradisi" onClick={() => setMenuOpen(false)}>
                  {text[language].tradisi}
                </a>
              </li>

              <li>
                <a href="#kuliner" onClick={() => setMenuOpen(false)}>
                  {text[language].kuliner}
                </a>
              </li>

              <li>
                <a href="#destinasi" onClick={() => setMenuOpen(false)}>
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
                    className={`text-sm transition-transform ${submenuOpen ? "rotate-180" : ""}`}
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
                <a href="#peta" onClick={() => setMenuOpen(false)}>
                  {text[language].peta}
                </a>
              </li>
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-2 items-center min-h-[88vh] gap-14">
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6 ${isVisible ? "fade-in-visible" : ""}`}
            >
              {text[language].title1}

              <span className="text-cyan-300 block">
                {text[language].title2}
              </span>
            </h1>

            <p
              className={`text-base md:text-lg text-gray-200 leading-relaxed mb-10 max-w-xl min-h-[140px] mx-auto md:mx-0 ${isVisible ? "fade-in-text" : ""}`}
            >
              {displayedText}
              <span className="animate-pulse text-cyan-300">|</span>
            </p>

            <div
              className={`flex flex-col sm:flex-row items-center gap-5 ${isVisible ? "fade-in-button" : ""}`}
            >
              <button
                onClick={() => navigate("/sejarah")}
                className="group bg-cyan-300 text-cyan-950 px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-white hover:scale-105 transition duration-300 flex items-center gap-3 cursor-pointer border-none"
              >
                <span>{text[language].button}</span>

                <span className="group-hover:translate-x-1 transition duration-300">
                  →
                </span>
              </button>
            </div>
          </div>

          <div
            className={`order-1 md:order-2 flex justify-center relative ${isVisible ? "fade-in-image" : ""}`}
          >
            <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-3xl" />

            <img
              src={Batak}
              alt="Budaya Batak"
              className="w-full max-w-[260px] sm:max-w-sm md:max-w-lg object-contain hover:scale-105 transition duration-500 relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            {language === "ID"
              ? "Jelajahi Keindahan Budaya Batak"
              : "Explore Batak Culture Beauty"}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {language === "ID"
              ? "Temukan berbagai aspek menarik dari kekayaan budaya Batak"
              : "Discover various interesting aspects of Batak cultural wealth"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => navigate("/sejarah")}
            className="group bg-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-cyan-300/30 hover:border-cyan-300/80 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer text-left w-full bg-none border-none"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-3">
              {language === "ID" ? "Sejarah Kaya" : "Rich History"}
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {language === "ID"
                ? "Temukan asal-usul dan perkembangan budaya Batak yang mendalam"
                : "Discover the origins and deep development of Batak culture"}
            </p>
            <div className="mt-6 flex items-center text-cyan-300 font-semibold group-hover:translate-x-2 transition">
              <span className="text-sm">
                {language === "ID" ? "Pelajari Lebih" : "Learn More"}
              </span>
              <span className="ml-2">→</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/tradisi")}
            className="group bg-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-cyan-300/30 hover:border-cyan-300/80 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer text-left w-full bg-none border-none"
          >
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-3">
              {language === "ID" ? "Tradisi Autentik" : "Authentic Traditions"}
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {language === "ID"
                ? "Upacara, adat-istiadat, dan nilai budaya yang masih dipegang teguh"
                : "Ceremonies, customs, and cultural values that are still upheld"}
            </p>
            <div className="mt-6 flex items-center text-cyan-300 font-semibold group-hover:translate-x-2 transition">
              <span className="text-sm">
                {language === "ID" ? "Pelajari Lebih" : "Learn More"}
              </span>
              <span className="ml-2">→</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/kuliner")}
            className="group bg-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-cyan-300/30 hover:border-cyan-300/80 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer text-left w-full bg-none border-none"
          >
            <div className="text-4xl mb-4">🍜</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-3">
              {language === "ID" ? "Kuliner Legendaris" : "Legendary Culinary"}
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {language === "ID"
                ? "Cita rasa autentik Sumatera Utara yang memanjakan lidah"
                : "Authentic flavors of North Sumatra that delight the palate"}
            </p>
            <div className="mt-6 flex items-center text-cyan-300 font-semibold group-hover:translate-x-2 transition">
              <span className="text-sm">
                {language === "ID" ? "Pelajari Lebih" : "Learn More"}
              </span>
              <span className="ml-2">→</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/destinasi")}
            className="group bg-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-xl p-8 border border-cyan-300/30 hover:border-cyan-300/80 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 cursor-pointer text-left w-full bg-none border-none"
          >
            <div className="text-4xl mb-4">🏞️</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-3">
              {language === "ID"
                ? "Destinasi Menakjubkan"
                : "Amazing Destinations"}
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              {language === "ID"
                ? "Jelajahi keindahan alam dan situs budaya di Danau Toba"
                : "Explore natural beauty and cultural sites around Lake Toba"}
            </p>
            <div className="mt-6 flex items-center text-cyan-300 font-semibold group-hover:translate-x-2 transition">
              <span className="text-sm">
                {language === "ID" ? "Pelajari Lebih" : "Learn More"}
              </span>
              <span className="ml-2">→</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Beranda;
