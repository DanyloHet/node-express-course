// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();



app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const authRoutes = require('./routes/auth');
const guardRoutes = require('./routes/guard');

// Use routes
app.use('/api/v1/logon', authRoutes);  
app.use('/api/v1/hello', guardRoutes); 

// ErrorHandler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

