# LaureAsta Web App

A web app for auction management.

## Features

- **Login/Registration**: Allows users to register, log in, and view personalized information.
- **Auction Management**: View auctions with details, including title, description, and expiration date. Users can also edit and delete the auctions they created.
- **Bidding Management**: Users can place bids on active auctions.
- **Backend Interaction**: The web app interacts with a backend that handles authentication, registration, and retrieval of other information, such as auctions and bids.

## Technologies

- **Frontend**:
  - Vue.js: JavaScript framework for creating the user interface.
  - Bootstrap: CSS framework for quickly creating layouts and responsive designs.
  
- **Backend**:
  - Node.js: Runtime environment for the server.
  - Express: Framework for handling API routes.
  - MongoDB: Database to store users, auctions, and bids.

### Prerequisites
Make sure you have Docker installed on your machine.

- [Install Docker](https://docs.docker.com/get-docker/)

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/huseinovicelma/auction-webapp-huseinovic.git
    cd auction-webapp-huseinovic
    ```

2. Run the following commands to start the application with Docker:
    ```
    docker-compose up --build
    ```
    This command will build the container image and start the necessary services (backend, frontend, and database).

3. Once Docker finishes starting, open your browser and access the application at the following address:
    ```
    http://localhost:3000
    ```
