import os
import dulwich.porcelain as git

repo_path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
print(f"Working in repository: {repo_path}")

try:
    if not os.path.exists(os.path.join(repo_path, ".git")):
        repo = git.init(repo_path)
        print("Initialized new Git repository.")
    else:
        repo = git.Repo(repo_path)
        print("Found existing Git repository.")

    git.add(repo_path)
    commit_id = git.commit(
        repo_path, 
        message=b"Initial commit: BloodConnect 3D - Next-Gen 3D Blood Donation Platform (Hyderabad)",
        committer=b"BloodConnect Admin <admin@bloodconnect.org>",
        author=b"BloodConnect Admin <admin@bloodconnect.org>"
    )
    print(f"Successfully committed codebase with commit ID: {commit_id.decode() if isinstance(commit_id, bytes) else commit_id}")

except Exception as e:
    print(f"Error during commit: {e}")
