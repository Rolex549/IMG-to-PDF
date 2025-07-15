// App.js
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.style.transition = "background-color 0.6s ease";
    document.body.style.backgroundColor = theme === "dark" ? "#0F0F0F" : "#FAFAFA";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const backgroundColor = theme === "dark" ? "#0F0F0F" : "#FAFAFA";
  const textColor = theme === "dark" ? "#FAFAFA" : "#1A1A1A";
  const buttonColor = theme === "dark" ? "#1F1F1F" : "#E0E0E0";
  const borderColor = theme === "dark" ? "#333" : "#ccc";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          minHeight: "100vh",
          backgroundColor,
          color: textColor,
          transition: "background-color 0.6s ease, color 0.6s ease",
          fontFamily: "'Poppins', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4rem 1rem 2rem 1rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Gradient Background */}
        <div
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            background:
              "radial-gradient(circle at center, #00f0ff44 0%, transparent 60%), radial-gradient(circle at top left, #ff00cc33 0%, transparent 70%)",
            animation: "rotate 15s linear infinite",
            zIndex: 0,
            filter: "blur(60px)",
          }}
        ></div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            margin: "1rem 0",
            zIndex: 1,
            backdropFilter: "blur(4px)",
          }}
        >
          🖼️ Image to PDF Converter
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          style={{
            padding: "10px 18px",
            cursor: "pointer",
            backgroundColor: buttonColor,
            border: `1px solid ${borderColor}`,
            borderRadius: "10px",
            fontWeight: "500",
            marginBottom: "2rem",
            transition: "background 0.3s",
            zIndex: 1,
          }}
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </motion.button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            zIndex: 1,
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
            border: `1px solid ${borderColor}`,
            borderRadius: "30px",
            padding: "3rem",
            boxShadow: theme === "dark"
              ? "0 0 25px rgba(255, 255, 255, 0.08)"
              : "0 8px 24px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "950px",
          }}
        >
          <ImageUpload theme={theme} />
        </motion.div>

        {/* Keyframes for background rotation */}
        <style>{`
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
