import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ darkMode }) {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "10px",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              end={item.path === "/"}
              style={({ isActive }) => ({
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "25px",
                fontWeight: "600",
                fontSize: "15px",
                transition: "all 0.3s ease",

                background: isActive ? "#7C3AED" : "transparent",

                color: isActive
                  ? "#ffffff"
                  : darkMode
                  ? "#f8fafc"
                  : "#374151",

                display: "inline-block",
              })}
              onMouseEnter={(e) => {
                if (!e.target.classList.contains("active")) {
                  e.target.style.background = "#7C3AED";
                  e.target.style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                const active =
                  e.target.getAttribute("aria-current") === "page";

                if (!active) {
                  e.target.style.background = "transparent";
                  e.target.style.color = darkMode
                    ? "#f8fafc"
                    : "#374151";
                }
              }}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;