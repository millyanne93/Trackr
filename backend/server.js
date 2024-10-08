require('dotenv').config(); // Load .env file

const app = require('./api/index'); // Import the app from index.js

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
