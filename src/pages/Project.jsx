import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects({ theme }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // =========================================================
  // FETCH GENERATED PROJECT DATA
  // =========================================================

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "/projects.json"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load projects."
          );
        }

        const data = await response.json();

        if (!data.projects) {
          throw new Error(
            "Invalid projects data."
          );
        }

        setRepos(data.projects);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return <Spinner />;
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div
        style={{
          background: theme.background,
          minHeight: "100vh",
          padding: "100px 8%",
        }}
      >
        <ErrorMessage message={error} />
      </div>
    );
  }

  // =========================================================
  // SEARCH + FILTER
  // =========================================================

  const filteredRepos = repos.filter((repo) => {
    const searchText =
      search.toLowerCase();

    const matchesSearch =
      repo.name
        ?.toLowerCase()
        .includes(searchText) ||
      repo.full_name
        ?.toLowerCase()
        .includes(searchText) ||
      repo.description
        ?.toLowerCase()
        .includes(searchText) ||
      repo.owner
        ?.toLowerCase()
        .includes(searchText);

    const matchesFilter =
      filter === "all" ||
      repo.projectType === filter;

    return (
      matchesSearch &&
      matchesFilter
    );
  });

  // =========================================================
  // COUNTS
  // =========================================================

  const totalCount = repos.length;

  const myCount = repos.filter(
    (repo) =>
      repo.projectType === "personal"
  ).length;

  const collabCount = repos.filter(
    (repo) =>
      repo.projectType === "collaboration"
  ).length;

  // =========================================================
  // BUTTON STYLE
  // =========================================================

  const getFilterStyle = (type) => ({
    padding: "10px 22px",
    borderRadius: "25px",
    border: `1px solid ${theme.border}`,
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    background:
      filter === type
        ? "#8b5cf6"
        : theme.card,
    color:
      filter === type
        ? "#ffffff"
        : theme.text,
    transition: "0.3s",
  });

  // =========================================================
  // UI
  // =========================================================

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
            margin: 0 auto 20px;

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
            align-items: center;

            gap: 10px;

            flex-wrap: wrap;

            margin-bottom: 35px;
          }

          .filter-button:hover {
            transform: translateY(-2px);
          }

          .project-type {
            display: inline-block;

            margin-left: 10px;

            padding: 5px 12px;

            border-radius: 20px;

            font-size: 13px;

            font-weight: 700;

            border: 1px solid ${theme.border};
          }

          .owner-info {
            color: ${theme.textSecondary};

            font-size: 14px;

            margin-top: 8px;
          }

          .description {
            color: ${theme.textSecondary};

            line-height: 1.8;

            margin-top: 12px;

            font-size: 17px;
          }

          .lang-container {
            display: flex;

            flex-wrap: wrap;

            gap: 8px;

            margin-top: 18px;
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

            transition: .3s;
          }

          .badge:hover {
            background: #8b5cf6;

            color: white;
          }

          .stats {
            display: flex;

            gap: 15px;

            flex-wrap: wrap;

            margin-top: 15px;
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

            transition: .3s;
          }

          .repo-link:hover {
            color: ${
              theme.background === "#0b0f19"
                ? "#c4b5fd"
                : "#4c1d95"
            };
          }

          .github-owner-link {
            color: inherit;

            text-decoration: none;

            font-weight: 600;
          }

          .github-owner-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      {/* =====================================================
          TITLE
      ===================================================== */}

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

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <input
        className="search-box"
        type="text"
        placeholder="Search Repository or Owner..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* =====================================================
          FILTER BUTTONS
      ===================================================== */}

      <div className="filter-container">
        <button
          className="filter-button"
          style={getFilterStyle("all")}
          onClick={() =>
            setFilter("all")
          }
        >
          All
        </button>

        <button
          className="filter-button"
          style={getFilterStyle("personal")}
          onClick={() =>
            setFilter("personal")
          }
        >
          My
        </button>

        <button
          className="filter-button"
          style={getFilterStyle("collaboration")}
          onClick={() =>
            setFilter("collaboration")
          }
        >
          Collab
        </button>
      </div>

      {/* =====================================================
          COUNTS
      ===================================================== */}

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 30px",

          display: "flex",

          justifyContent:
            "space-between",

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
            Total:
          </strong>{" "}
          {totalCount}
        </p>

        <p>
          👤{" "}
          <strong
            style={{
              color: theme.text,
            }}
          >
            My:
          </strong>{" "}
          {myCount}
        </p>

        <p>
          🤝{" "}
          <strong
            style={{
              color: theme.text,
            }}
          >
            Collab:
          </strong>{" "}
          {collabCount}
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

      {/* =====================================================
          PROJECT LIST
      ===================================================== */}

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
            <div
              className="project-card"
              key={repo.full_name}
            >
              {/* =================================================
                  NAME
              ================================================= */}

              <h2 className="gradient-text">
                {repo.name}

                <span
                  className="project-type"
                  style={{
                    color:
                      repo.projectType ===
                      "collaboration"
                        ? "#ec4899"
                        : "#8b5cf6",
                  }}
                >
                  {repo.projectType ===
                  "collaboration"
                    ? "🤝 Collab"
                    : "👤 My Project"}
                </span>
              </h2>

              {/* =================================================
                  OWNER
              ================================================= */}

              <p className="owner-info">
                {repo.projectType ===
                "collaboration"
                  ? "🤝 Collaborated with: "
                  : "👤 Owner: "}

                {repo.owner_url ? (
                  <a
                    href={repo.owner_url}
                    target="_blank"
                    rel="noreferrer"
                    className="github-owner-link"
                  >
                    {repo.owner}
                  </a>
                ) : (
                  repo.owner
                )}
              </p>

              {/* =================================================
                  REPOSITORY NAME
              ================================================= */}

              <p
                style={{
                  color:
                    theme.textSecondary,

                  fontSize: "13px",

                  marginTop: "5px",
                }}
              >
                {repo.full_name}
              </p>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="description">
                {repo.description ||
                  "No description available."}
              </p>

              {/* =================================================
                  LANGUAGES
              ================================================= */}

              <div className="lang-container">
                {repo.languages &&
                repo.languages.length > 0 ? (
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

              {/* =================================================
                  STATS
              ================================================= */}

              <div className="stats">
                <span className="badge">
                  ⭐ {repo.stars} Stars
                </span>

                <span className="badge">
                  🍴 {repo.forks} Forks
                </span>

                <span className="badge">
                  👀 {repo.watchers} Watchers
                </span>

                <span className="badge">
                  🐞 {repo.issues} Issues
                </span>
              </div>

              {/* =================================================
                  GITHUB LINK
              ================================================= */}

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