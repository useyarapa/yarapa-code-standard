---
name: create-github-issue
description: Use when the user asks to draft or create a GitHub issue for a repository, including reporting a bug, requesting a feature, or filing an issue.
license: MIT
---

# Create GitHub Issue

Draft and file issues against the confirmed GitHub repository, following its applicable reporting policy and template.

## 1. Resolve the repository and route

1. Resolve the target from an explicit GitHub URL or `[HOST/]OWNER/REPO` first. Otherwise use the current checkout's repository from `gh repo view --json nameWithOwner,url`, retaining the host for GitHub Enterprise; if unavailable, inspect all Git remotes and use one only when it identifies a single unambiguous GitHub repository. Never assume the remote is named `origin`. Ask when the target cannot be confirmed.
2. Read the target repository's applicable instructions and reporting guidance when present, including root or path-scoped `AGENTS.md` / `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, and linked reporting documents. Check supported root, `docs/`, and `.github/` locations. Treat absent files as absent; do not make their presence a prerequisite.
3. Find issue templates in GitHub-supported locations: the repository root, `docs/`, or `.github/`, including `.github/ISSUE_TEMPLATE/` and Markdown (`.md`) or YAML (`.yml`) issue forms. GitHub's normal template chooser uses `.github/ISSUE_TEMPLATE/`; templates in root or `docs/ISSUE_TEMPLATE/` may be selected through a template URL. Follow an explicit repository instruction. If more than one template could apply and no default is declared, ask which one to use. Use an organization default community-health template only when GitHub makes it visible and applicable to this repository. See [GitHub issue template guidance](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates) and [issue creation](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue).
4. Classify the request:
   - **Bug / feature:** use the matching template, or a concise Problem, Evidence, Expected Behavior structure when none exists.
   - **Security:** use a verified private vulnerability-reporting route from the repository policy or GitHub Security page. Never include vulnerability details in a public issue. If no private route is available, stop the vulnerability report and tell the user GitHub's fallback is a separate public issue asking only for a security contact; prepare or create that contact-only issue only if the user explicitly chooses it. See [GitHub's private reporting guidance](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/report-privately).
   - **Support / discussion:** use the repository's designated support channel. If none is documented, stop and ask the user where to route it.
5. If the request does not clearly map to one route or template, ask one focused question before drafting.

_Completion criterion_: The GitHub repository is confirmed and the request has a valid route: a selected issue template or ordinary-issue fallback, a verified private security route, or a documented support destination. If no safe route exists, stop with the missing information identified.

## 2. Draft

1. Follow the repository's title convention when one is documented; otherwise write a concise, outcome-oriented title.
2. Preserve every selected template heading, required field, option, and order. For YAML issue forms, capture every required response and choose only declared options. If a CLI submission cannot preserve the form, prepare the response for the repository's web form instead of flattening or omitting fields.
3. Use only verified evidence from repository inspection, command output, or user-provided traces. Ask for required details that cannot be established.
4. Remove credentials, tokens, personal identifiers, private URLs, and proprietary source snippets. Mark checklist items complete only when evidence supports them; remove placeholders and examples.

_Completion criterion_: The reviewed title and body fill the selected template or fallback, with every required field supported by verified evidence and sensitive material removed.

## 3. Draft or create

- **Draft-only:** For requests to prepare, review, or draft, show the final title and body and identify the template or fallback used. Do not run a creation command.
- **Create:** Run `gh issue create` only when the user explicitly asks to create or submit. Pass the confirmed repository, reviewed title, and exact reviewed body. Add labels, assignees, milestones, or projects only when requested and verified to exist. For a web-only issue form, provide its submission link and completed field values instead of creating a malformed issue.
- On command failure, report the error and keep the complete draft available for manual submission.

_Completion criterion_: Return the created issue URL, or return the complete draft and the exact blocker to submission.
