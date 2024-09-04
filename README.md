# Backforge

**Backforge** is a templating tool designed for backend development, specifically for generating Express-based templates.

<a href="https://www.npmjs.com/package/backforge">
  <img src="https://img.shields.io/npm/v/backforge?style=for-the-badge" alt="npm version" />
</a>
<a href="https://www.npmjs.com/package/backforge">
  <img src="https://img.shields.io/npm/dm/backforge?style=for-the-badge" alt="npm downloads" />
</a>
<a href="https://github.com/Saifkhan-rkp/backforge/issues">
  <img src="https://img.shields.io/github/issues-raw/Saifkhan-rkp/backforge?style=for-the-badge" alt="issues" />
</a>
<img src="https://img.shields.io/github/issues-closed-raw/Saifkhan-rkp/backforge?style=for-the-badge" />
<img src="https://img.shields.io/github/license/Saifkhan-rkp/backforge?style=for-the-badge" />
<img src="https://img.shields.io/github/issues-pr-raw/Saifkhan-rkp/backforge?style=for-the-badge" />
<img src="https://img.shields.io/github/issues-pr-closed-raw/Saifkhan-rkp/backforge?style=for-the-badge" />
<img src="https://img.shields.io/github/forks/Saifkhan-rkp/backforge?style=for-the-badge" />
<img src="https://img.shields.io/github/contributors/Saifkhan-rkp/backforge?style=for-the-badge" />

## Getting Started

To get started with Backforge, open your command prompt and run one of the following commands using your preferred package manager:

```bash

    npx backforge
    #or
    yarn create backforge
    #or
    pnpx create backforge

```
After running the command, you may be prompted to answer a few questions in the terminal. Once completed, you'll have a ready-to-use Express template.

### Module generation

Introducing new feature, **Module Creation**. This feature allows you to easily generate JavaScript and TypeScript modules with built-in CRUD operations and their corresponding routes. 

#### How to Use

To create a module, run the following command from your project directory:

```bash
    npx backforge -m <module-name>
    #or if you have specific destination for modules
    npx backforge -m <module-name> -d <destination>
```
#### Naming Constraints 

Please note that module names must adhere to the following rules: 
* The module name must not start with a number. 
* The module name must not contain any symbols
* The destination is in path format(ex. path/to/modules)

## Command options

```text
    Usage: backforge [project-directory] [options]

    Options:
    -v, --version               Output the current version of backforge.
    -m, --module <module-name>  Creates a module for default express template of backforge
    -d, --dest <destination>    Destination path for module creation note: it does not work app generation
    -js, --javascript           Initialize express app with javascript template
    --basic                     Initialize with basic template of express app
    --disable-git               Skip initializing a git repository.
    -h, --help                  Display this help message.
```

## Available templates

Backforge currently offers two types of templates:

- basic
  - js

- default
  - js
  - ts

### basic template

The basic template includes the following file and folder structure:

    basic
    |
    ├── configs
    |   ├── index.js(blank)
    |   :
    ├── controllers
    |   ├── test.controller.js
    |   :
    ├── middleware
    |   ├── security.middleware.js
    |   :
    ├── models
    |   ├── test.model.js
    |   :
    ├── routes
    |   ├── index.js
    |   ├── test.route.js
    |   :
    ├── utils
    |   ├── utils.js(blank)
    |   :
    ├── app.js
    ├── index.js
    :
    :

### default template

The default template is available in both TypeScript and JavaScript and includes the following structure:

    default
    |
    ├── configs
    |   ├── error.ts
    |   :
    ├── middleware
    |   ├── security.middleware.ts
    |   :
    ├── modules
    |   ├── users
    |   |   ├──user.controller.ts
    |   |   ├──user.model.ts
    |   |   ├──user.route.ts
    |   |   ├──user.service.ts
    |   |   └──user.validator.ts
    |   :
    ├── routes
    |   ├── index.ts
    |   :
    ├── types
    |   ├── response.type.ts
    |   :
    ├── utils
    |   ├── catchAsync.ts
    |   ├── sendResponse.ts
    |   :
    ├── app.ts
    ├── index.ts
    :
    :
