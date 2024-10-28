const env = require('dotenv');
env.config()
const PORT = process.env.PORT || 5000;
const express = require('express');
const routes = require('./routes/routes'); // Import the combined routes
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api',routes); // Use the routes defined in routes/routes.js

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
