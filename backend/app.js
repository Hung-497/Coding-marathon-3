const express = require('express');
const cors = require('cors');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);

//Static View
app.use(express.static(path.join(__dirname, 'view')));

// Error handling
app.use('/api', unknownEndpoint);
app.use(errorHandler);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});


app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

module.exports = app;

