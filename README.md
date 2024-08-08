# Fashion Vista

Fashion Vista is an e-commerce web application designed to provide a seamless shopping experience for users. This project includes services for managing products, user accounts, carts, orders, and wishlists, all secured with JWT authentication.

## Table of Contents
- [Overview](#overview)
  - [Frontend](#frontend)
  - [Backend](#backend)
    - [Microservices](#microservices)
    - [API Gateway](#api-gateway)
    - [Service Registry](#service-registry)
    - [Integration](#integration)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Technologies Used](#technologies-used)

## Overview

### Frontend

The frontend of the application is developed using:

- **ReactJS**: For building the user interface with reusable components.
- **Redux**: For state management across the application.
- **Axios**: For making HTTP requests to interact with the backend services.
- **React Router**: For handling routing and navigation within the application.

### Backend

The backend is designed with a microservices architecture and includes the following components:

#### Microservices

1. **Product Service**
   - **Database**: MongoDB
   - **Responsibilities**: Manages product data, including CRUD operations on products.

2. **User Service**
   - **Database**: MySQL
   - **Responsibilities**: Handles user registration, login, and authentication.

3. **Wishlist Service**
   - **Database**: MySQL
   - **Responsibilities**: Manages user wishlists.

4. **Cart Service**
   - **Database**: MySQL
   - **Responsibilities**: Manages cart operations.

5. **Order Service**
   - **Database**: MySQL
   - **Responsibilities**: Handles order creation and retrieval.

#### API Gateway

- **Port**: 8090
- **Responsibilities**: Acts as a single entry point for all client requests, routing them to the appropriate microservices. Ensures centralized management of cross-cutting concerns such as security, logging, and routing.

#### Service Registry

- **Netflix Eureka**: Used for service discovery and registration, allowing services to locate and communicate with each other dynamically.

#### Integration

- **FeignClient**: 
  - **User Service**: FeignClient is used to make RESTful calls to the Product Service to fetch product details, ensuring the User Service can access up-to-date product information.
  - **Cart Service**: FeignClient is also used to post orders to the Order Service, facilitating the creation of new orders based on the cart's contents.

- **DTO Architecture**: Data Transfer Objects (DTOs) are used to transfer data between layers and services, ensuring a clear separation of concerns and reducing data coupling.

## Prerequisites

- Java 11 or later
- Node.js and npm
- MongoDB
- MySQL
- Spring Boot
- Eureka Server
- Spring Cloud Gateway

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/kothakokila/fashion-vista.git
    cd fashion-vista
    ```

2. **Backend Setup**
    - Navigate to each microservice directory and install dependencies:
    ```bash
    cd CartService
    mvn clean install
    cd ../OrderService
    mvn clean install
    cd ../ProductService
    mvn clean install
    cd ../UserService
    mvn clean install
    cd ../WishlistService
    mvn clean install
    cd ../Service_Registry
    mvn clean install
    cd ../FashionVistaGateway
    mvn clean install
    ```

3. **Frontend Setup**
    - Navigate to the frontend directory and install dependencies:
    ```bash
    cd user_interface
    npm install
    ```

## Running the Application

1. **Start the Eureka Server**
    ```bash
    cd Service_Registry
    mvn spring-boot:run
    ```

2. **Start the Gateway**
    ```bash
    cd ../FashionVistaGateway
    mvn spring-boot:run
    ```

3. **Start the Microservices**
    ```bash
    cd ../CartService
    mvn spring-boot:run
    cd ../OrderService
    mvn spring-boot:run
    cd ../ProductService
    mvn spring-boot:run
    cd ../UserService
    mvn spring-boot:run
    cd ../WishlistService
    mvn spring-boot:run
    ```

4. **Start the Frontend**
    ```bash
    cd ../frontend
    npm start
    ```

## API Documentation

Detailed API documentation can be found [here]):

## Technologies Used

- **Backend**: Java, Spring Boot, Spring Cloud, Spring Security, JWT
- **Database**: MongoDB, MySQL
- **Frontend**: React, Redux, Axios
- **Other**: Eureka Server, Spring Cloud Gateway
