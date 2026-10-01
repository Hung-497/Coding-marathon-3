const express = require('express');
const cors = require('cors');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const userRouter = require("./routes/userRouter")
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const path = require('path');
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");  // Assuming swagger.json is in the same directory

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use('/api/auth', userRouter)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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

