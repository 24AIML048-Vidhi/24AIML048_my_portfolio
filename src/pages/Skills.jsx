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
    "DSA",
    "DAA",
  ];

  return (
    <section
      id="skills"
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
          marginBottom: "40px",
          background: "linear-gradient(90deg, #c084fc, #ec4899, #fbbf24)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        My Skills
      </h2>

      {/* Skills */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "14px",
          fontSize: "18px",
          color: "#e2e8f0",
          lineHeight: "1.8",
        }}
      >
        {skills.map((skill, index) => (
          <React.Fragment key={index}>
            <span>{skill}</span>
            {index !== skills.length - 1 && (
              <span style={{ color: "#8b5cf6" }}>•</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default Skills;