# Krom Take Home Test BE

### API Documentation

[Postman Docs](https://documenter.getpostman.com/view/12104547/2sAY52czbw)

### ERD

![DB ERD](./docs/erd.png)

### Setup

#### Without Docker

1. Install all dependencies

```
npm install
```

2. Fill in `.env.example` and rename it to `.env`

```
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=applicant_tracking_db
DB_PASSWORD=postgres
DB_PORT=5432
```

3. Run seeder function for the db

```
npm run seeddb
```

4. Start the server

```
npm run start:dev
```

#### With Docker

In this instance, I use docker without docker-compose or docker desktop

1. Build the Docker image

```
docker build -t my-express-app .
```

2. Create a network to allow communication between containers

```
docker network create krom-network
```

3. Run a PostgreSQL container

```
docker run --name my-postgres-db --network krom-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=applicant_tracking_db -p 5433:5432 -d postgres:14
```

4. Run express js app container

```
docker run --name my-express-app --network krom-network -e DATABASE_URL=postgres://postgres:password@my-postgres-db:5432/applicant_tracking_db -p 8080:3000 -d my-express-app
```
