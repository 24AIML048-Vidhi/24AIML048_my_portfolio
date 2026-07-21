import React from "react";

function Skills({ theme }) {
  const skills = [
    "Python",
    "C++",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Technologies",
    "DBMS",
    "SQL",
    "Data Structures & Algorithms",
    "Design & Analysis of Algorithms",
  ];

  return (
    <section
      style={{
        background: theme.background,
        color: theme.text,
        padding: "50px 8% 80px",
        minHeight: "calc(100vh - 80px)",
        transition: "0.3s",
      }}
    >
      <style>{`
        .gradient-text{
          background: linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          display:inline-block;
        }

        .skill-badge{
          padding:14px 26px;
          border:2px solid ${theme.accent};
          border-radius:30px;
          background:${theme.card};
          color:${theme.text};
          font-size:17px;
          font-weight:600;
          transition:0.3s;
          box-shadow:${theme.shadow};
        }

        .skill-badge:hover{
          background:${theme.accent};
          color:#ffffff;
          transform:translateY(-3px);
          cursor:pointer;
        }
      `}</style>

      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "52px",
          fontWeight: "800",
          margin: "0 0 45px",
        }}
      >
        <span className="gradient-text">My Skills</span>
      </h1>

      {/* Skills */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "18px",
        }}
      >
        {skills.map((skill, index) => (
          <span className="skill-badge" key={index}>
            {skill}
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          color: theme.textSecondary,
          textAlign: "center",
          marginTop: "55px",
          fontSize: "22px",
          lineHeight: "1.9",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          transition: "0.3s",
        }}
      >
        I enjoy working with{" "}
        <strong style={{ color: theme.text }}>
          Artificial Intelligence
        </strong>
        ,
        <strong style={{ color: theme.text }}>
          {" "}Machine Learning
        </strong>
        ,
        <strong style={{ color: theme.text }}>
          {" "}Web Development
        </strong>
        , and{" "}
        <strong style={{ color: theme.text }}>
          Problem Solving
        </strong>
        . I continuously improve my programming, analytical, and technical
        skills by building real-world projects, solving coding problems, and
        exploring modern technologies.
      </p>
    </section>
  );
}

export default Skills;