# Backforge

backforge is templating tool for backend development. it generates express based template.

## execution

simply open a command prompt run a command with your package manager

    ```bash

        npx backforge
        #or
        yarn create backforge
        #or
        pnpx create backforge

    ```

It may ask few question in cmd and you get ready to use express template

## available options with commmand

    ```bash
        npx backforge #[options] following must allowed
        -js, --javascript #Initialize express app with typescript template
        --basic           #Initialize with basic template of express app
        --disable-git     #Skip initializing a git repository.
        -h, --help        #Display this help message.
    ```

## available templates

backforge currently offers two types of temlates.

    * basic
        - js
    * default
        - js
        - ts

### basic template

basic template contains following files and folder structure

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

default template comes with typescript as well as javascript in following structure:

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
