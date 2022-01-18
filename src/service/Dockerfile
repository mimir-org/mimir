# syntax=docker/dockerfile:1.3

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ModelBuilder.Api/*.csproj ModelBuilder.Api/
COPY ModelBuilder.Core/*.csproj ModelBuilder.Core/
COPY ModelBuilder.Data/*.csproj ModelBuilder.Data/
COPY ModelBuilder.Models/*.csproj ModelBuilder.Models/
COPY ModelBuilder.Services/*.csproj ModelBuilder.Services/

COPY ModelBuilder.TypeEditor.Core/*.csproj ModelBuilder.TypeEditor.Core/
COPY ModelBuilder.TypeEditor.Data/*.csproj ModelBuilder.TypeEditor.Data/
COPY ModelBuilder.TypeEditor.Services/*.csproj ModelBuilder.TypeEditor.Services/

COPY Modules/ApplicationInsightsLoggingModule/*.csproj Modules/ApplicationInsightsLoggingModule/
COPY Modules/AzureActiveDirectory/*.csproj Modules/AzureActiveDirectory/
COPY Modules/DefaultParserModule/*.csproj Modules/DefaultParserModule/
COPY Modules/FamModule/*.csproj Modules/FamModule/
COPY Modules/MicrosoftSqlServerModule/*.csproj Modules/MicrosoftSqlServerModule/
COPY Modules/RdfParserModule/*.csproj Modules/RdfParserModule/

RUN dotnet restore ModelBuilder.Api/ModelBuilder.Api.csproj

COPY . .
RUN dotnet build ModelBuilder.Api/ModelBuilder.Api.csproj -c Release --no-restore
RUN dotnet publish ModelBuilder.Api/ModelBuilder.Api.csproj -c Release --no-restore -o /app/publish

# icu-libs are not included in alpine runtime images
# see: https://github.com/dotnet/dotnet-docker/blob/main/samples/selecting-tags.md#alpine-globalization and https://github.com/dotnet/dotnet-docker/blob/main/samples/dotnetapp/Dockerfile.alpine-x64#L19
# This need to be added, because of globalization issues.

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV \
  DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
  LC_ALL=en_US.UTF-8 \
  LANG=en_US.UTF-8
RUN apk add --no-cache icu-libs
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ModelBuilder.Api.dll"]
