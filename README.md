Deployment Server: [https://kraftbase-assgin.onrender.com](https://kraftbase-assgin.onrender.com)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const restaurantService = require('./routes/Resurant');
const userService = require('./routes/userservice'); 
const deliveryAgentRouter = require('./routes/deliveryAgentService');

// Create Express app
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json(), cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://nqu7069:kraft123@cluster0.rahknnu.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Use restaurantService router for /restaurants route
app.use('/restaurants', restaurantService);

// Use userService router for /users route
app.use('/users', userService);

// Use the delivery agent router
app.use('/deliveryagents', deliveryAgentRouter);

// Welcome message on the root route
app.get('/', (req, res) => {
    res.send('Welcome to bamato');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { // Listen on any available IP address
    console.log(`Server is running on port ${PORT}`);
});
```

Explanation in Markdown:

# API Endpoints Explanation

This Markdown document provides explanations for the API endpoints implemented.

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
...
// Remaining endpoint explanations
```

