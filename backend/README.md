# Graduation Project Backend

This is the backend for the Graduation Project platform, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a cloud connection string)

## Installation

1.  **Clone or Download** this repository.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the root directory.
2.  Copy the contents of `.env.example` into `.env`.
3.  Fill in the values (MongoDB URI, JWT Secret, etc.).

## Running the Server

- **Development Mode** (with hot-reload):
    ```bash
    npm run dev
    ```
- **Production Mode**:
    ```bash
    npm start
    ```

By default, the server runs on http://localhost:5000.

## API Documentation

See `API_DOCUMENTATION.md` for a full list of available endpoints and how to use them.
