# Meeting Room Booking System for Co-working Spaces

## Project Description

The Meeting Room Booking System is a web application designed to streamline the process of booking meeting rooms in co-working spaces. This backend-focused project includes detailed models, routes, and functionalities that cater to both admin and user interactions. Admins can manage rooms and time slots, while users can book available slots for their meetings.

## Features

- User Authentication and Authorization
  - User registration and login
  - Role-based access control (Admin and User)
- Room Management

  - CRUD operations for meeting rooms
  - Soft delete functionality

- Slot Management

  - Slot creation for specific rooms
  - Slot retrieval for booking purposes

- Booking Management

  - Create, retrieve, update, and delete bookings
  - Soft delete functionality
  - Booking status management

## Technologies Used

- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Validation: Zod
- Authentication: JWT (JSON Web Tokens)
- Password Hashing: bcrypt
- Other: dotenv, CORS, input sanitization

## Installation

#### 1. Clone the repository :

```bash
git clone https://github.com/yourusername/meeting-room-booking-system.git
cd meeting-room-booking-system

```

#### 2.Install dependencies:

```bash
npm install
```

#### 3.Set up environment variables:

- Create a .env file in the root directory
- Add the following environment variables:

```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### 4.Start the server:

```bash
npm start
```

## Error Handling

- Validation Errors: Detailed error messages for failed input validation.
- Authentication Errors: Clear error messages for unauthorized access attempts.
- Not Found Errors: 'Not Found' errors for non-existent resources.
- Server Errors: Generic error messages for internal server errors to avoid revealing sensitive information.

## Security Features

- Authentication: Secure user authentication with JWT.
- Password Hashing: Passwords hashed using bcrypt before storage.
- Role-Based Access Control: Admin-specific routes protected by role-based access control.
- Input Sanitization: User inputs sanitized to prevent SQL injection and other attacks.

## License
