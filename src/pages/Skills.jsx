import React from "react";

function Skills() {
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
        background: "#0b0f19",
        color: "white",
        padding: "50px 8% 80px",
        minHeight: "calc(100vh - 80px)",
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
          border:2px solid #8b5cf6;
          border-radius:30px;
          background:#111827;
          color:#ffffff;
          font-size:17px;
          font-weight:600;
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
          color: "#cbd5e1",
          textAlign: "center",
          marginTop: "55px",
          fontSize: "22px",
          lineHeight: "1.9",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        I enjoy working with <strong>Artificial Intelligence</strong>,
        <strong> Machine Learning</strong>, <strong>Web Development</strong>,
        and <strong>Problem Solving</strong>. I continuously improve my
        programming, analytical, and technical skills by building real-world
        projects, solving coding problems, and exploring modern technologies.
      </p>
    </section>
  );
}

export default Skills;