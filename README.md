<div align="center">

  <img src="src/client/src/assets/icons/mimir/mimirDarkLogo.png" alt="logo" width="250" height="auto" />
  <h1>Mímir</h1>
  
  <p>
    A tool that provides the creation of an asset-design based on the IMF language. 
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/mimir-org/mimir/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/mimir-org/typelibrary" alt="contributors" />
  </a>
  <a href="https://github.com/mimir-org/mimir/commits/main">
    <img src="https://img.shields.io/github/last-commit/mimir-org/typelibrary" alt="last update" />
  </a>
  <a href="https://github.com/mimir-org/mimir/issues/">
    <img src="https://img.shields.io/github/issues/mimir-org/typelibrary" alt="open issues" />
  </a>
  <a href="https://github.com/mimir-org/mimir/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mimir-org/typelibrary.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://github.com/mimir-org/mimir/issues">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/mimir-org/mimir/issues">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Design system](#art-design-system)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Running Locally](#running-running)
- [Usage](#eyes-usage)
- [Contributing](#wave-contributing)
  - [Code of Conduct](#scroll-code-of-conduct)
- [License](#warning-license)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://react-redux.js.org/">React Redux</a></li>
    <li><a href="https://redux-toolkit.js.org/">Redux Toolkit</a></li>
    <li><a href="https://reactflow.dev/">React Flow</a></li>
   <li><a href="https://redux-saga.js.org/">Redux-Saga</a></li>
    <li><a href="https://atomiks.github.io/tippyjs/">Tippy.js</a></li>
    <li><a href="https://styled-components.com/">styled-components</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://dotnet.microsoft.com/en-us/languages/csharp">C#</a></li>
    <li><a href="https://docs.microsoft.com/en-us/aspnet/core/">ASP.NET</a></li>
    <li><a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/">MSAL.NET</a></li>
    <li><a href="https://www.newtonsoft.com/json">Json.NET</a></li>    
    <li><a href="https://docs.microsoft.com/en-us/ef/">Entity Framework</a></li>
    <li><a href="https://automapper.org/">AutoMapper</a></li>
    <li><a href="https://xunit.net/">xUnit.NET</a></li>  
    <li><a href="https://github.com/domaindrivendev/Swashbuckle.AspNetCore">Swashbuckle</a></li>    
    <li><a href="https://github.com/pankleks/TypeScriptBuilder">TypeScriptBuilder</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.microsoft.com/en-us/sql-server/">MSSQL</a></li>
  </ul>
</details>

<details>
<summary>DevOps</summary>
  <ul>
    <li><a href="https://www.docker.com/">Docker</a></li>
    <li><a href="https://github.com/features/actions">Github Actions</a></li>
    <li><a href="https://www.terraform.io/">Terraform</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

Coming soon...

<!-- Design System -->

### :art: Design System

<a href="https://github.com/mimir-org/mimir/tree/main/src/client/src/compLibrary">Component library</a>

<!-- Env Variables -->

### :key: Environment Variables

#### Client

To run this project, you will need to add the following environment variables to your .env.local file

`REACT_APP_API_BASE_URL`

`REACT_APP_SOCKET_BASE_URL`

If you are running the server locally then the values will most likely be

```js
// where x and y = api version
REACT_APP_API_BASE_URL = http://localhost:5001/v{x}.{y}/
REACT_APP_SOCKET_BASE_URL = http://localhost:5001/
```

#### Server

To run this project, you will need to add the following environment variables to your .appsettings.local.json file inside the ModelBuilder.Api project

```json
{
  "DatabaseConfiguration": {
    "DataSource": "database source",
    "Port": "database port",
    "InitialCatalog": "database name",
    "DbUser": "username",
    "Password": "password"
  },
}
```

Here is an example of local file from a developer running the database in a docker container

```json
{
  "DatabaseConfiguration": {
    "DataSource": "localhost",
    "Port": 1433,
    "InitialCatalog": "ModelBuilder",
    "DbUser": "sa",
    "Password": "locallysourcedpassword"
  },
  
}
```

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses .NET 6 for the server and NPM as package manager for the client,
make sure that you have these installed before continuing.

Start by cloning the project

```git
git clone git@github.com:mimir-org/mimir.git
```

Navigate to the new directory

```bash
cd ./mimir
```

<!-- Running Locally -->

### :running: Running

|                       | Client                                 | Server                                              |
| --------------------- | -------------------------------------- | --------------------------------------------------- |
| :gear: Installation   | `cd src/client` <br /> `npm install`   | `cd src/service` <br /> `dotnet build`               |
| :running: Run Locally | `cd src/client` <br /> `npm run local` | `cd src/service/ModelBuilder.Api` <br /> `dotnet run` |

<!-- Usage -->

## :eyes: Usage

Coming soon...

<!-- Contributing -->

## :wave: Contributing

Coming soon...

<!-- Code of Conduct -->

### :scroll: Code of Conduct

Coming soon...

<!-- License -->

## :warning: License

Distributed under the MIT License. 

<!-- Contact -->

## :handshake: Contact

Mimir-org - orgmimir@gmail.com

Project Link: [https://github.com/mimir-org/mimir](https://github.com/mimir-org/mimir)

<!-- Acknowledgments -->

## :gem: Acknowledgements

Coming soon...

## 💅🏻 Code style

The project uses ESLint to enforce code style. This is governed by the .eslintrc.js file in client/.

To run linting checks against the codebase:

```bash
    npm run lint
```

Create react app integrates with ESLint, and will throw warnings/errors on build, if there are style warnings/errors.

### Vscode Eslint integration

If using vscode, use the ESLint (by Microsoft) extension to integrate ESLint check into vscode.

## 📏 Code formatting

The project uses Prettier to enforce code formatting. This is governed by the .prettierrc file in client/.

To format the codebase, run:

```bash
    npm run format
```

To check for formatting issues (dry-run), run:

```bash
    npm run format:check
```

### VScode Prettier extension

If using vscode, use the Prettier - Code formatter (by Prettier) extension to incorporate prettier into vscode. Additionally, you can configure code formatting when saving files via preferences:

1.  Ctrl + Shift + P to open vscode command prompt.
2.  Select "Preferences: Open Settings (JSON)"
3.  Set formatting on save to true:

          "editor.formatOnSave": true,
