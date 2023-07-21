# Description

This project is a coding challenge solution that showcases the development of a web application using modern technologies and tools. The application is built with a full-stack approach, utilizing Next.js for the frontend and Node.js with MongoDB for the backend.

There still are some improvements to be made, such as adding unit tests and improving the UI/UX, but the application is fully functional and ready to be used.

For the purpouse of this project the DB is hosted on MongoDB Atlas, but it can be easily changed to a local DB by changing the `MONGO_URI` variable on the `.env` file and creating the image on the `docker-compose` file.

## Prerequisites

- Docker: Ensure that you have Docker installed on your system. You can download and install Docker from the official website: [https://www.docker.com](https://www.docker.com)

## Getting Started

Follow these steps to run the project:

1. Clone the repository: `git clone https://github.com/nachosabatini/simpli-coding-challenge.git`
2. Change to the project directory: `cd simpli-coding-challenge`
3. Navigate to the backend directory: `cd backend`
4. Create `.env` file on backend directory and add the following variables:

```
PORT=4000
MONGO_URI=mongodb+srv://mongo:mongo@simplicoding.4u97duj.mongodb.net/?retryWrites=true&w=majority

```

5. Change to the root directory: `cd ..`
6. Navigate to the frontend directory: `cd frontend`
7. Create `.env` file on frontend directory and add the following variables:

```
BACKEND_URL=http://localhost:4000

```

8. Change to the root directory: `cd ..`
9. Start the Docker containers: `docker-compose up --build`
10. Access the application at [http://localhost:3000](http://localhost:3000)
11. Enjoy!

## Built With

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript
- [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [MongoDB](https://www.mongodb.com/) - The application data platform
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - MongoDB Atlas is the global cloud database service for modern applications
- [Styled Components](https://styled-components.com/) - Visual primitives for the component age
- [Docker](https://www.docker.com/) - Docker is an open platform for developing, shipping, and running applications
- [Docker Compose](https://docs.docker.com/compose/) - Compose is a tool for defining and running multi-container Docker applications
