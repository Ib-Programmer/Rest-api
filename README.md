# Movie API - Next.js

This project is a REST API for managing a list of movies, built with Next.js.

## Project Setup and Usage

### Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    Open your terminal in the project root directory and run:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will typically start the server on `http://localhost:3000`. You can open this URL in your browser to see the application. The frontend page at `/` will display the list of movies.

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This command compiles the Next.js application into an optimized static build in the `.next` folder.

### Starting the Production Server

After building the application, you can start the production server with:

```bash
npm run start
```

This will serve the optimized build, typically on `http://localhost:3000`.

## API Routes

The application provides the following API endpoints:

*   **`GET /api/movies`**: Retrieves a list of all movies.
*   **`POST /api/movies`**: Adds a new movie to the list.
    *   **Request body example:**
        ```json
        {
          "title": "New Movie Title",
          "director": "Director Name",
          "release_date": "YYYY-MM-DD"
        }
        ```
*   **`GET /api/movies/:id`**: Retrieves a specific movie by its ID.
*   **`DELETE /api/movies/:id`**: Deletes a specific movie by its ID.

## Linting

To run the linter, use:
```bash
npm run lint
```
