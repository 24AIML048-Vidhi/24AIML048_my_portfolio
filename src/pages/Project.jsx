import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects({ theme }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.BASE_URL}projects.json`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load projects.json (${response.status})`
          );
        }

        const data = await response.json();

        setRepos(data.projects || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const filteredRepos = repos.filter((repo) => {
    // -----------------------------
    // FILTER TYPE
    // -----------------------------

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "my"
        ? repo.projectType === "personal"
        : repo.projectType === "collaboration";

    // -----------------------------
    // SEARCH
    // -----------------------------

    const searchText = search.toLowerCase();

    const matchesSearch =
      repo.name?.toLowerCase().includes(searchText) ||
      repo.description
        ?.toLowerCase()
        .includes(searchText) ||
      repo.owner
        ?.toLowerCase()
        .includes(searchText) ||
      repo.languages?.some((language) =>
        language.toLowerCase().includes(searchText)
      );

    return matchesFilter && matchesSearch;
  });

  const personalCount = repos.filter(
    (repo) =>
      repo.projectType === "personal"
  ).length;

  const collaborationCount = repos.filter(
    (repo) =>
      repo.projectType === "collaboration"
  ).length;

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
      <style>
        {`
          .gradient-text {
            background: linear-gradient(
              135deg,
              #7C3AED,
              #EC4899
            );
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .project-card {
            background: ${theme.card};
            border: 1px solid ${theme.border};
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 25px;
            transition: .3s;
            box-shadow: ${
              theme.background === "#0b0f19"
                ? "0 8px 20px rgba(0,0,0,.35)"
                : "0 8px 25px rgba(0,0,0,.08)"
            };
          }

          .project-card:hover {
            transform: translateY(-5px);
          }

          .search-box {
            width: 100%;
            max-width: 500px;
            display: block;
            margin: 0 auto 25px;
            padding: 12px 18px;
            border-radius: 10px;
            border: 1px solid ${theme.border};
            outline: none;
            font-size: 16px;
            background: ${theme.card};
            color: ${theme.text};
          }

          .search-box::placeholder {
            color: ${theme.textSecondary};
          }

          .filter-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 35px;
          }

          .filter-button {
            padding: 10px 22px;
            border-radius: 25px;
            border: 1px solid ${theme.border};
            background: ${theme.card};
            color: ${theme.text};
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            transition: .3s;
          }

          .filter-button:hover {
            transform: translateY(-2px);
          }

          .filter-button.active {
            background: #7c3aed;
            color: white;
            border-color: #7c3aed;
          }

          .repo-link {
            display: inline-block;
            margin-top: 20px;
            color: ${
              theme.background === "#0b0f19"
                ? "#8b5cf6"
                : "#6d28d9"
            };
            font-weight: bold;
            text-decoration: none;
          }

          .badge {
            background: ${theme.background};
            border: 1px solid ${theme.border};
            color: ${
              theme.background === "#0b0f19"
                ? "#c4b5fd"
                : "#6d28d9"
            };
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
          }

          .lang-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 18px;
          }

          .stats {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
          }

          .collab-owner {
            margin-top: 10px;
            font-size: 15px;
            color: ${theme.textSecondary};
          }
        `}
      </style>

      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "35px",
        }}
      >
        <span className="gradient-text">
          Projects
        </span>
      </h1>

      {/* SEARCH */}

      <input
        className="search-box"
        type="text"
        placeholder="Search Repository, Owner, Language..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* FILTER BUTTONS */}

      <div className="filter-container">

        <button
          className={`filter-button ${
            filter === "all"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilter("all")
          }
        >
          All ({repos.length})
        </button>

        <button
          className={`filter-button ${
            filter === "my"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilter("my")
          }
        >
          My ({personalCount})
        </button>

        <button
          className={`filter-button ${
            filter === "collab"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilter("collab")
          }
        >
          Collab ({collaborationCount})
        </button>

      </div>

      {/* COUNTS */}

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
          📂{" "}
          <strong
            style={{
              color: theme.text,
            }}
          >
            Repositories:
          </strong>{" "}
          {repos.length}
        </p>

        <p>
          🔍{" "}
          <strong
            style={{
              color: theme.text,
            }}
          >
            Showing:
          </strong>{" "}
          {filteredRepos.length}
        </p>
      </div>

      {/* PROJECT LIST */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >

        {filteredRepos.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              color: theme.textSecondary,
            }}
          >
            <h3>
              No repositories found.
            </h3>

            {filter === "collab" && (
              <p>
                No collaboration repositories
                were detected yet.
              </p>
            )}
          </div>

        ) : (

          filteredRepos.map((repo) => (

            <div
              className="project-card"
              key={repo.id || repo.full_name}
            >

              {/* NAME */}

              <h2 className="gradient-text">
                {repo.name}
              </h2>

              {/* TYPE */}

              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <span className="badge">
                  {repo.projectType ===
                  "collaboration"
                    ? "🤝 Collaboration"
                    : "👤 My Project"}
                </span>
              </div>

              {/* OWNER */}

              {repo.projectType ===
                "collaboration" &&
                repo.owner && (
                  <p className="collab-owner">
                    👥 Collaborated with{" "}
                    <strong>
                      {repo.owner}
                    </strong>
                  </p>
                )}

              {/* DESCRIPTION */}

              <p
                style={{
                  color:
                    theme.textSecondary,
                  lineHeight: "1.8",
                  marginTop: "12px",
                  fontSize: "17px",
                }}
              >
                {repo.description ||
                  "No description available."}
              </p>

              {/* LANGUAGES */}

              <div className="lang-container">

                {repo.languages?.length > 0 ? (

                  repo.languages.map(
                    (language) => (
                      <span
                        key={language}
                        className="badge"
                      >
                        💻 {language}
                      </span>
                    )
                  )

                ) : (

                  <span className="badge">
                    💻 Unknown
                  </span>

                )}

              </div>

              {/* STATS */}

              <div className="stats">

                <span className="badge">
                  ⭐ {repo.stars || 0} Stars
                </span>

                <span className="badge">
                  🍴 {repo.forks || 0} Forks
                </span>

                <span className="badge">
                  👀 {repo.watchers || 0} Watchers
                </span>

                <span className="badge">
                  🐞 {repo.issues || 0} Issues
                </span>

              </div>

              {/* LINK */}

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