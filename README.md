# Backforge

**Backforge** is a templating tool designed for backend development, specifically for generating Express-based templates.

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

## Command options

```bash
    npx backforge #[options] following must allowed
        -js, --javascript #Initialize express app with typescript template
        --basic           #Initialize with basic template of express app
        --disable-git     #Skip initializing a git repository.
        -h, --help        #Display this help message.
```

## available templates

Backforge currently offers two types of templates:

* basic
    - js

* default
    - js
    - ts

### basic template

The basic template includes the following file and folder structure:

    /template
    |
    |- /configs
    |  |- index.js(blank)
    |  :
    |- /controllers
    |  |- test.controller.js
    |  :
    |- /middleware
    |  |- security.middleware.js
    |  :
    |- /models
    |  |- test.model.js
    |  :
    |- /routes
    |  |- index.js
    |  |- test.route.js
    |  :
    |- /utils
    |  |- utils.js(blank)
    |  :
    |- app.js
    |- index.js
    :
    :

### default template

The default template is available in both TypeScript and JavaScript and includes the following structure:

    /default
    |
    |- /configs
    |  |- error.ts
    |  :
    |- /middleware
    |  |- security.middleware.ts
    |  :
    |- /modules
    |   |- /users
    |   |  |- user.controller.ts
    |   |  |- user.model.ts
    |   |  |- user.route.ts
    |   |  |- user.service.ts
    |   |  |- user.validator.ts
    |   :
    |- /routes
    |  |- index.ts
    |  :
    |- /types
    |  |- response.type.ts
    |  :
    |- /utils
    |  |- catchAsync.ts
    |  |- sendResponse.ts
    |  :
    |- app.ts
    |- index.ts
    :
    :
