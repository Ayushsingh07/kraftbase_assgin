Here's the combined code with explanations in Markdown format:

```markdown
# API Endpoints Explanation

This Markdown document provides explanations for the API endpoints implemented in the provided Node.js Express router.

## Endpoint APIs

### 1. GET /restaurants
- **Purpose**: Retrieve a list of all restaurants available online at the given hour.
- **Request Method**: GET
- **Request Body**: N/A
- **Response Body**: Array of JSON objects representing available restaurants.
- **Example Request**:
  ```json
  GET /restaurants
  ```
- **Example Response**:
  ```json
  [
    {
      "name": "Restaurant 1",
      "menu": [...],
      "online": true,
      "_id": "6061ae23f9d10f2278405e07",
      ...
    },
    ...
  ]
  ```

### 2. POST /order
- **Purpose**: Place an order from the available restaurants.
- **Request Method**: POST
- **Request Body**: JSON object with `restaurantId` (string) and `items` (array) representing the items in the order.
- **Response Body**: JSON object representing the placed order.
- **Example Request**:
  ```json
  POST /order
  {
    "restaurantId": "6061ae23f9d10f2278405e07",
    "items": ["Item 1", "Item 2"]
  }
  ```
- **Example Response**:
  ```json
  {
    "_id": "6061ae23f9d10f2278405e08",
    "restaurantId": "6061ae23f9d10f2278405e07",
    "items": ["Item 1", "Item 2"],
    "status": "Pending",
    ...
  }
  ```

### 3. POST /ratings
- **Purpose**: Allow users to leave ratings for their orders and delivery agents.
- **Request Method**: POST
- **Request Body**: JSON object with optional `orderId`, `deliveryAgentId`, `orderRating`, and `deliveryAgentRating`.
- **Response Body**: JSON object with a success message.
- **Example Request**:
  ```json
  POST /ratings
  {
    "orderId": "6061ae23f9d10f2278405e08",
    "orderRating": 4,
    "deliveryAgentId": "6061ae23f9d10f2278405e09",
    "deliveryAgentRating": 5
  }
  ```
- **Example Response**:
  ```json
  {
    "message": "Ratings added successfully"
  }
  ```

### 4. GET /orders/:restaurantId
- **Purpose**: Get all orders for a specific restaurant.
- **Request Method**: GET
- **Request Parameter**: `restaurantId` (string) representing the ID of the restaurant.
- **Response Body**: Array of JSON objects representing orders for the specified restaurant.
- **Example Request**:
  ```json
  GET /orders/6061ae23f9d10f2278405e07
  ```
- **Example Response**:
  ```json
  [
    {
      "_id": "6061ae23f9d10f2278405e08",
      "restaurantId": "6061ae23f9d10f2278405e07",
      "items": ["Item 1", "Item 2"],
      "status": "Pending",
      ...
    },
    ...
  ]
  ```

### 5. POST /:id/orders/accept
- **Purpose**: Accept an order from the restaurant.
- **Request Method**: POST
- **Request Parameter**: `id` (string) representing the ID of the restaurant.
- **Response Body**: JSON object representing the accepted order.
- **Example Request**:
  ```json
  POST /6061ae23f9d10f2278405e07/orders/accept
  ```
- **Example Response**:
  ```json
  {
    "_id": "6061ae23f9d10f2278405e08",
    "restaurantId": "6061ae23f9d10f2278405e07",
    "items": ["Item 1", "Item 2"],
    "status": "Accepted",
    ...
  }
  ```

### 6. POST /:id/orders/reject
- **Purpose**: Reject an order from the restaurant.
- **Request Method**: POST
- **Request Parameter**: `id` (string) representing the ID of the restaurant.
- **Response Body**: JSON object representing the rejected order.
- **Example Request**:
  ```json
  POST /6061ae23f9d10f2278405e07/orders/reject
  ```
- **Example Response**:
  ```json
  {
    "_id": "6061ae23f9d10f2278405e08",
    "restaurantId": "6061ae23f9d10f2278405e07",
    "items": ["Item 1", "Item 2"],
    "status": "Rejected",
    ...
  }
  ```

### 7. GET /ord/:orderId
- **Purpose**: Get an order by its ID.
- **Request Method**: GET
- **Request Parameter**: `orderId` (string) representing the ID of the order.
- **Response Body**: JSON object representing the order.
- **Example Request**:
  ```json
  GET /ord/6061ae23f9d10f2278405e08
  ```
- **Example Response**:
  ```json
  {
    "_id": "6061ae23f9d10f2278405e08",
    "restaurantId": "6061ae23f9d10f2278405e07",
    "items": ["Item 1", "Item 2"],
    "status": "Accepted",
    ...
  }
  ```
```

This Markdown document provides clear explanations for each API endpoint, including request methods, request parameters, request bodies, and response bodies.
