import React from "react";

function Projects() {
  const projects = [
    {
      title: "SkillUpgrade",
      icon: "📚",
      description:
        "A web-based learning platform that helps users enhance their technical skills through structured courses, quizzes, and progress tracking.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      features: [
        "Course Browsing",
        "Learning Modules",
        "Responsive Design",
        "Progress Tracking",
      ],
      github: "https://github.com/24AIML048-Vidhi",
      demo: "#",
    },
    {
      title: "Sentiment Analysis",
      icon: "🤖",
      description:
        "A Machine Learning and NLP project that analyzes user reviews and classifies them into Positive, Negative, or Neutral sentiments using text preprocessing and classification techniques.",
      technologies: [
        "Python",
        "NLP",
        "Pandas",
        "Scikit-learn",
      ],
      features: [
        "Text Preprocessing",
        "Sentiment Prediction",
        "Data Visualization",
        "Machine Learning Model",
      ],
      github: "https://github.com/24AIML048-Vidhi",
      demo: "#",
    },
  ];

  return (
    <section
      style={{
        background: "#0b0f19",
        minHeight: "100vh",
        padding: "70px 8%",
        color: "white",
      }}
    >
      {/* Styles */}
      <style>{`
        .gradient-text{
          background:linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
          display:inline-block;
        }

        .project-card{
          background:#111827;
          border:1px solid rgba(139,92,246,.25);
          border-radius:20px;
          padding:30px;
          margin-bottom:35px;
        }

        .tech{
          background:#1e293b;
          border:1px solid rgba(139,92,246,.3);
          color:#c4b5fd;
          padding:8px 16px;
          border-radius:20px;
          font-size:14px;
          font-weight:600;
        }

        .project-btn{
          text-decoration:none;
          border:2px solid #8b5cf6;
          color:white;
          padding:10px 22px;
          border-radius:30px;
          font-weight:600;
          background:transparent;
        }
      `}</style>

      {/* Heading */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "52px",
          marginBottom: "55px",
          fontWeight: "800",
        }}
      >
        <span className="gradient-text">My Projects</span>
      </h1>

      <div
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
        }}
      >
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            {/* Project Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: "30px",
                }}
              >
                {project.icon}{" "}
                <span className="gradient-text">{project.title}</span>
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn"
                >
                  GitHub
                </a>

                <a
                  href={project.demo}
                  className="project-btn"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                color: "#9ca3af",
                lineHeight: "1.8",
                marginTop: "20px",
                fontSize: "16px",
              }}
            >
              {project.description}
            </p>

            {/* Technologies */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              {project.technologies.map((tech, i) => (
                <span className="tech" key={i}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Features */}
            <div
              style={{
                marginTop: "28px",
              }}
            >
              <h3
                style={{
                  color: "#c4b5fd",
                  marginBottom: "15px",
                }}
              >
                Key Features
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "14px",
                }}
              >
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      color: "#cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#22c55e",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;