<div align="center">

  <img src="src/client/src/assets/icons/mimir/mimirDarkLogo.png" alt="logo" width="200" height="auto" />
  <h1>Mimir</h1>
  
  <p>
    A tool for building semantically supported facility data!
  </p>

<!-- Badges -->
<p>
<a href="https://github.com/mimir-org/mimir/actions/workflows/main.yaml">
    <img src="https://github.com/mimir-org/mimir/actions/workflows/prod.yaml/badge.svg?branch=main" alt="build status" />
  </a>

  <a href="https://github.com/mimir-org/mimir/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/mimir-org/mimir" alt="contributors" />
  </a>
  
  <a href="https://github.com/mimir-org/mimir/commits/main">
    <img src="https://img.shields.io/github/last-commit/mimir-org/mimir" alt="last update" />
  </a>

  <a href="https://github.com/mimir-org/mimir/issues/">
    <img src="https://img.shields.io/github/issues/mimir-org/mimir" alt="open issues" />
  </a>

  <a href="https://github.com/mimir-org/mimir/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mimir-org/mimir.svg" alt="license" />
  </a>

  <a href="https://github.com/mimir-org/mimir/releases">
  <img src="https://img.shields.io/github/v/release/mimir-org/mimir" alt="releases">
  </a>

  <a href="https://hub.docker.com/repository/docker/mimirorg/mimir-client">
  <img alt="Docker client version" src="https://img.shields.io/docker/v/mimirorg/mimir-client?label=docker%20client%20version">
  </a>

  <a href="https://hub.docker.com/repository/docker/mimirorg/mimir-client">
  <img alt="Docker server version" src="https://img.shields.io/docker/v/mimirorg/mimir-server?label=docker%20server%20version">
  </a>
