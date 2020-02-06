FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as build-env
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

LABEL author="phinoppix@gmail.com"
LABEL version="1.0"
LABEL applicationId="rocks.handspeak.visitas"

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "VisitasDataService.dll"]