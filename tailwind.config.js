export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-br":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
