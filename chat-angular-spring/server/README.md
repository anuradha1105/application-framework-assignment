# Angular + Spring STOMP Chat

## Run locally
```bash
# Spring server (requires Java 17+ and Maven)
cd server
mvn spring-boot:run  # http://localhost:8080

# Angular client
cd ../client
npm i -g @angular/cli
npm i
ng serve --port 4200   # http://localhost:4200
```
The Angular client connects to `http://localhost:8080/ws`.
