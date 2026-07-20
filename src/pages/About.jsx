import React from "react";

function About() {
  const details = [
    {
      title: "Education",
      value: (
        <>
          B.Tech in Artificial Intelligence & Machine Learning
          <br />
          CHARUSAT University
        </>
      ),
    },
    {
      title: "Interests",
      value: (
        <>
          Artificial Intelligence • Machine Learning
          <br />
          Web Development • Problem Solving
        </>
      ),
    },
    {
      title: "Career Goal",
      value: (
        <>
          Become an AI Engineer and build intelligent
          <br />
          applications that solve real-world problems.
        </>
      ),
    },
  ];

  return (
    <section
      id="about"
      style={{
        background: "#0b0f19",
        color: "white",
        padding: "70px 8%",
        scrollMarginTop: "90px",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "34px",
          fontWeight: "700",
          marginBottom: "30px",
          background:
            "linear-gradient(90deg, #c084fc, #ec4899, #fbbf24)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        About Me
      </h2>

      {/* Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Introduction */}
        <p
          style={{
            color: "#9ca3af",
            fontSize: "16px",
            lineHeight: "1.9",
            marginBottom: "45px",
            textAlign: "left",
          }}
        >
          I'm{" "}
          <span style={{ color: "#ffffff", fontWeight: "700" }}>
            Vidhi Patel
          </span>
          , an enthusiastic{" "}
          <span style={{ color: "#fbbf24", fontWeight: "600" }}>
            AI & Machine Learning Engineering
          </span>{" "}
          student at{" "}
          <span style={{ color: "#ffffff", fontWeight: "600" }}>
            CHARUSAT University
          </span>
          . I enjoy building modern web applications, exploring Artificial
          Intelligence, and solving real-world problems through technology.
        </p>

        {/* Information */}
        <div>
          {details.map((item, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                gap: "35px",
                padding: "22px 0",
                borderBottom:
                  index !== details.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
                alignItems: "start",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: "#c4b5fd",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#cbd5e1",
                  fontSize: "16px",
                  lineHeight: "1.8",
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;