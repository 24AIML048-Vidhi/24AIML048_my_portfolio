import React from "react";

function Footer({ name, email }) {
  return (
    <footer
      style={{
        background: "#0b0f19",
        color: "white",
        padding: "35px 20px",
        textAlign: "center",
        margin: 0,
        borderTop: "1px solid #1e293b",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "28px",
          color: "#c4b5fd",
          fontWeight: "600",
        }}
      >
        Thank You for Visiting!
      </h2>

      <p
        style={{
          marginTop: "12px",
          color: "#cbd5e1",
          fontSize: "16px",
        }}
      >
        Designed & Developed by <strong>{name}</strong>
      </p>

      <p
        style={{
          marginTop: "8px",
          color: "#94a3b8",
          fontSize: "15px",
        }}
      >
        📧 {email}
      </p>

      {/* Social Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          margin: "25px 0",
        }}
      >
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#cbd5e1",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          GitHub
        </a>

        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#cbd5e1",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          LinkedIn
        </a>

        <a
          href={`mailto:${email}`}
          style={{
            color: "#cbd5e1",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Email
        </a>
      </div>

      <hr
        style={{
          width: "75%",
          border: "none",
          borderTop: "1px solid #334155",
          margin: "25px auto",
        }}
      />

      <p
        style={{
          color: "#94a3b8",
          fontSize: "14px",
          margin: "0 0 8px",
        }}
      >
        © {new Date().getFullYear()} {name}. All Rights Reserved.
      </p>

      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
          margin: 0,
        }}
      >
        Made with ❤️ using React & Vite
      </p>
    </footer>
  );
}

export default Footer;