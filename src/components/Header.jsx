import React from "react";
import Navbar from "./Navbar";

function Header({ name }) {
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
        background: "#FFFFFF",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
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
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          VP
        </div>

        {/* Name */}
        <div>
          <h2
            style={{
              margin: 0,
              color: "#1F2937",
              fontSize: "22px",
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            {name}
          </h2>

          <p
            style={{
              margin: "2px 0 0",
              color: "#7C3AED",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            AI & Machine Learning Engineering Student
          </p>
        </div>
      </div>

      {/* Right Section */}
      <Navbar />
    </header>
  );
}

export default Header;