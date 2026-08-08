import json
import os
import urllib.parse
import urllib.request

USERNAME = os.environ["GITHUB_USERNAME"]
TOKEN = os.environ["GITHUB_TOKEN"]

API_BASE = "https://api.github.com"

HEADERS = {
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {TOKEN}",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-project-generator",
}


def github_get(url):
    request = urllib.request.Request(
        url,
        headers=HEADERS
    )

    with urllib.request.urlopen(request) as response:
        return json.loads(response.read().decode())


def get_all_pages(url):
    results = []
    page = 1

    while True:
        separator = "&" if "?" in url else "?"

        data = github_get(
            f"{url}{separator}per_page=100&page={page}"
        )

        if not data:
            break

        results.extend(data)

        if len(data) < 100:
            break

        page += 1

    return results


def get_owned_repositories():
    print("Fetching owned repositories...")

    url = (
        f"{API_BASE}/user/repos"
        "?affiliation=owner"
        "&visibility=all"
        "&sort=updated"
    )

    return get_all_pages(url)


def get_contributed_repositories():
    print("Searching repositories where you contributed...")

    repositories = {}

    # Search commits authored by your GitHub username.
    encoded_query = urllib.parse.quote(
        f"author:{USERNAME}"
    )

    page = 1

    while page <= 10:
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
                "Commit search stopped:",
                error
            )
            break

        items = data.get("items", [])

        if not items:
            break

        for item in items:
            repository = item.get("repository")

            if repository:
                full_name = repository.get(
                    "full_name"
                )

                if full_name:
                    repositories[full_name] = repository

        if len(items) < 100:
            break

        page += 1

    return list(repositories.values())


def get_repository_details(full_name):
    print(
        f"Fetching repository details: {full_name}"
    )

    encoded_name = urllib.parse.quote(
        full_name,
        safe="/"
    )

    url = (
        f"{API_BASE}/repos/{encoded_name}"
    )

    return github_get(url)


def get_languages(full_name):
    encoded_name = urllib.parse.quote(
        full_name,
        safe="/"
    )

    url = (
        f"{API_BASE}/repos/"
        f"{encoded_name}/languages"
    )

    try:
        data = github_get(url)
        return list(data.keys())
    except Exception:
        return []


def create_project(repo, project_type):
    full_name = repo["full_name"]

    details = get_repository_details(
        full_name
    )

    languages = get_languages(
        full_name
    )

    owner = details.get("owner", {})

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
        "default_branch": details.get(
            "default_branch"
        ),
    }


def main():
    owned_repos = get_owned_repositories()

    owned_names = {
        repo["full_name"]
        for repo in owned_repos
    }

    contributed_repos = (
        get_contributed_repositories()
    )

    projects = []

    # =====================================================
    # MY PROJECTS
    # =====================================================

    for repo in owned_repos:
        try:
            project = create_project(
                repo,
                "personal"
            )

            projects.append(project)

        except Exception as error:
            print(
                f"Skipping {repo['full_name']}:",
                error
            )

    # =====================================================
    # COLLABORATION PROJECTS
    # =====================================================

    for repo in contributed_repos:
        full_name = repo["full_name"]

        # Don't classify your own repositories
        # as collaborations.
        if full_name in owned_names:
            continue

        try:
            project = create_project(
                repo,
                "collaboration"
            )

            projects.append(project)

        except Exception as error:
            print(
                f"Skipping {full_name}:",
                error
            )

    # =====================================================
    # REMOVE DUPLICATES
    # =====================================================

    unique_projects = {}

    for project in projects:
        unique_projects[
            project["full_name"]
        ] = project

    projects = list(
        unique_projects.values()
    )

    # Newest repositories first
    projects.sort(
        key=lambda project:
            project.get(
                "updated_at"
            ) or "",
        reverse=True
    )

    output = {
        "username": USERNAME,
        "updated_at": __import__(
            "datetime"
        ).datetime.now(
            __import__(
                "datetime"
            ).timezone.utc
        ).isoformat(),
        "total": len(projects),
        "personal": len([
            p for p in projects
            if p["projectType"] == "personal"
        ]),
        "collaborations": len([
            p for p in projects
            if p["projectType"] == "collaboration"
        ]),
        "projects": projects,
    }

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
        "===================================="
    )
    print(
        f"Total projects: {len(projects)}"
    )
    print(
        f"Personal: {output['personal']}"
    )
    print(
        f"Collaborations: "
        f"{output['collaborations']}"
    )
    print(
        "===================================="
    )


if __name__ == "__main__":
    main()