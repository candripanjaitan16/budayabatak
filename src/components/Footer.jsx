import LogoJabuBolon from "../assets/logojabubolon.png";

function Footer({ language }) {
  const text = {
    ID: {
      title: "Budaya Batak",

      desc: "Jelajahi budaya Batak, tradisi, kuliner, dan keindahan Danau Toba melalui pengalaman digital interaktif.",

      links: [
        { name: "Beranda", href: "/" },
        { name: "Sejarah", href: "/sejarah" },
        { name: "Budaya", href: "/#budaya" },
        { name: "Tradisi", href: "/#tradisi" },
        { name: "Kuliner", href: "/#kuliner" },
        { name: "Destinasi", href: "/#destinasi" },
      ],

      copyright: "2026 Budaya Batak. Semua hak dilindungi.",
    },

    EN: {
      title: "Batak Culture",

      desc: "Explore Batak culture, traditions, culinary experiences, and the beauty of Lake Toba through an interactive digital experience.",

      links: [
        { name: "Home", href: "/" },
        { name: "History", href: "/sejarah" },
        { name: "Culture", href: "/#budaya" },
        { name: "Traditions", href: "/#tradisi" },
        { name: "Culinary", href: "/#kuliner" },
        { name: "Destinations", href: "/#destinasi" },
      ],

      copyright: "2026 Batak Culture. All rights reserved.",
    },
  };

  const data = text[language];

  return (
    <footer className="bg-cyan-950 text-white py-12 px-6 border-t border-cyan-800">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <img
          src={LogoJabuBolon}
          alt="Logo"
          className="w-20 h-20 rounded-full border-2 border-cyan-300 shadow-lg mb-4"
        />

        <h2 className="text-3xl font-bold mb-3">{data.title}</h2>

        <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-8">
          {data.desc}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {data.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-gray-300 hover:text-cyan-300 transition duration-300 text-sm md:text-base"
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="text-gray-500 text-sm">{data.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
