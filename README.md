# CrudSignals

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.
This application is a standalone application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Tasks

Create a Eshop application with signals (Angular 18) using [API](https://fakestoreapi.com/products/)

* Add a product to Cart  using Signal
* Modify a product using Signal
* Delete a product using Signal
* Badge of notification using Signal
* Display list of product and categories using Signal
* Filter list of products using Signal
* Using lazy-loading 

## Used Approche

I have used a __declarative Approach__

### Benefits

* React to user actions and data emissions
* Mege data from multiple sources
* Shared data between components
* More easily use features like the async pipe or use a signals

### Docker Support

This project includes Docker support for easier environment setup and deployment. You can run the Angular application inside a Docker container using Docker Compose, which will automatically handle the environment dependencies such as Node.js.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system:
* Docker
* Docker Compose

## Running the Application with Docker

Follow these steps to run the application inside a Docker container:
* __Clone the project repository__: If you haven't cloned the project yet, clone the repository first:
* git clone https://github.com/Balha147/eshop.git
* cd eshop

Build and start the container: Use the following command to build the Docker image and start the container:
* docker-compose up --build

## Stopping the Container
To stop the running container, use the following command:
* docker-compose down

## Docker Files Overview
Dockerfile: This file contains the instructions to create a Docker image for the Angular project.
* __Base image:__ The project uses Node.js version 20.
* __Clone repository:__ It clones the project from the GitHub repository.
* __Install dependencies:__ It runs npm install to install project dependencies.
* __Build the project:__ It runs npm run build to build the Angular project.
* __Expose port:__ It exposes port 4200 for the development server.
* __Start the server:__ The container runs the Angular development server __(npm start)__ and binds it to __0.0.0.0__ so that it can be accessed from the host machine.

docker-compose.yml: This file defines the services to run the application with Docker Compose.
* __Service:__ The angular service builds the Docker image from the Dockerfile.
* __Ports:__ It maps port 4200 of the container to port 4200 on the host machine.
* __Volumes:__ The current project directory is mounted inside the container, allowing for real-time synchronization of files between the host and container, excluding node_modules to avoid conflicts.
* __Command:__ It runs the __npm start__ command to launch the development server
