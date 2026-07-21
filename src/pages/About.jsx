import React from "react";

function About({ theme }) {
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
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          color:transparent;
          display:inline-block;
        }
      `}</style>

      <section
        id="about"
        style={{
          background: theme.background,
          color: theme.text,
          padding: "70px 8%",
          transition: "0.3s",
          minHeight: "100vh",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "52px",
            fontWeight: "800",
            marginBottom: "45px",
          }}
        >
          <span className="gradient-text">About Me</span>
        </h2>

        {/* Content */}
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {/* Introduction */}
          <p
            style={{
              color: theme.textSecondary,
              fontSize: "22px",
              lineHeight: "2",
              marginBottom: "55px",
            }}
          >
            I'm{" "}
            <span
              style={{
                color: theme.text,
                fontWeight: "700",
              }}
            >
              Vidhi Patel
            </span>
            , an enthusiastic{" "}
            <span
              style={{
                color: theme.warning,
                fontWeight: "600",
              }}
            >
              AI & Machine Learning Engineering
            </span>{" "}
            student at{" "}
            <span
              style={{
                color: theme.text,
                fontWeight: "600",
              }}
            >
              CHARUSAT University
            </span>
            . I am passionate about developing intelligent solutions using
            Artificial Intelligence and Machine Learning while also creating
            modern, responsive web applications. I enjoy learning new
            technologies, solving real-world problems, and continuously
            improving my technical and analytical skills.
          </p>

          {/* Details */}
          <div>
            {details.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "220px 1fr",
                  gap: "45px",
                  padding: "28px 0",
                  borderBottom:
                    index !== details.length - 1
                      ? `1px solid ${theme.border}`
                      : "none",
                  alignItems: "start",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: theme.accent,
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: theme.textSecondary,
                    fontSize: "20px",
                    lineHeight: "2",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;