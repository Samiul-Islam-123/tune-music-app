# Music Platform Server

This repository contains the server-side code for the Music Platform built using the MERN stack. The server handles CRUD operations for songs and users, streaming music, and will later include a recommendation engine.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Songs](#songs)
  - [Streaming](#streaming)
- [Technologies Used](#technologies-used)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    https://github.com/Samiul-Islam-123/music-platform.git
    cd music-platform/server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    DB_URL = MONGO DB URL
    CLOUD_NAME=cloudinary cloud name,
    CLOUDINARY_API_KEY=cloudinary api key,
    CLOUDINARY_API_SECRET=cloudinary api secret

    ```

## Configuration

Ensure you have a MongoDB database set up and replace `your_mongodb_connection_string` in the `.env` file with your actual connection string.

## Usage

Start the server:
```bash
npm start
```

## API Endpoints

### General

#### Root
- **Endpoint:** `GET /`
- **Description:** Test the server.
- **Response:**
    ```json
    {
      "message": "Hello From server"
    }
    ```

#### Upload
- **Endpoint:** `POST /upload`
- **Description:** Upload a file (used for testing Cloudinary).
- **Request:**
    - Form-data with a file field named `file`.
- **Response:**
    - **Success:**
      ```json
      {
        "success": true,
        "message": "File uploaded successfully",
        "fileURL": "string"
      }
      ```
    - **Failure:**
      ```json
      {
        "success": false,
        "message": "File not found"
      }
      ```

### Users

#### Get All Users
- **Endpoint:** `GET /user`
- **Description:** Retrieve all users.
- **Response:**
    ```json
    {
      "users": [
        {
          "id": "string",
          "username": "string",
          "email": "string"
        }
      ]
    }
    ```

#### Get a User by ID
- **Endpoint:** `GET /user/:clerkID`
- **Description:** Retrieve a user by clerk ID.
- **Response:**
    ```json
    {
      "user": {
        "id": "string",
        "username": "string",
        "email": "string"
      }
    }
    ```

#### Create a User
- **Endpoint:** `POST /user`
- **Description:** Create a new user.
- **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": "string",
        "username": "string",
        "email": "string"
      }
    }
    ```

#### Update a User
- **Endpoint:** `PUT /user`
- **Description:** Update a user.
- **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "User updated successfully",
      "user": {
        "id": "string",
        "username": "string",
        "email": "string"
      }
    }
    ```

#### Delete a User
- **Endpoint:** `DELETE /user`
- **Description:** Delete a user.
- **Response:**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```

### Songs

#### Get All Songs
- **Endpoint:** `GET /song`
- **Description:** Retrieve all songs.
- **Response:**
    ```json
    {
      "songs": [
        {
          "id": "string",
          "title": "string",
          "artist": "string",
          "album": "string",
          "genre": "string",
          "year": "number",
          "url": "string"
        }
      ]
    }
    ```

#### Get a Song by ID
- **Endpoint:** `GET /song/:id`
- **Description:** Retrieve a song by ID.
- **Response:**
    ```json
    {
      "song": {
        "id": "string",
        "title": "string",
        "artist": "string",
        "album": "string",
        "genre": "string",
        "year": "number",
        "url": "string"
      }
    }
    ```

#### Update a Song
- **Endpoint:** `PUT /song/:id`
- **Description:** Update a song by ID.
- **Request Body:**
    ```json
    {
      "title": "string",
      "artist": "string",
      "album": "string",
      "genre": "string",
      "year": "number",
      "url": "string"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Song updated successfully",
      "song": {
        "id": "string",
        "title": "string",
        "artist": "string",
        "album": "string",
        "genre": "string",
        "year": "number",
        "url": "string"
      }
    }
    ```

#### Delete a Song
- **Endpoint:** `DELETE /song/:id`
- **Description:** Delete a song by ID.
- **Response:**
    ```json
    {
      "message": "Song deleted successfully"
    }
    ```

#### Stream a Song
- **Endpoint:** `GET /song/stream/:id`
- **Description:** Stream a song by ID.
- **Response:** The song file will be streamed.

### Developer

#### Upload Single Song
- **Endpoint:** `POST /developer/upload-single`
- **Description:** Upload a single song and its thumbnail.
- **Request:**
    - Form-data with fields:
        - `song` (file)
        - `thumbnail` (file)
- **Response:**
    - **Success:**
      ```json
      {
        "message": "Single song and thumbnail uploaded successfully",
        "songURL": "string",
        "thumbnailURL": "string"
      }
      ```
    - **Failure:**
      ```json
      {
        "message": "Upload failed",
        "error": "string"
      }
      ```

#### Upload Multiple Songs
- **Endpoint:** `POST /developer/upload-multiple`
- **Description:** Upload multiple songs and their thumbnails.
- **Request:**
    - Form-data with fields:
        - `songs` (files)
        - `thumbnails` (files)
- **Response:**
    - **Success:**
      ```json
      {
        "message": "Multiple songs and thumbnails uploaded successfully",
        "songsURLs": ["string"],
        "thumbnailsURLs": ["string"]
      }
      ```
    - **Failure:**
      ```json
      {
        "message": "Upload failed",
        "error": "string"
      }
      ```
