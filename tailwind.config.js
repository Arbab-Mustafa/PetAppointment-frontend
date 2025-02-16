export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"], // ✅ Correct paths
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#FF9800",
        background: "#F3F4F6",
        textDark: "#1F2937",
        textLight: "#6B7280",
      },
    },
  },
  plugins: [],
};
