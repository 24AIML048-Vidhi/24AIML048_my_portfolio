import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <style>{`
        .nav-link{
          text-decoration:none;
          color:#374151;
          font-weight:600;
          font-size:15px;
          padding:10px 18px;
          border-radius:25px;
          transition:all .3s ease;
        }

        .nav-link:hover{
          background:#7C3AED;
          color:white;
        }

        .nav-link.active{
          background:#7C3AED;
          color:white;
        }
      `}</style>

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
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;