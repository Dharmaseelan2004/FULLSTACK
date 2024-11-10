require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/user');
const actionRoutes = require('./routes/actions');
const otherRoutes = require('./routes/other');

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/action', actionRoutes);
app.use('/api/other', otherRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => console.error('Connection error:', error));

// Start the server (add this part if you haven't already)
const PORT = process.env.PORT || 4000; // Use your desired port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
