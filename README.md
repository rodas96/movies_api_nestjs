This project is a Movies API built with NestJS. It includes endpoints for managing movies and genres. The application is fully containerized using Docker, so you don't need to install any dependencies locally.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rodas96/movies_api_nestjs.git
cd movies_api_nestjs
docker-compose up --build

Open your browser and navigate to http://localhost:3000

Available API Endpoints

MoviesController Paths:

	1.	GET /movies
	•	Description: Retrieves a list of all movies.
	•	Method: findAll
	2.	GET /movies/search
	•	Description: Searches for movies based on optional title and/or genre query parameters.
	•	Method: search
	•	Query Parameters:
	•	title (optional)
	•	genre (optional)
	3.	GET /movies/:id
	•	Description: Retrieves a single movie by its ID.
	•	Method: findOne
	•	Path Parameter:
	•	id (number)
	4.	POST /movies
	•	Description: Creates a new movie.
	•	Method: create
	•	Body: CreateMovieDto
	5.	PATCH /movies/:id
	•	Description: Updates an existing movie by its ID.
	•	Method: update
	•	Path Parameter:
	•	id (number)
	•	Body: UpdateMovieDto
	6.	DELETE /movies/:id
	•	Description: Deletes a movie by its ID.
	•	Method: remove
	•	Path Parameter:
	•	id (number)

GenresController Paths:

	1.	GET /genres
	•	Description: Retrieves a list of all genres.
	•	Method: findAll
	2.	POST /genres
	•	Description: Creates a new genre.
	•	Method: create
	•	Body: CreateGenreDto
	3.	DELETE /genres/:name
	•	Description: Deletes a genre by its name.
	•	Method: remove
	•	Path Parameter:
	•	name (string)

To run the unit tests and integration tests:
  - docker-compose exec app npm run test

If you are on windows or not on M macbooks might have compability issues let me know and I will fix them.
```
