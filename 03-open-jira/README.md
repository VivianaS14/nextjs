# Open Jira

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data base

To Run locally open jira, needs the data base, run the docker image with following command:

```
docker-compose up -d
```

- -d, means **detached**

MongoDB URL Local:

```
mongodb://localhost:27017/jiradb
```

## Set up environment variables

Fill variable MONGO_URL=mongodb://localhost:27017/jiradb

## Fill data base with test data

Call:

```
http://localhost:3000/api/seed
```
