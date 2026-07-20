import React from "react";
import { Link } from "react-router-dom";

function Home() {
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
          padding:14px 32px;
          border-radius:30px;
          font-weight:600;
          font-size:17px;
        }
      `}</style>

      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "50px 10%",
          background: "#0b0f19",
          color: "white",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            maxWidth: "58%",
          }}
        >
          <p
            style={{
              color: "#c4b5fd",
              fontSize: "16px",
              letterSpacing: "4px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            HELLO THERE 👋
          </p>

          <h1
            style={{
              fontSize: "60px",
              margin: 0,
              lineHeight: "1.15",
              fontWeight: "800",
            }}
          >
            I'm <span className="gradient-text">Vidhi Patel</span>
          </h1>

          <h2
            style={{
              marginTop: "16px",
              color: "#fbbf24",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            AI & Machine Learning Engineering Student
          </h2>

          <p
            style={{
              marginTop: "28px",
              color: "#9ca3af",
              fontSize: "20px",
              lineHeight: "1.9",
              maxWidth: "650px",
            }}
          >
            Passionate about{" "}
            <b style={{ color: "#ffffff" }}>Artificial Intelligence</b>,
            <b style={{ color: "#ffffff" }}> Machine Learning</b>,
            <b style={{ color: "#ffffff" }}> Web Development</b>, and
            <b style={{ color: "#ffffff" }}> Problem Solving</b>. I enjoy
            developing responsive web applications, building intelligent
            solutions, and continuously learning modern technologies to solve
            real-world challenges.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "18px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <Link to="/about" className="home-btn">
              About Me
            </Link>

            <Link to="/skills" className="home-btn">
              My Skills
            </Link>

            <Link to="/projects" className="home-btn">
              My Projects
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#7C3AED,#EC4899)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: "88px",
                fontWeight: "800",
                letterSpacing: "4px",
              }}
            >
              VP
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;