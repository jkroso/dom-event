
test/built.js: src/* test/*
	@node_modules/.bin/sourcegraph.js test/browser.js \
		--plugins mocha,nodeish,javascript \
		| node_modules/.bin/bigfile \
		 	--export null \
		 	--plugins nodeish,javascript > test/built.js

Readme.md: docs/* src/*
	@cat docs/head.md > $@
	@dox --api < src/index.js >> $@
	@cat docs/tail.md >> $@
