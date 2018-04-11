yarn install --pure-lockfile

./node_modules/.bin/babel src -d dist
zip -r -X extension.zip dist images styles manifest.json popup.html
