# API Documentation

Base URL: `http://localhost:5000` (or your production URL)

## Authentication
**Base Route:** `/api/auth`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | No |
| `POST` | `/login` | Login user | No |
| `POST` | `/forgotpassword` | Request password reset email | No |
| `PUT` | `/resetpassword/:resettoken` | Reset password using token | No |
| `GET` | `/me` | Get current user profile | **Yes** |
| `PUT` | `/updatedetails` | Update user details (name, email) | **Yes** |
| `PUT` | `/updatepassword` | Update password | **Yes** |
| `GET` | `/google` | Google Login | No |
| `GET` | `/facebook` | Facebook Login | No |

## Subjects
**Base Route:** `/api/subjects`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all subjects | No |
| `POST` | `/` | Create a new subject | **Yes (Admin)** |

## Lectures
**Base Route:** `/api/lectures`
**Nested Route:** `/api/subjects/:subjectId/lectures`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all lectures (or for a specific subject) | No |
| `POST` | `/` | Create a new lecture | **Yes (Admin)** |

## Community
**Base Route:** `/api/community`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Get all posts | **Yes** |
| `POST` | `/` | Create a new post | **Yes** |
| `PUT` | `/like/:id` | Like a post | **Yes** |
| `POST` | `/comment/:id` | Comment on a post | **Yes** |

## Notes
*   **Auth Required**: You need to send the JWT token in the header: `Authorization: Bearer <token>`
