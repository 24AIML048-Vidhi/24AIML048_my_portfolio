import React from "react";

function Home() {
  return (
    <>
      {/* CSS inside Home.jsx */}
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
        }
      `}</style>

      <section
        id="home"
        style={{
          minHeight: "75vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px 10%",
          background: "#0b0f19",
          color: "white",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 1,
            maxWidth: "55%",
          }}
        >
          <p
            style={{
              color: "#c4b5fd",
              fontSize: "13px",
              letterSpacing: "4px",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            HELLO THERE 👋
          </p>

          <h1
            style={{
              fontSize: "48px",
              margin: 0,
              lineHeight: "1.2",
              fontWeight: "800",
              color: "#f3f4f6",
            }}
          >
            I'm <span className="gradient-text">Vidhi Patel</span>
          </h1>

          <h2
            style={{
              marginTop: "12px",
              color: "#fbbf24",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            AI & Machine Learning Engineering Student
          </h2>

          <p
            style={{
              marginTop: "20px",
              color: "#9ca3af",
              fontSize: "15px",
              lineHeight: "1.8",
              maxWidth: "520px",
            }}
          >
            Passionate about{" "}
            <b style={{ color: "#ffffff" }}>Artificial Intelligence</b>,{" "}
            <b style={{ color: "#ffffff" }}>Machine Learning</b>,{" "}
            <b style={{ color: "#ffffff" }}>Web Technologies</b>, and{" "}
            <b style={{ color: "#ffffff" }}>Problem Solving</b>. I enjoy
            developing responsive web applications and continuously learning
            modern technologies to solve real-world challenges.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
            }}
          >
            <a
              href="#about"
              style={{
                textDecoration: "none",
                border: "2px solid #8b5cf6",
                color: "#fff",
                padding: "11px 25px",
                borderRadius: "30px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              About Me
            </a>

            <a
              href="#skills"
              style={{
                textDecoration: "none",
                border: "2px solid #8b5cf6",
                color: "#fff",
                padding: "11px 25px",
                borderRadius: "30px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              My Skills
            </a>
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
              width: "240px",
              height: "240px",
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
                fontSize: "68px",
                fontWeight: "800",
                letterSpacing: "3px",
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