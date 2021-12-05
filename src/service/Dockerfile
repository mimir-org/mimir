# syntax=docker/dockerfile:1.3

FROM mcr.microsoft.com/dotnet/sdk:6.0.100-alpine3.14-amd64 AS build
WORKDIR /src
COPY ["ModelBuilder.Api/ModelBuilder.Api.csproj", "ModelBuilder.Api/"]
RUN dotnet restore "ModelBuilder.Api/ModelBuilder.Api.csproj"
COPY . .
WORKDIR "/src/ModelBuilder.Api"
RUN dotnet build "ModelBuilder.Api.csproj" -c Release -o /app/build
RUN dotnet publish "ModelBuilder.Api.csproj" -c Release -o /app/publish
 
FROM mcr.microsoft.com/dotnet/aspnet:6.0.0-alpine3.14-amd64 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ModelBuilder.Api.dll"]
