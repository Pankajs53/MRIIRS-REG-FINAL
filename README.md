## Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Pankajs53/MRIIRS-REG-PORTAL.git
    cd MRIIRS-REG-PORTAL
    ```

2. **Install dependencies for both client and server:**

    ```bash
    # For the server
    cd server
    npm install

    # For the client
    cd ../client
    npm install
    ```

## Running the Client

1. **Navigate to the client directory:**

    ```bash
    cd client
    ```

2. **Start the client:**

    ```bash
    npm start
    ```

    The client will run on `http://localhost:3000`.

## Running the Server

1. **Navigate to the server directory:**

    ```bash
    cd server
    ```

2. **Set up environment variables:**

    Create a `.env` file in the `server` directory with the following content:

    ```env
    MONGO_URI=mongodb://localhost:27017/hospital_db
    PORT=4000
    ```

    Make sure to replace `mongodb://localhost:27017/hospital_db` with your MongoDB connection string if it's different.

3. **Start the server:**

    ```bash
    npm start
    ```

    The server will run on `http://localhost:4000`.

## Folder Structure

```plaintext
MRIIRS-REG-PORTAL/
├── client/        # React frontend
│   ├── public/
│   └── src/
├── server/        # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
└── README.md
