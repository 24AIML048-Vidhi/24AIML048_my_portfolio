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
  return (
    <>
      {/* Header */}
      <Header
        name="Vidhi Patel"
        color="#0ea5e9"
      />

      {/* Main Content */}
      <main
        style={{
          background: "#0b0f19",
          minHeight: "calc(100vh - 160px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/contact" element={<Contact />} />

          {/* 404 Page */}
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
      />
    </>
  );
}

export default App;