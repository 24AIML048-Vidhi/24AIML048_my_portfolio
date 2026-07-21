import React from "react";

function Footer({ name, email, theme }) {
  return (
    <>
      <style>{`
        .gradient-text{
          background:linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          display:inline-block;
        }

        .footer-link{
          color:inherit;
          text-decoration:none;
          font-weight:600;
          font-size:18px;
          transition:.3s;
        }

        .footer-link:hover{
          color:#8b5cf6;
        }
      `}</style>

      <footer
        style={{
          background: theme.background,
          color: theme.text,
          padding: "35px 20px",
          textAlign: "center",
          borderTop: `1px solid ${theme.border}`,
          transition: "0.3s",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            margin: 0,
            fontSize: "42px",
            fontWeight: "800",
          }}
        >
          <span className="gradient-text">
            Thank You for Visiting!
          </span>
        </h2>

        {/* Name */}
        <p
          style={{
            marginTop: "18px",
            color: theme.textSecondary,
            fontSize: "20px",
            lineHeight: "1.8",
          }}
        >
          Designed & Developed by{" "}
          <strong style={{ color: theme.text }}>
            {name}
          </strong>
        </p>

        {/* Email */}
        <p
          style={{
            marginTop: "8px",
            color: theme.textSecondary,
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
            className="footer-link"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/vidhi-patel-b38ba4317/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>

          <a
            href={`mailto:${email}`}
            className="footer-link"
          >
            Email
          </a>
        </div>

        {/* Divider */}
        <hr
          style={{
            width: "75%",
            border: "none",
            borderTop: `1px solid ${theme.border}`,
            margin: "25px auto",
          }}
        />

        {/* Copyright */}
        <p
          style={{
            color: theme.textSecondary,
            fontSize: "17px",
            margin: "0 0 8px",
          }}
        >
          © {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>

        <p
          style={{
            color: theme.textSecondary,
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