</p>

  <h4>
    <a href="https://github.com/mimir-org/mimir/issues">Report a bug or register a feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Tech Stack](#space_invader-tech-stack)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Running Locally](#running-running)
- [Contributing](#wave-contributing)
  - [Code of Conduct](#scroll-code-of-conduct)
- [License](#warning-license)
- [Contact](#handshake-contact)

<!-- About the Project -->

## :star2: About the Project

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://reactrouterdotcom.fly.dev/">React Router</a></li>
    <li><a href="https://react-hook-form.com/">React Redux</a></li>
    <li><a href="https://styled-components.com/">styled-components</a></li>
    <li><a href="https://reactflow.dev/">React Flow</a></li>
    <li><a href="https://styled-icons.dev/">styled-icons</a></li>
    <li><a href="https://threejs.org/">three.js</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://dotnet.microsoft.com/en-us/languages/csharp">C#</a></li>
    <li><a href="https://docs.microsoft.com/en-us/aspnet/core/">ASP.NET</a></li>
    <li><a href="https://www.newtonsoft.com/json">Json.NET</a></li>    
    <li><a href="https://docs.microsoft.com/en-us/ef/">Entity Framework</a></li>
    <li><a href="https://automapper.org/">AutoMapper</a></li>
    <li><a href="https://xunit.net/">xUnit.NET</a></li>  
    <li><a href="https://github.com/domaindrivendev/Swashbuckle.AspNetCore">Swashbuckle</a></li>    
    <li><a href="https://github.com/moq/moq4">Moq</a></li>
    <li><a href="https://github.com/pankleks/TypeScriptBuilder">TypeScriptBuilder</a></li>
    <li><a href="https://dotnetrdf.org/">dotNetRDF</a></li>
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
    <li><a href="https://www.nuget.org/">NuGet</a></li>
    <li><a href="https://github.com/features/actions">Github Actions</a></li>
    <li><a href="https://www.npmjs.com/">NPM</a></li>
  </ul>
</details>

<!-- Env Variables -->

### :key: Environment Variables

<!-- Client environment variables -->
<details>
<summary>Client</summary>

To set environment variables for client in development, edit the .env file. For production build, you have to set the environment variables into the container itself. You can override the .env with a .env.local file. This file is not included in git repo.

`REACT_APP_API_BASE_URL` - Url to backend server

`REACT_APP_SOCKET_BASE_URL` - Url to backend server used with websocket connection

`REACT_APP_APP_ID` - Application id of server app registration in Azure AD

`REACT_APP_CLIENT_ID` - Application id of client app registration in Azure AD

`REACT_APP_TENANT_ID` - Azure tenant

`REACT_APP_MIMIR_VERSION` - The Mimir version number

`REACT_APP_APP_INSIGHTS_CONNECTION_STRING` - Application insight connection string

`REACT_APP_SILENT` - Turn off MSAL connection

If you are running the server locally then the values will most likely be

```js
// where x and y = api version
REACT_APP_API_BASE_URL = http://localhost:5001/v{x}.{y}/
REACT_APP_SOCKET_BASE_URL = http://localhost:5001/
REACT_APP_APP_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_CLIENT_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_TENANT_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_MIMIR_VERSION = 2.0
REACT_APP_APP_INSIGHTS_CONNECTION_STRING = InstrumentationKey=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx;...
REACT_APP_SILENT = false
```

</details>

<!-- Server environment variables -->
<details>
<summary>Server</summary>

To set environment variables for server in development, edit the appsettings.json file. For production build, you have to set the environment variables into the application container itself. You can override the appsettings.json with a appsettings.local.json file. This file is not included in git repo.

`ASPNETCORE_ENVIRONMENT` - Set .NET core environment

`ApplicationSetting__CollaborationPartner__Name` - Name of default collaboration partner ex. Mimirorg

`ApplicationSetting__CollaborationPartner__Domain` - Domain of default collaboration partner ex. mimirorg.com

`ApplicationSetting__CollaborationPartner__Iris__0` - RDF domain of collaboration partner, e.g. rdf.mimirorg.com

`ApplicationSetting__TypeLibraryRootUri` - The root uri to Type Library

`ApplicationSetting__TypeLibraryVersion` - The version used by Type Library

`ApplicationSetting__TypeLibrarySecret` - The secret registered in Type Library. Used to identify and registered hooks

`ApplicationSetting__TypeLibraryDomain` - The type library domain

`AzureActiveDirectoryConfiguration__TenantId` - Azure tenant

`AzureActiveDirectoryConfiguration__ClientId` - Application id of Server application in Azure AD (app registration)

`AzureActiveDirectoryConfiguration__Silent` - Set authentication and authorisation in silent demo mode

`CorsConfiguration__ValidOrigins` - Comma separated string of valid origins for CORS. E.g. http://localhost:3000,https://mimirorg.com

`DatabaseConfiguration__DataSource` - Identifier for database server

`DatabaseConfiguration__Port` - Port of database server. E.g. 1443

`DatabaseConfiguration__InitialCatalog` - Database name

`DatabaseConfiguration__DbUser` - Server application database username, must be db owner on given catalog

`DatabaseConfiguration__Password` - Server application database password

</details>

<!-- Getting Started -->

## :floppy_disk: Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses .NET 6 for the server and NPM as package manager for the client,
make sure that you have these installed before continuing. Mimir has dependency on Type Library Service, so you also need to clone that project for development purposes.
Clone that project as well if not running on external server. You also need a MSSQL database running on your machine. See docker-compose for running sql in docker.

### Git clone and Docker setup

We recomend that you first create a folder 'Mimirorg' and move into that folder:

```bash
..\Mimirorg
```

Then you clone Mimir:

```git
git clone git@github.com:mimir-org/mimir.git
```

And then you clone typelibrary (Tyle):

```git
git clone git@github.com:mimir-org/typelibrary.git
```

You now have two new folders inside the 'Mimiorg' folder.

```bash
..\Mimirorg\mimir
..\Mimirorg\typelibrary
```

In this setup we use docker and a docker-compose script. Create a new file at the root of the 'Mimirorg' folder and name it 'docker-compose.yaml'. Copy & paste this content into the file:

```bash
version: "3.8"

services:

   tyle-client:
    build: ./typelibrary/src/client
    hostname: 'tyleclient'
    container_name: tyleclient
    ports:
      - "3001:80"
    environment:
      - TYPELIBRARY_ENV_API_BASE_URL=http://localhost:5001/v1.0/
    networks:
      - type_library_network

   mimir-client:
    build:
     context: ./mimir/src/client
     args:
      - MIMIR_VERSION=2.5.0
    hostname: 'mimirclient'
    container_name: mimirclient
    ports:
     - "3000:80"
    environment:
     - MIMIR_ENV_API_BASE_URL=http://localhost:5000/v1.0/
     - MIMIR_ENV_SOCKET_BASE_URL=http://localhost:5000/
     - MIMIR_ENV_APP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     - MIMIR_ENV_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     - MIMIR_ENV_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     - MIMIR_ENV_APP_INSIGHTS_CONNECTION_STRING=InstrumentationKey=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx;IngestionEndpoint=https://xxxx.applicationinsights.azure.com/
     - MIMIR_ENV_SILENT=false
    networks:
     - type_library_network

   tyle-server:
    build: ./typelibrary/src/server
    hostname: 'tyleserver'
    container_name: tyleserver
    ports:
      - "5001:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - DatabaseConfiguration__DataSource=mssql
      - DatabaseConfiguration__Port=1433
      - DatabaseConfiguration__InitialCatalog=TypeLibrary
      - DatabaseConfiguration__DbUser=sa
      - DatabaseConfiguration__Password=P4ssw0rd1
      - MimirorgAuthSettings__DatabaseConfiguration__DataSource=mssql
      - MimirorgAuthSettings__DatabaseConfiguration__Port=1433
      - MimirorgAuthSettings__DatabaseConfiguration__InitialCatalog=MimirorgAuthentication
      - MimirorgAuthSettings__DatabaseConfiguration__DbUser=sa
      - MimirorgAuthSettings__DatabaseConfiguration__Password=P4ssw0rd1
      - ApplicationSettings__ApplicationSemanticUrl=http://localhost:5001/v1/ont
      - ApplicationSettings__ApplicationUrl=http://localhost:5001
      - CorsConfiguration__ValidOrigins=http://localhost:3001
    networks:
      - type_library_network
    depends_on:
      - mssql

   mimir-server:
    build: ./mimir/src/service
    hostname: 'mimirserver'
    container_name: mimirserver
    ports:
      - "5000:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - DatabaseConfiguration__DataSource=mssql
      - DatabaseConfiguration__Port=1433
      - DatabaseConfiguration__InitialCatalog=ModelBuilder
      - DatabaseConfiguration__DbUser=sa
      - DatabaseConfiguration__Password=P4ssw0rd1
      - AzureActiveDirectoryConfiguration__TenantId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      - AzureActiveDirectoryConfiguration__ClientId=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      - AzureActiveDirectoryConfiguration__Silent=false
      - CorsConfiguration__ValidOrigins=http://localhost:3000
      - ApplicationSetting__TypeLibraryRootUri=http://tyleserver/
      - ApplicationSetting__TypeLibraryVersion=v1
      - ApplicationSetting__TypeLibrarySecret=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      - ApplicationSetting__TypeLibraryDomain=runir.net
    networks:
      - type_library_network
    depends_on:
      - mssql

   mssql:
    image: "mcr.microsoft.com/mssql/server:2017-CU8-ubuntu"
    hostname: 'mssql'
    container_name: mssql
    ports:
      - '127.0.0.1:1433:1433'
    volumes:
      - mssql:/var/opt/mssql
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=P4ssw0rd1
      - MSSQL_PID=Standard
    networks:
      - type_library_network
    restart: unless-stopped

volumes:
  mssql:
    driver: local

networks:
  type_library_network:
    driver: bridge

```

To keep it simple in this example we use db user: 'sa' and db passord: 'P4ssw0rd1'. You can change this to your liking. The 'Mimirorg' folder should now look like this:

```bash
..\Mimirorg\mimir
..\Mimirorg\typelibrary
..\Mimirorg\docker-compose.yaml
```

To spool up everything in docker use this command when standing in the 'Mimirorg' folder:

```bash
docker compose up -d --build
```

If you now run this command:

```bash
docker ps -a
```

You should see all your docker images:

```bash
CONTAINER ID   IMAGE                                            COMMAND                   CREATED         STATUS         PORTS                           NAMES
b89d794be253   mimirorg_mimir-server                            "dotnet ModelBuilder…"    9 seconds ago   Up 7 seconds   443/tcp, 0.0.0.0:5000->80/tcp   mimirserver
84e7600fdcf9   mimirorg_tyle-server                             "dotnet TypeLibrary.…"    9 seconds ago   Up 7 seconds   443/tcp, 0.0.0.0:5001->80/tcp   tyleserver
ed558855c314   mimirorg_mimir-client                            "/bin/sh -c '\"./star…"   9 seconds ago   Up 7 seconds   0.0.0.0:3000->80/tcp            mimirclient
42d843407f0d   mimirorg_tyle-client                             "/bin/sh -c '\"./star…"   9 seconds ago   Up 7 seconds   0.0.0.0:3001->80/tcp            tyleclient
d914b6d4d538   mcr.microsoft.com/mssql/server:2017-CU8-ubuntu   "/opt/mssql/bin/sqls…"    9 seconds ago   Up 7 seconds   127.0.0.1:1433->1433/tcp        mssql
```

<!-- Running Locally -->

### :running: Running Locally

|                       | Client                               | Server                                               |
| --------------------- | ------------------------------------ | ---------------------------------------------------- |
| :gear: Installation   | `cd src/client` <br /> `npm install` | `cd src/server` <br /> `dotnet build`                |
| :running: Run Locally | `cd src/client` <br /> `npm start`   | `cd src/server/ModelBuilder.Api` <br /> `dotnet run` |

<!-- Contributing -->

## :wave: Contributing

We welcome community pull requests for bug fixes, enhancements, and documentation. See [How to contribute](./Contribute.md) for more information.

<!-- Architecture sketches overall -->

## :department_store: Architecture

Architecture sketches overall. See [Mimir overall](https://github.com/mimir-org/documents/blob/main/architecture/mimir_architecture_overall.pdf) for more information.

<!-- Code of Conduct -->

### :scroll: Code of Conduct

This project has adopted the code of conduct defined by the Contributor Covenant to clarify expected behavior in our community. For more information, see the [.NET Foundation Code of Conduct](https://dotnetfoundation.org/about/code-of-conduct).

<!-- License -->

## :warning: License

Distributed under the MIT License. See [LICENSE](./LICENSE.txt) for more information.

<!-- Contact -->

## :handshake: Contact

Mimir-org - orgmimir@gmail.com

Project Link: [https://github.com/mimir-org/mimir](https://github.com/mimir-org/mimir)
