#!/usr/bin/env sh
set -eu

repository_root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
hook="$repository_root/.husky/pre-push"
temp_root=$(mktemp -d)
fake_bin="$temp_root/bin"
mkdir -p "$fake_bin"
trap 'rm -rf "$temp_root"' EXIT HUP INT TERM

cat > "$fake_bin/pnpm" <<'EOF'
#!/usr/bin/env sh
printf '%s\n' "$*" >> "$VERIFY_LOG"
EOF
chmod +x "$fake_bin/pnpm"

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  exit 1
}

setup_repo() {
  repo="$temp_root/$1"
  verify_log="$temp_root/$1.verify.log"
  mkdir -p "$repo"
  git -C "$repo" init -q
  git -C "$repo" config user.name 'Pre-push test'
  git -C "$repo" config user.email 'pre-push@example.invalid'
  git -C "$repo" checkout -q -b main
  mkdir -p "$repo/src"
  printf 'base\n' > "$repo/README.md"
  printf 'export {}\n' > "$repo/src/base.ts"
  git -C "$repo" add README.md src/base.ts
  git -C "$repo" commit -q -m 'chore(test): base commit'
  base_oid=$(git -C "$repo" rev-parse HEAD)
  git -C "$repo" update-ref refs/remotes/origin/main "$base_oid"
  : > "$verify_log"
}

run_hook() {
  local_oid=$1
  remote_oid=$2
  printf 'refs/heads/feature %s refs/heads/feature %s\n' "$local_oid" "$remote_oid" |
    (cd "$repo" && PATH="$fake_bin:$PATH" VERIFY_LOG="$verify_log" sh "$hook")
}

assert_skipped() {
  [ ! -s "$verify_log" ] || fail "verification ran unexpectedly: $(cat "$verify_log")"
}

assert_verified() {
  grep -qx 'verify' "$verify_log" || fail 'expected pnpm verify to run'
}

# A committed documentation-only change has a clean worktree and should skip.
setup_repo docs-only
printf 'updated\n' > "$repo/README.md"
git -C "$repo" add README.md
git -C "$repo" commit -q -m 'docs(readme): update instructions'
run_hook "$(git -C "$repo" rev-parse HEAD)" "$base_oid"
assert_skipped

# A single committed source change must be detected even when the worktree is clean.
setup_repo code-change
printf 'export const value = 1\n' > "$repo/src/change.ts"
git -C "$repo" add src/change.ts
git -C "$repo" commit -q -m 'feat(app): add source file'
run_hook "$(git -C "$repo" rev-parse HEAD)" "$base_oid"
assert_verified

# A new branch must inspect its full origin/main range, not only its latest docs commit.
setup_repo new-branch-history
git -C "$repo" checkout -q -b feature/history
printf 'export const historical = true\n' > "$repo/src/historical.ts"
git -C "$repo" add src/historical.ts
git -C "$repo" commit -q -m 'feat(app): add historical source'
printf 'notes\n' > "$repo/CHANGELOG.md"
git -C "$repo" add CHANGELOG.md
git -C "$repo" commit -q -m 'docs(changelog): add notes'
zero_oid=0000000000000000000000000000000000000000
run_hook "$(git -C "$repo" rev-parse HEAD)" "$zero_oid"
assert_verified

# Every requested documentation, metadata, agent, and image path is skippable.
setup_repo ignored-paths
for path in \
  README.md docs/guide.txt LICENSE .changeset/release.json \
  .github/ISSUE_TEMPLATE/bug.yml .github/pull_request_template.md \
  .github/CODEOWNERS .github/dependabot.yml .github/labeler.yml \
  .vscode/settings.json .claude/settings.json .agents/agent.json \
  CLAUDE.md AGENTS.md public/diagram.png public/logo.svg public/photo.jpg; do
  mkdir -p "$repo/$(dirname -- "$path")"
  printf 'metadata\n' > "$repo/$path"
done
git -C "$repo" add .
git -C "$repo" commit -q -m 'docs(repo): update non-code files'
run_hook "$(git -C "$repo" rev-parse HEAD)" "$base_oid"
assert_skipped

# Workflow files are never in the ignored set.
setup_repo workflow-change
mkdir -p "$repo/.github/workflows"
printf 'name: CI\n' > "$repo/.github/workflows/ci.yml"
git -C "$repo" add .github/workflows/ci.yml
git -C "$repo" commit -q -m 'ci(workflows): update workflow'
run_hook "$(git -C "$repo" rev-parse HEAD)" "$base_oid"
assert_verified

# Branch deletion uses an all-zero local OID and skips verification.
setup_repo branch-delete
zero_oid=0000000000000000000000000000000000000000000000000000000000000000
run_hook "$zero_oid" "$base_oid"
assert_skipped

# If the remote range cannot be read, fail safe by running verification.
setup_repo invalid-range
printf 'docs\n' > "$repo/README.md"
git -C "$repo" add README.md
git -C "$repo" commit -q -m 'docs(readme): update'
run_hook "$(git -C "$repo" rev-parse HEAD)" invalid-remote-oid
assert_verified

printf 'Pre-push path-filter tests passed.\n'
