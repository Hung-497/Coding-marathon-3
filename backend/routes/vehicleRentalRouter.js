const express = require('express');
const router = express.Router();

const {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
} = require('../controllers/vehicleRentalControllers');
const requireAuth = require("../middleware/requireAuth")

// GET /api/vehicleRentals
router.get('/', getAllVehicleRentals);

// GET /api/vehicleRentals/:vehicleRentalId
router.get('/:id', getVehicleRentalById);

router.use(requireAuth)

// POST /api/vehicleRentals
router.post('/', createVehicleRental);

// PUT /api/vehicleRentals/:vehicleRentalId
router.put('/:id', updateVehicleRental);

// DELETE /api/vehicleRentals/:vehicleRentalId
router.delete('/:id', deleteVehicleRental);

module.exports = router;

