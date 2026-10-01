const VehicleRental = require("../models/vehicleRentalModel");
const mongoose = require("mongoose");

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await VehicleRental.find({}).sort({ createdAt: -1 });
    res.status(200).json(vehicleRentals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  const {
    vehicleModel,
    category,
    description,
    agency,
    location,
    dailyPrice,
    listingDate,
    availabilityStatus,
    bookingDeadline,
    insurancePolicy,
  } = req.body;

  try {
    const user_id = req.user._id
    const vehicleRental = await VehicleRental.create({
      user_id,
      vehicleModel,
      category,
      description,
      agency,
      location,
      dailyPrice,
      listingDate,
      availabilityStatus,
      bookingDeadline,
      insurancePolicy,
    });
    res.status(201).json(vehicleRental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such vehicle for rent" });
  }
  try {
    const vehicleRental = await VehicleRental.findById(id);

    if (!vehicleRental) {
      return res.status(404).json({ error: "No such vehicle for rent" });
    }

    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(500).json({ message: "Could not get vehicle by id" });
  }
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such vehicle for rent" });
  }

  const {
    vehicleModel,
    category,
    description,
    agency,
    location,
    dailyPrice,
    listingDate,
    availabilityStatus,
    bookingDeadline,
    insurancePolicy,
  } = req.body;

  try {
    const updatedVehicle = await VehicleRental.findByIdAndUpdate(
      id,
      {
        vehicleModel,
        category,
        description,
        agency,
        location,
        dailyPrice,
        listingDate,
        availabilityStatus,
        bookingDeadline,
        insurancePolicy,
      },
      { new: true },
    );
    if (!updatedVehicle) {
      return res.status(404).json({ message: " 404 not found" });
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such vehicle for rent" });
  }
  try {
    const deleteVehicle = await VehicleRental.findByIdAndDelete(id);
    if (!deleteVehicle) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "count not delete vehicle" });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};
