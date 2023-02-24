npx create-react-app blackbird-virtual-swe
gh repo create blackbird-virtual-swe --private --source=. --remote=upstream
git checkout -b update_logo
git commit -m "Change logo and link"
git push origin update_logo
gh pr create --title "Logo and link change" --body "Changed the logo and link"
git checkout main
gh pr merge 1
# REPO_URL https://github.com/Ay-slim/blackbird-virtual-swe