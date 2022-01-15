run:
	npx concurrently "tsc -w &&" "browser-sync start -s ./dist"

git-clean:
	git rm -r --cached .

clean:
	rm -rf dist

build: clean
	tsc && cp ./src/index.html ./dist  \
	&& cp ./src/main.css ./dist \
	&& cp -r ./src/images ./dist \

deploy: build
	git subtree push --prefix="dist"  origin gh-pages