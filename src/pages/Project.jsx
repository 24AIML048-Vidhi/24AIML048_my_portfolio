import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects({ theme }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.github.com/users/24AIML048-Vidhi/repos"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch repositories.");
      }

      const data = await response.json();

      const reposWithLanguages = await Promise.all(
        data.map(async (repo) => {
          try {
            const langResponse = await fetch(repo.languages_url);
            const languageData = await langResponse.json();

            return {
              ...repo,
              languages: Object.keys(languageData),
            };
          } catch {
            return {
              ...repo,
              languages: [],
            };
          }
        })
      );

      setRepos(reposWithLanguages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchRepos}
      />
    );
  }

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      style={{
        background: theme.background,
        minHeight: "100vh",
        padding: "70px 8%",
        color: theme.text,
        transition: "0.3s",
      }}
    >
      <style>{`
        .gradient-text{
          background:linear-gradient(135deg,#7C3AED,#EC4899);
          -webkit-background-clip:text;
          background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .project-card{
          background:${theme.card};
          border:1px solid ${theme.border};
          border-radius:20px;
          padding:25px;
          margin-bottom:25px;
          transition:.3s;
          box-shadow:${
            theme.background === "#0b0f19"
              ? "0 8px 20px rgba(0,0,0,.35)"
              : "0 8px 25px rgba(0,0,0,.08)"
          };
        }

        .project-card:hover{
          transform:translateY(-5px);
        }

        .search-box{
          width:100%;
          max-width:500px;
          display:block;
          margin:0 auto 30px;
          padding:12px 18px;
          border-radius:10px;
          border:1px solid ${theme.border};
          outline:none;
          font-size:16px;
          background:${theme.card};
          color:${theme.text};
          transition:.3s;
        }

        .search-box::placeholder{
          color:${theme.textSecondary};
        }

        .repo-link{
          display:inline-block;
          margin-top:20px;
          color:${theme.background === "#0b0f19" ? "#8b5cf6" : "#6d28d9"};
          font-weight:bold;
          text-decoration:none;
          transition:.3s;
        }

        .repo-link:hover{
          color:${theme.background === "#0b0f19" ? "#c4b5fd" : "#4c1d95"};
        }

        .badge{
          background:${theme.background};
          border:1px solid ${theme.border};
          color:${theme.background === "#0b0f19" ? "#c4b5fd" : "#6d28d9"};
          padding:6px 14px;
          border-radius:20px;
          font-size:14px;
          font-weight:600;
          transition:.3s;
        }

        .badge:hover{
          background:#8b5cf6;
          color:white;
        }

        .lang-container{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin-top:18px;
        }

        .stats{
          display:flex;
          gap:15px;
          flex-wrap:wrap;
          margin-top:15px;
        }
      `}</style>

      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "35px",
        }}
      >
        <span className="gradient-text">Projects</span>
      </h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search Repository..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 30px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          color: theme.textSecondary,
          fontSize: "17px",
          fontWeight: "600",
        }}
      >
        <p>
          📂 <strong style={{ color: theme.text }}>Repositories:</strong>{" "}
          {repos.length}
        </p>

        <p>
          🔍 <strong style={{ color: theme.text }}>Showing:</strong>{" "}
          {filteredRepos.length}
        </p>
      </div>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {filteredRepos.length === 0 ? (
          <h3
            style={{
              textAlign: "center",
              color: theme.textSecondary,
            }}
          >
            No repositories found.
          </h3>
        ) : (
          filteredRepos.map((repo) => (
            <div className="project-card" key={repo.id}>
              {/* Repository Name */}
              <h2 className="gradient-text">{repo.name}</h2>

              {/* Description */}
              <p
                style={{
                  color: theme.textSecondary,
                  lineHeight: "1.8",
                  marginTop: "12px",
                  fontSize: "17px",
                }}
              >
                {repo.description || "No description available."}
              </p>

              {/* Languages */}
              <div className="lang-container">
                {repo.languages.length > 0 ? (
                  repo.languages.map((lang) => (
                    <span key={lang} className="badge">
                      💻 {lang}
                    </span>
                  ))
                ) : (
                  <span className="badge">💻 Unknown</span>
                )}
              </div>

              {/* Repository Stats */}
              <div className="stats">
                <span className="badge">
                  ⭐ {repo.stargazers_count} Stars
                </span>

                <span className="badge">
                  🍴 {repo.forks_count} Forks
                </span>

                <span className="badge">
                  👀 {repo.watchers_count} Watchers
                </span>

                <span className="badge">
                  🐞 {repo.open_issues_count} Issues
                </span>
              </div>

              {/* Repository Link */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="repo-link"
              >
                🔗 View Repository →
              </a>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Projects;