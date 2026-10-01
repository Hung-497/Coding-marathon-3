const express = require('express');
const router = express.Router();

const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');

// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);

// POST /api/vehicleRentals
router.post('/', createVehicleRental);

// GET /api/vehicleRentals/:vehicleRentalId
router.get('/:id', getVehicleRentalById);

// PUT /api/vehicleRentals/:vehicleRentalId
router.put('/:id', updateVehicleRental);

// DELETE /api/vehicleRentals/:vehicleRentalId
router.delete('/:id', deleteVehicleRental);

module.exports = router;

