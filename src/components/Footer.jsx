import React from "react";

function Footer({ name, email }) {
  return (
    <>
      <style>{`
        .gradient-text{
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          color:transparent;
          display:inline-block;
        }
      `}</style>

      <footer
        style={{
          background: "#0b0f19",
          color: "white",
          padding: "35px 20px",
          textAlign: "center",
          borderTop: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: "800",
          }}
        >
          <span className="gradient-text">Thank You for Visiting!</span>
        </h2>

        <p
          style={{
            marginTop: "18px",
            color: "#cbd5e1",
            fontSize: "20px",
            lineHeight: "1.8",
          }}
        >
          Designed & Developed by <strong>{name}</strong>
        </p>

        <p
          style={{
            marginTop: "8px",
            color: "#94a3b8",
            fontSize: "18px",
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
            margin: "28px 0",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://github.com/24AIML048-Vidhi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/vidhi-patel-b38ba4317/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            LinkedIn
          </a>

          <a
            href={`mailto:${email}`}
            style={{
              color: "#cbd5e1",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "18px",
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
            fontSize: "17px",
            margin: "0 0 8px",
          }}
        >
          © {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>

        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
            margin: 0,
          }}
        >
          Made with ❤️ using React & Vite
        </p>
      </footer>
    </>
  );
}

export default Footer;