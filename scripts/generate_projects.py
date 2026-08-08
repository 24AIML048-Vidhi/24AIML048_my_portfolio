import json
import os
import urllib.parse
import urllib.request
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

        print(
            f"GitHub API error {error.code}:"
        )
        print(body)

        raise


def get_all_pages(url):
    results = []
    page = 1

    while True:
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

        page += 1

    return results


# ============================================================
# GET YOUR PUBLIC REPOSITORIES
# ============================================================

def get_my_repositories():

    print(
        f"Fetching public repositories "
        f"for {USERNAME}..."
    )

    url = (
        f"{API_BASE}/users/"
        f"{urllib.parse.quote(USERNAME)}"
        f"/repos"
        f"?type=all"
        f"&sort=updated"
    )

    return get_all_pages(url)


# ============================================================
# FIND REPOSITORIES WHERE YOU MADE COMMITS
# ============================================================

def get_collaboration_repositories():

    print(
        f"Searching commits by {USERNAME}..."
    )

    encoded_username = urllib.parse.quote(
        f"author:{USERNAME}"
    )

    repositories = {}

    for page in range(1, 11):

        url = (
            f"{API_BASE}/search/commits"
            f"?q={encoded_username}"
            f"&per_page=100"
            f"&page={page}"
        )

        try:
            data = github_get(url)

        except Exception as error:

            print(
                "Could not search commits:"
            )

            print(error)

            break

        items = data.get(
            "items",
            []
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

    return list(
        repositories.values()
    )


# ============================================================
# GET REPOSITORY DETAILS
# ============================================================

def get_repository_details(
    full_name
):

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

def get_languages(
    full_name
):

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

    except Exception:

        return []


# ============================================================
# CREATE PROJECT OBJECT
# ============================================================

def create_project(
    repository,
    project_type
):

    full_name = repository[
        "full_name"
    ]

    print(
        f"Processing: {full_name}"
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

    return {
        "id": details.get(
            "id"
        ),

        "name": details.get(
            "name"
        ),

        "full_name": details.get(
            "full_name"
        ),

        "description": details.get(
            "description"
        ),

        "html_url": details.get(
            "html_url"
        ),

        "owner": owner.get(
            "login"
        ),

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
    }


# ============================================================
# MAIN
# ============================================================

def main():

    print(
        "========================================"
    )

    print(
        "GitHub Portfolio Project Generator"
    )

    print(
        "========================================"
    )

    # --------------------------------------------------------
    # MY REPOSITORIES
    # --------------------------------------------------------

    my_repositories = (
        get_my_repositories()
    )

    print(
        f"Found {len(my_repositories)} "
        f"personal repositories."
    )

    my_repository_names = {
        repo["full_name"]
        for repo in my_repositories
    }

    projects = []

    # --------------------------------------------------------
    # ADD PERSONAL PROJECTS
    # --------------------------------------------------------

    for repository in my_repositories:

        # Skip forks from "My" projects
        # if you want only repositories you own.
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
                f"Could not process "
                f"{repository['full_name']}"
            )

            print(error)

    # --------------------------------------------------------
    # COLLABORATION REPOSITORIES
    # --------------------------------------------------------

    collaboration_repositories = (
        get_collaboration_repositories()
    )

    print(
        f"Found "
        f"{len(collaboration_repositories)} "
        f"repositories from your commits."
    )

    for repository in (
        collaboration_repositories
    ):

        full_name = repository.get(
            "full_name"
        )

        if not full_name:
            continue

        # Don't show your own repositories
        # as collaborations.
        if full_name in my_repository_names:
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
                f"Could not process "
                f"{full_name}"
            )

            print(error)

    # --------------------------------------------------------
    # REMOVE DUPLICATES
    # --------------------------------------------------------

    unique_projects = {}

    for project in projects:

        unique_projects[
            project["full_name"]
        ] = project

    projects = list(
        unique_projects.values()
    )

    # --------------------------------------------------------
    # SORT BY LAST UPDATED
    # --------------------------------------------------------

    projects.sort(
        key=lambda project:
            project.get(
                "updated_at"
            ) or "",
        reverse=True
    )

    personal_count = len([
        project
        for project in projects
        if project["projectType"]
        == "personal"
    ])

    collaboration_count = len([
        project
        for project in projects
        if project["projectType"]
        == "collaboration"
    ])

    # --------------------------------------------------------
    # CREATE OUTPUT
    # --------------------------------------------------------

    output = {

        "username": USERNAME,

        "updated_at":
            datetime.now(
                timezone.utc
            ).isoformat(),

        "total":
            len(projects),

        "personal":
            personal_count,

        "collaborations":
            collaboration_count,

        "projects":
            projects
    }

    # --------------------------------------------------------
    # WRITE JSON
    # --------------------------------------------------------

    os.makedirs(
        "public",
        exist_ok=True
    )

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

    print()
    print(
        "========================================"
    )

    print(
        "projects.json created successfully!"
    )

    print(
        f"Total: {len(projects)}"
    )

    print(
        f"Personal: {personal_count}"
    )

    print(
        f"Collaborations: "
        f"{collaboration_count}"
    )

    print(
        "========================================"
    )


if __name__ == "__main__":
    main()