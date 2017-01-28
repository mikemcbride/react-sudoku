git commit -am "save local changes"
git checkout -B gh-pages
git add -f build
git commit -am "rebuild website"
git filter-branch -f --prune-empty --subdirectory-filter build
git push -f origin gh-pages
git checkout -
