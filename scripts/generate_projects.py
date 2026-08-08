import json
import os
import urllib.parse
import urllib.request
import urllib.error
from datetime import datetime, timezone


USERNAME = os.environ["GITHUB_USERNAME"]
TOKEN = os.environ.get("GITHUB_TOKEN", "")

API_BASE = "https://api.github.com"

HEADERS = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "portfolio-project-generator",
    "X-GitHub-Api-Version": "2022-11-28",
}

if TOKEN:
    HEADERS["Authorization"] = f"Bearer {TOKEN}"


def github_get(url):
    request = urllib.request.Request(
        url,
        headers=HEADERS
    )

    try:
        with urllib.request.urlopen(request) as response:
            return json.loads(
                response.read().decode("utf-8")
            )

    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8")

        print(f"\nGitHub API Error: {error.code}")
        print(body)
        raise


def get_all_pages(url, max_pages=10):
    results = []

    for page in range(1, max_pages + 1):

        separator = "&" if "?" in url else "?"

        page_url = (
            f"{url}"
            f"{separator}per_page=100"
            f"&page={page}"
        )

        data = github_get(page_url)

        if not data:
            break

        results.extend(data)

        if len(data) < 100:
            break

    return results


# ============================================================
# MY REPOSITORIES
# ============================================================

def get_my_repositories():

    print(
        f"\nFetching repositories owned by {USERNAME}..."
    )

    encoded_username = urllib.parse.quote(USERNAME)

    url = (
        f"{API_BASE}/users/"
        f"{encoded_username}/repos"
        f"?type=owner"
        f"&sort=updated"
    )

    return get_all_pages(url)


# ============================================================
# SEARCH COMMITS
# ============================================================

def search_commits(query):

    print(
        f"\nSearching GitHub commits:"
    )

    print(query)

    encoded_query = urllib.parse.quote(query)

    repositories = {}

    for page in range(1, 11):

        url = (
            f"{API_BASE}/search/commits"
            f"?q={encoded_query}"
            f"&per_page=100"
            f"&page={page}"
        )

        try:

            data = github_get(url)

        except Exception as error:

            print(
                "Commit search failed:"
            )

            print(error)

            break

        items = data.get(
            "items",
            []
        )

        print(
            f"Page {page}: "
            f"{len(items)} commits"
        )

        if not items:
            break

        for item in items:

            repository = item.get(
                "repository"
            )

            if not repository:
                continue

            full_name = repository.get(
                "full_name"
            )

            if full_name:

                repositories[
                    full_name
                ] = repository

        if len(items) < 100:
            break

    return repositories


# ============================================================
# FIND COLLABORATION REPOSITORIES
# ============================================================

def get_collaboration_repositories():

    repositories = {}

    # Search commits authored by the user
    author_repositories = search_commits(
        f"author:{USERNAME}"
    )

    repositories.update(
        author_repositories
    )

    # Search commits committed by the user
    committer_repositories = search_commits(
        f"committer:{USERNAME}"
    )

    repositories.update(
        committer_repositories
    )

    return list(
        repositories.values()
    )


# ============================================================
# GET REPOSITORY DETAILS
# ============================================================

def get_repository_details(full_name):

    encoded_name = urllib.parse.quote(
        full_name,
        safe="/"
    )

    url = (
        f"{API_BASE}/repos/"
        f"{encoded_name}"
    )

    return github_get(url)


# ============================================================
# GET LANGUAGES
# ============================================================

def get_languages(full_name):

    encoded_name = urllib.parse.quote(
        full_name,
        safe="/"
    )

    url = (
        f"{API_BASE}/repos/"
        f"{encoded_name}"
        f"/languages"
    )

    try:

        data = github_get(url)

        return list(
            data.keys()
        )

    except Exception as error:

        print(
            f"Could not get languages "
            f"for {full_name}"
        )

        print(error)

        return []


# ============================================================
# CREATE PROJECT
# ============================================================

def create_project(
    repository,
    project_type
):

    full_name = repository.get(
        "full_name"
    )

    print(
        f"\nProcessing {full_name}"
    )

    details = get_repository_details(
        full_name
    )

    languages = get_languages(
        full_name
    )

    owner = details.get(
        "owner",
        {}
    )

    owner_login = owner.get(
        "login"
    )

    # Extra safety:
    # If the repository belongs to another
    # GitHub user, it is collaboration.
    if owner_login and (
        owner_login.lower()
        != USERNAME.lower()
    ):
        project_type = "collaboration"

    else:
        project_type = "personal"

    return {
        "id": details.get("id"),

        "name": details.get("name"),

        "full_name": details.get(
            "full_name"
        ),

        "description": details.get(
            "description"
        ),

        "html_url": details.get(
            "html_url"
        ),

        "owner": owner_login,

        "owner_url": owner.get(
            "html_url"
        ),

        "languages": languages,

        "stars": details.get(
            "stargazers_count",
            0
        ),

        "forks": details.get(
            "forks_count",
            0
        ),

        "watchers": details.get(
            "watchers_count",
            0
        ),

        "issues": details.get(
            "open_issues_count",
            0
        ),

        "projectType": project_type,

        "updated_at": details.get(
            "updated_at"
        ),

        "fork": details.get(
            "fork",
            False
        )
    }


