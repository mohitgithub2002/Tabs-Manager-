# API Documentation

## Authentication

All API endpoints require authentication through NextAuth.js with Google OAuth provider. This ensures secure access to user-specific data and operations.

### Authentication Flow
1. User initiates sign-in through Google OAuth
2. Upon successful authentication, NextAuth creates a session with user information
3. All subsequent API requests must include the user's ID in the headers for authorization
4. Session tokens are automatically managed by NextAuth

## Collections API Endpoints

### Get All Collections
- **Endpoint**: `/api/collections`
- **Method**: GET
- **Description**: Retrieves all collections belonging to the authenticated user. Collections are returned in descending order based on their last update time.
- **Authentication**: Required
- **Headers**:
  ```
  user-id: string (required) - The authenticated user's identifier
  ```
- **Response (200)**:
  ```json
  {
    "data": [
      {
        "id": "string",
        "userId": "string",
        "name": "string",
        "sessions": [
          {
            "isSingleTab": boolean,
            "name": "string",
            "tabs": [
              {
                "favicon": "string",
                "title": "string",
                "url": "string"
              }
            ],
            "timestamp": "string"
          }
        ],
        "createdAt": "string",
        "updatedAt": "string"
      }
    ]
  }
  ```
- **Error Responses**:
  - **401 Unauthorized**:
    ```json
    {
      "error": "User ID is required"
    }
    ```
  - **500 Server Error**:
    ```json
    {
      "error": "Failed to fetch collections"
    }
    ```

### Get Collection
- **Endpoint**: `/api/collections/:id`
- **Method**: GET
- **Description**: Retrieves a specific collection and all its associated sessions. This endpoint verifies that the requesting user owns the collection.
- **Authentication**: Required
- **Headers**:
  ```
  user-id: string (required) - The authenticated user's identifier
  ```
- **URL Parameters**:
  - `id`: Collection identifier
- **Response (200)**:
  ```json
  {
    "data": {
      "id": "string",
      "userId": "string",
      "name": "string",
      "sessions": [
        {
          "isSingleTab": boolean,
          "name": "string",
          "tabs": [
            {
              "favicon": "string",
              "title": "string",
              "url": "string"
            }
          ],
          "timestamp": "string"
        }
      ]
    }
  }
  ```

### Add Session to Collection
- **Endpoint**: `/api/collections/:id`
- **Method**: POST
- **Description**: Adds a new browser session to an existing collection. Sessions can contain multiple tabs or a single tab. The timestamp is automatically generated if not provided.
- **Authentication**: Required
- **Headers**:
  ```
  user-id: string (required) - The authenticated user's identifier
  Content-Type: application/json
  ```
- **URL Parameters**:
  - `id`: Collection identifier
- **Request Body**:
  ```json
  {
    "isSingleTab": boolean,
    "name": "string",
    "tabs": [
      {
        "favicon": "string",
        "title": "string",
        "url": "string"
      }
    ]
  }
  ```
- **Response (201)**:
  ```json
  {
    "message": "Session added successfully",
    "collection": {
      // Updated collection object
    }
  }
  ```

### Delete Session
- **Endpoint**: `/api/collections/:id/sessions/delete`
- **Method**: POST
- **Description**: Removes a specific session from a collection based on its timestamp. This operation is permanent and cannot be undone.
- **Authentication**: Required
- **Headers**:
  ```
  user-id: string (required) - The authenticated user's identifier
  Content-Type: application/json
  ```
- **URL Parameters**:
  - `id`: Collection identifier
- **Request Body**:
  ```json
  {
    "timestamp": "string"
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Session deleted successfully",
    "collection": {
      // Updated collection object
    }
  }
  ```

### Modify Collection
- **Endpoint**: `/api/collections/:id/edit`
- **Method**: POST
- **Description**: Performs collection-level operations like renaming or deleting an entire collection. For rename operations, provides the updated collection in the response.
- **Authentication**: Required
- **Headers**:
  ```
  user-id: string (required) - The authenticated user's identifier
  Content-Type: application/json
  ```
- **URL Parameters**:
  - `id`: Collection identifier
- **Request Body**:
  ```json
  {
    "action": "rename" | "delete",
    "newName": "string" // Required for rename action
  }
  ```
- **Response (200)**:
  ```json
  {
    "message": "Collection [renamed|deleted] successfully",
    "collection": {
      // Updated collection object (for rename only)
    }
  }
  ```

### Create New Collection
- **Endpoint**: `/api/collections/new`
- **Method**: POST
- **Description**: Creates a new collection for the user. Can optionally include initial sessions. The collection ID must be unique per user.
- **Authentication**: Required
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "id": "string",
    "userId": "string",
    "name": "string",
    "sessions": [
      {
        "isSingleTab": boolean,
        "name": "string",
        "tabs": [
          {
            "favicon": "string",
            "title": "string",
            "url": "string"
          }
        ],
        "timestamp": "string"
      }
    ]
  }
  ```
- **Response (201)**:
  ```json
  {
    "id": "string",
    "userId": "string",
    "name": "string",
    "sessions": [],
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```
- **Error Responses**:
  - **400 Bad Request**:
    ```json
    {
      "error": "Missing required fields"
    }
    ```
  - **409 Conflict**:
    ```json
    {
      "error": "Collection ID already exists for this user"
    }
    ```

## Error Responses

All endpoints may return the following standardized error responses:

### Unauthorized (401)
Returned when the request lacks proper authentication or user identification.
```json
{
  "error": "User ID is required"
}
```

### Not Found (404)
Returned when the requested resource (collection or session) doesn't exist or doesn't belong to the user.
```json
{
  "error": "Collection not found"
}
```
or
```json
{
  "error": "Session not found"
}
```

### Bad Request (400)
Returned when the request is malformed or missing required fields.
```json
{
  "error": "Missing required fields"
}
```
or
```json
{
  "error": "Invalid action specified"
}
```
or
```json
{
  "error": "New name is required for rename action"
}
```

### Conflict (409)
Returned when trying to create a resource that would conflict with existing data.
```json
{
  "error": "Collection ID already exists for this user"
}
```

### Server Error (500)
Returned when an unexpected error occurs on the server.
```json
{
  "error": "Failed to [operation] [resource]"
}
```

## Notes
- All timestamps should be in ISO 8601 format
- Collection IDs must be unique per user
- Session timestamps must be unique within a collection
- All endpoints validate user ownership before performing operations
