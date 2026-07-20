import React from "react";

function Header({ name }) {
  const navItems = ["Home", "About", "Skills", "Contact"];

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
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
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
              fontSize: "11px",
              color: "#7C3AED",
            }}
          >
            AI & ML Engineering Student
          </p>
        </div>
      </div>

      {/* Right */}
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "8px",
            margin: 0,
            padding: 0,
          }}
        >
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  textDecoration: "none",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  padding: "8px 14px",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#7C3AED";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#374151";
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;