# ============================================================
# MAIN
# ============================================================

def main():

    print("\n")
    print("=" * 60)
    print("GitHub Portfolio Project Generator")
    print("=" * 60)

    # --------------------------------------------------------
    # 1. GET MY REPOSITORIES
    # --------------------------------------------------------

    my_repositories = (
        get_my_repositories()
    )

    print(
        f"\nMy repositories found: "
        f"{len(my_repositories)}"
    )

    projects = []

    my_repository_names = set()

    # --------------------------------------------------------
    # 2. ADD MY REPOSITORIES
    # --------------------------------------------------------

    for repository in my_repositories:

        full_name = repository.get(
            "full_name"
        )

        if not full_name:
            continue

        my_repository_names.add(
            full_name.lower()
        )

        # Ignore forked repositories
        # from personal list.
        if repository.get("fork"):
            continue

        try:

            project = create_project(
                repository,
                "personal"
            )

            projects.append(
                project
            )

        except Exception as error:

            print(
                f"\nCould not process "
                f"{full_name}"
            )

            print(error)

    # --------------------------------------------------------
    # 3. FIND COLLABORATIONS
    # --------------------------------------------------------

    collaboration_repositories = (
        get_collaboration_repositories()
    )

    print(
        f"\nRepositories found through "
        f"commit search: "
        f"{len(collaboration_repositories)}"
    )

    # --------------------------------------------------------
    # 4. ADD COLLABORATIONS
    # --------------------------------------------------------

    for repository in (
        collaboration_repositories
    ):

        full_name = repository.get(
            "full_name"
        )

        if not full_name:
            continue

        # Don't duplicate own repositories.
        if (
            full_name.lower()
            in my_repository_names
        ):
            continue

        try:

            project = create_project(
                repository,
                "collaboration"
            )

            projects.append(
                project
            )

        except Exception as error:

            print(
                f"\nCould not process "
                f"{full_name}"
            )

            print(error)

    # --------------------------------------------------------
    # 5. REMOVE DUPLICATES
    # --------------------------------------------------------

    unique_projects = {}

    for project in projects:

        full_name = project.get(
            "full_name"
        )

        if full_name:
            unique_projects[
                full_name.lower()
            ] = project

    projects = list(
        unique_projects.values()
    )

    # --------------------------------------------------------
    # 6. SORT
    # --------------------------------------------------------

    projects.sort(
        key=lambda project:
            project.get(
                "updated_at"
            ) or "",
        reverse=True
    )

    # --------------------------------------------------------
    # 7. COUNTS
    # --------------------------------------------------------

    personal_count = sum(
        1
        for project in projects
        if project.get(
            "projectType"
        ) == "personal"
    )

    collaboration_count = sum(
        1
        for project in projects
        if project.get(
            "projectType"
        ) == "collaboration"
    )

    # --------------------------------------------------------
    # 8. OUTPUT
    # --------------------------------------------------------

    output = {
        "username": USERNAME,

        "updated_at":
            datetime.now(
                timezone.utc
            ).isoformat(),

        "total": len(projects),

        "personal":
            personal_count,

        "collaborations":
            collaboration_count,

        "projects":
            projects
    }

    # --------------------------------------------------------
    # 9. CREATE PUBLIC DIRECTORY
    # --------------------------------------------------------

    os.makedirs(
        "public",
        exist_ok=True
    )

    # --------------------------------------------------------
    # 10. WRITE JSON
    # --------------------------------------------------------

    with open(
        "public/projects.json",
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            output,
            file,
            indent=2,
            ensure_ascii=False
        )

    # --------------------------------------------------------
    # 11. FINAL REPORT
    # --------------------------------------------------------

    print("\n")
    print("=" * 60)
    print("SUCCESS")
    print("=" * 60)

    print(
        f"Total projects: "
        f"{len(projects)}"
    )

    print(
        f"My projects: "
        f"{personal_count}"
    )

    print(
        f"Collaborations: "
        f"{collaboration_count}"
    )

    print(
        "\nCreated:"
    )

    print(
        "public/projects.json"
    )

    print("=" * 60)


if __name__ == "__main__":
    main()