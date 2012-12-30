all: clean build test docs

build: install
	@component build -dv

install: component.json
	@component install -d

clean:
	@rm -rf build components

docs:
	@cat docs/head.md > Readme.md
	@dox --api < src/index.js >> Readme.md
	@cat docs/tail.md >> Readme.md

.PHONY: all build install clean docs
