# Mimir

[![CI - PROD](https://github.com/equinor/ti-spine-modelbuilder/actions/workflows/prod.yaml/badge.svg)](https://github.com/equinor/ti-spine-modelbuilder/actions/workflows/prod.yaml)




## Client Configuration


### Overview

Environment variables are injected into client at startup of container. In particular:

- Environment variables starting with the prefix 'MIMIR_ENV_***' are looked up from the container's environment.
- Environment variables are then processed into a valid json object, injected into index.html and made available under window.__MIMIR_ENV

### Required

**MIMIR_ENV_API_BASE_URL**: API base url for server api. Must include api version, E.g. http://localhost:5000/v1.0/

**MIMIR_ENV_SOCKET_BASE_URL**: Socket base url for server api. E.g. http://localhost:5000/

**MIMIR_ENV_APP_ID**: Application id of Server app registration in Azure AD. E.g. aaaaaaaa-xxxx-yyyy-zzzz-bbbbbbbbbbbb

**MIMIR_ENV_CLIENT_ID**: Application id (Client id) of Client app registration in Azure AD. E.g. aaaaaaaa-xxxx-yyyy-zzzz-bbbbbbbbbbbb

**MIMIR_ENV_TENANT_ID**: Tenant id of Azure AD tenant used. E.g. aaaaaaaa-xxxx-yyyy-zzzz-bbbbbbbbbbbb

**MIMIR_ENV_COMPANY**: Company domain. E.g. equinor.com, or aibel.com.

### Optional


**MIMIR_ENV_APP_INSIGHTS_CONNECTION_STRING**: Connection string for application insights. Must include instrumentation key and endpoint address.
## Server Configuration

### Overview

Server application is configured via appsettings.json (available within docker image, under /app), and accepts overrides via environment variables, using supported pattern by .NET [Microsoft Docs link](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-6.0&viewFallbackFrom=aspnetcore-2.2#evcp).

In order to override setting:
 ```json
    {
      ...
        "AzureActiveDirectoryConfiguration": {  
              "TenantId": "aaaaaaaa-xxxx-yyyy-zzzz-bbbbbbbbbbbb",
        },
      ...
    }
```

provide the environment AzureActiveDirectoryConfiguration__TenantId=******

In order to override an element in a list, use the element index as a separate element in the path, e.g. xxx__list1__0__Id=****.


## Required

NB: Examples of environment variables which are currently supported (inspect appsettings.json for complete list).

<br>

**ASPNETCORE_ENVIRONMENT**: Set .NET core environment.

**ApplicationSetting__CollaborationPartner__Name**: Name of collaboration partner, e.g. Equinor.

**ApplicationSetting__CollaborationPartner__Domain**: Domain of collaboration partner, e.g. equinor.com

**ApplicationSetting__CollaborationPartner__Iris__0**: RDF domain of collaboration partner, e.g. rdf.equinor.com

**AzureActiveDirectoryConfiguration__TenantId**: Tenant id of Azure AD tentant.

**AzureActiveDirectoryConfiguration__ClientId** Application id of Server application app registration in Azure AD.

**CorsConfiguration__ValidOrigins**: Comma separated string of valid origins for CORS. E.g. http://localhost:3000,https://my.domain.com

**DatabaseConfiguration__DataSource**: Identifier for database server. e.g. 

**DatabaseConfiguration__Port**: Port of database server. E.g. 1443.

**DatabaseConfiguration__InitialCatalog**: Identifier for database used on database server. 

**DatabaseConfiguration__DbUser**: Server application Database username

**DatabaseConfiguration__Password**: Server application Database password.




