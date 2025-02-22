# API Documentation

## Collections API Endpoints

### Get All Collections
- **Endpoint**: `/api/collections`
- **Method**: GET
- **Description**: Retrieves all collections for a specific user
- **Headers**:
  ```
  user-id: string (required)
  ```
- **Response**:
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
- **Description**: Retrieves a specific collection and its sessions
- **Headers**:
  ```
  user-id: string (required)
  ```
- **URL Parameters**:
  - `id`: Collection identifier
- **Response**:
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
- **Description**: Adds a new session to an existing collection
- **Headers**:
  ```
  user-id: string (required)
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
    ],
    "timestamp": "string" (optional)
  }
  ```
- **Response**:
  ```json
  {
    "message": "Session added successfully",
    "collection": {
      // Collection object with updated sessions
    }
  }
  ```

### Delete Session from Collection
- **Endpoint**: `/api/collections/:id/sessions/delete`
- **Method**: POST
- **Description**: Removes a specific session from a collection
- **Headers**:
  ```
  user-id: string (required)
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
- **Response**:
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
- **Description**: Modify collection details (rename or delete)
- **Headers**:
  ```
  user-id: string (required)
  Content-Type: application/json
  ```
- **URL Parameters**:
  - `id`: Collection identifier
- **Request Body for Rename**:
  ```json
  {
    "action": "rename",
    "newName": "string"
  }
  ```
- **Request Body for Delete**:
  ```json
  {
    "action": "delete"
  }
  ```
- **Response for Rename**:
  ```json
  {
    "message": "Collection renamed successfully",
    "collection": {
      // Updated collection object
    }
  }
  ```
- **Response for Delete**:
  ```json
  {
    "message": "Collection deleted successfully"
  }
  ```

### Create New Collection
- **Endpoint**: `/api/collections/new`
- **Method**: POST
- **Description**: Creates a new collection for a user
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
- **Response Success (201)**:
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

All endpoints may return the following error responses:

### Authentication Error (401)
```json
{
  "error": "User ID is required"
}
```

### Not Found Error (404)
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

### Bad Request Error (400)
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

### Server Error (500)
```json
{
  "error": "Failed to [operation] [resource]"
}
```
