## Run dotnet container with HTTPS

ref: https://docs.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-3.1

```
# Self-signed certificates are usually stored in ~/.aspnet/https/ folder.

# Remove all self-signed certs, if necessary
dotnet dev-certs https --clean
rm ~/.aspnet/https

# Create one 
dotnet dev-certs https -p ab1Password -t -ep ${HOME}/.aspnet/https/visitas-dev.pfx

### Build image
docker build -t phinoppix/visitas-backend .

# Run the container, assuming the app image already exists
docker run --rm -it \
-p 8000:80 \
-p 8001:443 \
-e ASPNETCORE_URLS="https://+;http://+" \
-e ASPNETCORE_HTTPS_PORT=8001 \
-e ASPNETCORE_Kestrel__Certificates__Default__Password=ab1Password \
-e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/visitas-dev.pfx \
-v ${HOME}/.aspnet/https:/https/ \
phinoppix/visitas-backend

### To delete container
docker container rm --force visitas-be-v1

```

### Troubleshooting notes:

- If you get a `file not found` error coming from a cryptography class, it is most likely wrong filename or folder location in the ENV variables.
```
Interop+Crypto+OpenSslCryptographicException: error:2006D080:BIO routines:BIO_new_file:no such file
```

- If you get a PKCS12 parse error, it is probably an invalid password set to `ASPNETCORE_Kestrel__Certificates__Default__Password`.
```
error:23076071:PKCS12 routines:PKCS12_parse:mac verify failure
```
