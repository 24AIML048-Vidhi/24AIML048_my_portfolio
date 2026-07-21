import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Project from "./pages/Project";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = {
  background: darkMode ? "#0b0f19" : "#f3f4f6",
  text: darkMode ? "#ffffff" : "#111827",
  textSecondary: darkMode ? "#9ca3af" : "#4b5563",

  card: darkMode ? "#111827" : "#ffffff",

  border: darkMode ? "#334155" : "#d1d5db",

  accent: darkMode ? "#a78bfa" : "#7c3aed",

  warning: darkMode ? "#fbbf24" : "#d97706",

  shadow: darkMode
    ? "0 10px 25px rgba(0,0,0,.35)"
    : "0 10px 25px rgba(0,0,0,.12)",
};

  return (
    <>
      {/* Header */}
      <Header
        name="Vidhi Patel"
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
      />

      {/* Main Content */}
      <main
        style={{
          background: theme.background,
          color: theme.text,
          minHeight: "calc(100vh - 160px)",
          transition: "all 0.3s ease",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} darkMode={darkMode} />}
          />

          <Route
            path="/about"
            element={<About theme={theme} darkMode={darkMode} />}
          />

          <Route
            path="/skills"
            element={<Skills theme={theme} darkMode={darkMode} />}
          />

          <Route
            path="/projects"
            element={<Project theme={theme} darkMode={darkMode} />}
          />

          <Route
            path="/contact"
            element={<Contact theme={theme} darkMode={darkMode} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Gradient Divider */}
      <div
        style={{
          height: "1px",
          width: "100%",
          background:
            "linear-gradient(to right, transparent, #7C3AED, #EC4899, transparent)",
        }}
      />

      {/* Footer */}
      <Footer
        name="Vidhi Patel"
        email="vidhipatel1796@gmail.com"
        theme={theme}
        darkMode={darkMode}
      />
    </>
  );
}

export default App;