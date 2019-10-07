# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha

.IGNORE: clean-linux

main: dev

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

example-chmod:
	@echo "[INFO] Giving Permission"
	@chmod +x ./app/bin

example-get: dev example-chmod
	@echo "[INFO] Running Example"
	@./app/bin get example/version.json

example-major: dev example-chmod
	@echo "[INFO] Running Example"
	@./app/bin major example/version.json --spaces 4

example-minor: dev example-chmod
	@echo "[INFO] Running Example"
	@./app/bin minor example/version.json --spaces 4

example-patch: dev example-chmod
	@echo "[INFO] Running Example"
	@./app/bin patch example/version.json --spaces 4

example-auto: dev example-chmod
	@echo "[INFO] Running Example"
	@./app/bin auto example/version.json --spaces 4

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

license: clean
	@echo "[INFO] Sign files"
	@NODE_ENV=development $(ts_node) script/license.ts

clean: clean-linux
	@echo "[INFO] Cleaning release files"
	@NODE_ENV=development $(ts_node) script/clean-app.ts

clean-linux:
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist
	@rm -rf dist_script
	@rm -rf .nyc_output
	@rm -rf coverage

publish: install tests license build
	@echo "[INFO] Publishing package"
	@cd app && npm publish --access=public
