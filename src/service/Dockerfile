# syntax=docker/dockerfile:1.3

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ModelBuilder.Api/ModelBuilder.Api.csproj", "ModelBuilder.Api/"]
RUN dotnet restore "ModelBuilder.Api/ModelBuilder.Api.csproj"
COPY . .
WORKDIR "/src/ModelBuilder.Api"
RUN dotnet build "ModelBuilder.Api.csproj" -c Release -o /app/build
RUN dotnet publish "ModelBuilder.Api.csproj" -c Release -o /app/publish


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
