# Sudoo-Version

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-Version/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-Version/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Version/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Version)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fversion.svg)](https://badge.fury.io/js/%40sudoo%2Fversion)
[![downloads](https://img.shields.io/npm/dm/@sudoo/version.svg)](https://www.npmjs.com/package/@sudoo/version)

Version Number Controller

## Install

Install globally

```sh
yarn global add @sudoo/version
# Or
npm install @sudoo/version -g
```

Install in project scope

```sh
yarn add @sudoo/version --dev
# Or
npm install @sudoo/version --save-dev
```

## Config

Add the following file to your project folder.

```json
{
    "version": "1.0.0"
}
```

Add next version indicator if `auto update` feature is used.

```json
{
    "version": "1.0.0",
    "next": "major"
}
```

## Usage

Run the following script to get your version config file updated.

Note: change `version` command to `npx version` or `./node_modules/.bin/version` if you installed the `@sudoo/version` package in project scope.

```makefile
get:
	version get example/version.json

major:
	version major example/version.json

minor:
	version minor example/version.json

patch:
	version patch example/version.json

auto:
	version auto example/version.json
```
