---
name: create-github-pr
description: Use when the user asks to draft or create a GitHub pull request for a repository or branch, including preparing a PR or opening one.
license: MIT
---

# Create GitHub Pull Request

Prepare a reviewable pull request from the confirmed target repository and the complete intended branch changes.

## 1. Resolve the target and inspect changes

1. Resolve the base repository from an explicit GitHub URL or `[HOST/]OWNER/REPO` first. Otherwise use the current checkout's repository from `gh repo view --json nameWithOwner,url`, retaining the host for GitHub Enterprise, and inspect branch upstream/remotes when a fork may be involved. Ask if the intended base repository is ambiguous. Never assume a remote is named `origin`.
2. Resolve the base branch from an explicit user choice, then the current branch's `gh-merge-base` configuration, then the base repository's default branch from GitHub metadata. Match it to an available local or remote-tracking ref. If the base ref is unavailable, ask before fetching or choosing a different ref.
3. Inspect the branch and all local change states:

   ```sh
   git status --short --branch
   git log "<base-ref>"...HEAD --oneline
   git diff "<base-ref>"...HEAD
   git diff --cached
   git diff
   git ls-files --others --exclude-standard
   ```

4. For a draft, base the proposed PR on the committed branch diff. Report staged, unstaged, and untracked paths separately; inspect contents of untracked files only when the user identifies them as intended, and ask before including any local changes. Never claim the draft covers uncommitted changes that were not inspected.
5. For creation, continue only when every intended change is committed and the worktree has no staged, unstaged, or untracked changes. If it is dirty, show the affected paths and stop before pushing or creating; the user can commit them or authorize a specific action. Never stage, commit, amend, rebase, discard, or force-push changes on the user's behalf.

_Completion criterion_: The target repository, base ref, committed diff, and intended-change boundary are verified. Creation also requires a clean worktree.

## 2. Discover repository policy and checks

1. Read only present instructions that apply to the target and changed paths, including `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and release guidance. Inspect repository instructions at the root and along affected paths.
2. Follow a release-note or versioning mechanism only when repository guidance or configuration establishes it. For example, require a Changesets entry only when the target repository uses and documents Changesets; an absent `.changeset/` directory is not itself a failure.
3. Run checks only when the user requests verification. When requested, discover commands from applicable repository guidance and configuration, then report each command and its actual result. If no applicable command can be identified, say verification is unavailable. When not requested, report checks as not requested; do not assume local hooks or CI have run.

_Completion criterion_: Applicable repository policy is identified; any release metadata follows that policy; check status is recorded as actual results, unavailable, or not requested.

## 3. Draft the title and body

1. Find the PR template in GitHub-supported locations: the repository root, `docs/`, or `.github/`, including `pull_request_template.md` and `PULL_REQUEST_TEMPLATE/` directories with supported `.md` or `.txt` files. Follow an explicit repository instruction. If several templates could apply and no default is declared, ask which one to use; never combine them. See [GitHub PR template guidance](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository).
2. If no template applies, use concise sections for Summary, Changes, and Verification.
3. Follow the repository's title convention when documented; otherwise use a concise imperative title.
4. Summarize the verified committed diff and why it changed. Link issues only with verified numbers. Preserve template fields and order, and mark checkboxes only when evidence supports them. State checks as requested/not requested, unavailable, or with actual results.

_Completion criterion_: The title and body accurately describe the committed diff and satisfy the selected template or fallback.

## 4. Draft or create

- **Draft-only:** For requests to prepare or review a PR, present the title, body, and check status. Do not push or create.
- **Create:** Run `gh pr create` only when the user explicitly asks to open or create the PR and the worktree is clean. Resolve the base repository separately from the head repository: a verified fork may be the head while its upstream is the base. Verify the branch's configured upstream or another explicitly selected head remote; if the branch is unpushed, push only to that verified remote. Stop if the intended head remote, base, or required access is unclear. Pass the confirmed base repository and branch, reviewed title, exact reviewed body, and verified head owner/branch (using `--head` when it differs from the base). Do not allow an interactive CLI prompt to create a fork the user did not request. If GitHub CLI cannot represent the verified head, stop and provide the web submission route. Add draft mode, reviewers, labels, milestones, or projects only when requested and verified.
- On push or CLI failure, report the error and preserve the complete draft for manual submission.

_Completion criterion_: Return the live PR URL, or return the complete draft and exact blocker before push or creation.
