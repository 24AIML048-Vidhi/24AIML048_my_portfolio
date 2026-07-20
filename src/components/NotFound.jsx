import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
        }

        .home-btn{
          text-decoration:none;
          border:2px solid #8b5cf6;
          color:#fff;
          padding:14px 30px;
          border-radius:30px;
          font-size:18px;
          font-weight:600;
        }

        .home-btn:hover{
          background:#8b5cf6;
        }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          background: "#0b0f19",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          color: "white",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "120px",
              margin: 0,
              fontWeight: "800",
            }}
          >
            <span className="gradient-text">404</span>
          </h1>

          <h2
            style={{
              fontSize: "42px",
              marginTop: "10px",
            }}
          >
            Page Not Found
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "20px",
              maxWidth: "600px",
              margin: "25px auto 40px",
              lineHeight: "1.8",
            }}
          >
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link to="/" className="home-btn">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;