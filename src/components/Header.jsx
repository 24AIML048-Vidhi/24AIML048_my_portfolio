import React from "react";
import Navbar from "./Navbar";

function Header({ name, darkMode, setDarkMode }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 8%",
        background: darkMode ? "#111827" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",
        borderBottom: darkMode
          ? "1px solid #1e293b"
          : "1px solid #e5e7eb",
        boxShadow: darkMode
          ? "0 2px 15px rgba(0,0,0,.35)"
          : "0 2px 15px rgba(0,0,0,.08)",
        transition: "all .3s ease",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7C3AED,#EC4899)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          VP
        </div>

        {/* Name */}
        <div>
          <h2
            style={{
              margin: 0,
              color: darkMode ? "#ffffff" : "#111827",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            {name}
          </h2>

          <p
            style={{
              margin: "3px 0 0",
              color: darkMode ? "#c4b5fd" : "#7c3aed",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            AI & Machine Learning Engineering Student
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Navbar darkMode={darkMode} />

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "10px 18px",
            borderRadius: "30px",
            border: "none",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
            background: darkMode
              ? "#facc15"
              : "linear-gradient(135deg,#7C3AED,#EC4899)",
            color: "#ffffff",
            transition: ".3s",
            boxShadow: "0 4px 12px rgba(0,0,0,.15)",
          }}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;