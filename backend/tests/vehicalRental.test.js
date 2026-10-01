const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const VehicleRentals = require("../models/vehicleRentalModel");

const api = supertest(app);

const vehicleRentals = [
  {
    vehicleModel: "Toyota Camry",
    category: "Electric",
    description: " A flashy and clean car",
    agency: {
      name: " Car Rentals",
      contactEmail: "contact@carrentals.com",
      fleetSize: 100,
    },
    location: {
      city: "Espoo",
      state: "Uusimaa",
    },
    dailyPrice: 50,
    listingDate: 20 - 11 - 2025,
    availabilityStatus: "maintenance",
    bookingDeadline: 22 - 11 - 2027,
    insurancePolicy: "Comprehensive coverage with roadside assistance",
  },
  {
    vehicleModel: "Porsche 911",
    category: "Fuel",
    description: " An old and clean car",
    agency: {
      name: " Car Rentals",
      contactEmail: "contact@carrentals.com",
      fleetSize: 100,
    },
    location: {
      city: "Vantaa",
      state: "Uusimaa",
    },
    dailyPrice: 50,
    listingDate: 20 - 11 - 2025,
    availabilityStatus: "available",
    bookingDeadline: 22 - 11 - 2027,
    insurancePolicy: "Comprehensive coverage with roadside assistance",
  },
];

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await VehicleRentals.deleteMany({});
  await VehicleRentals.insertMany(vehicleRentals);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/vehicleRentals", () => {
  it("should return all vehicle rentals", async () => {
    const response = await api.get("/api/vehicleRentals").expect(200);

    expect(response.body).toHaveLength(vehicleRentals.length);
  });

  it("should return vehicle rentals as JSON with status 200", async () => {
    await api
      .get("/api/vehicleRentals")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should include a specific vehicle rental in the returned list", async () => {
    const response = await api.get("/api/vehicleRentals");

    expect(response.body.map((rental) => rental.vehicleModel)).toContain(
      "Toyota Camry",
    );
  });
});

describe("POST /api/vehicleRentals", () => {
  describe("when the payload is valid", () => {
    it("should return status 201", async () => {
      const newVehicles = {
        vehicleModel: "Toyota Camry",
        category: "Electronics",
        description: "A flashy and clean car",
        agency: {
          name: " Car Rentals",
          contactEmail: "contact@carrentals.com",
          fleetSize: 100,
        },
        location: {
          city: "Espoo",
          state: "Uusimaa",
        },
        dailyPrice: 50,
        listingDate: 20 - 11 - 2025,
        availabilityStatus: "rented",
        bookingDeadline: 22 - 11 - 2027,
        insurancePolicy: "Comprehensive coverage with roadside assistance",
      };

      await api.post("/api/vehicleRentals").send(newVehicles).expect(201);
    });

    it("should persist the new vehicles in the database", async () => {
      const newVehicles = {
        vehicleModel: "Toyota Camry",
        category: "Electronics",
        description: "A flashy and clean car",
        agency: {
          name: " Car Rentals",
          contactEmail: "contact@carrentals.com",
          fleetSize: 100,
        },
        location: {
          city: "Espoo",
          state: "Uusimaa",
        },
        dailyPrice: 50,
        listingDate: 20 - 11 - 2025,
        availabilityStatus: "available",
        bookingDeadline: 22 - 11 - 2027,
        insurancePolicy: "Comprehensive coverage with roadside assistance",
      };

      await api.post("/api/vehicleRentals").send(newVehicles).expect(201);

      const vehiclesAfterPost = await VehicleRentals.find({});
      expect(vehiclesAfterPost).toHaveLength(vehicleRentals.length + 1);
      expect(
        vehiclesAfterPost.map((vehicle) => vehicle.vehicleModel),
      ).toContain(newVehicles.vehicleModel);
    });
  });
});

describe("when the payload is invalid", () => {
  it("should return status 400 when vehicles is missing", async () => {
    const invalidVehicleRental = {
      category: "Fuel",
      description: " An old and clean car",
      agency: {
        name: " Car Rentals",
        contactEmail: "contact@carrentals.com",
        fleetSize: 100,
      },
      location: {
        city: "Vantaa",
        state: "Uusimaa",
      },
      dailyPrice: 50,
      listingDate: 20 - 11 - 2025,
      availabilityStatus: "rented",
      bookingDeadline: 22 - 11 - 2027,
      insurancePolicy: "Comprehensive coverage with roadside assistance",
    };

    await api
      .post("/api/vehicleRentals")
      .send(invalidVehicleRental)
      .expect(400);
  });

  it("should not increase the number of products in the database", async () => {
    const invalidVehicleRental = {
      category: "Fuel",
      description: " An old and clean car",
      agency: {
        name: " Car Rentals",
        contactEmail: "contact@carrentals.com",
        fleetSize: 100,
      },
      location: {
        city: "Vantaa",
        state: "Uusimaa",
      },
      dailyPrice: 50,
      listingDate: 20 - 11 - 2025,
      availabilityStatus: "rented",
      bookingDeadline: 22 - 11 - 2027,
      insurancePolicy: "Comprehensive coverage with roadside assistance",
    };

    await api
      .post("/api/vehicleRentals")
      .send(invalidVehicleRental)
      .expect(400);

    const VehicleRentalsAtEnd = await VehicleRentals.find({});
    expect(VehicleRentalsAtEnd).toHaveLength(vehicleRentals.length);
  });
});

describe("PUT /api/vehicleRentals/:vehicleId", () => {
  describe("when the id is valid", () => {
    it("should return status 200", async () => {
      const vehicleRental = await VehicleRentals.findOne();

      await api
        .put(`/api/vehicleRentals/${vehicleRental.id}`)
        .send({ description: "Updated description" })
        .expect(200);
    });

    it("should persist the updated fields in the database", async () => {
      const vehicleRental = await VehicleRentals.findOne();
      const updates = {
        description: "Updated description",
      };

      await api
        .put(`/api/vehicleRentals/${vehicleRental.id}`)
        .send(updates)
        .expect(200);

      const updatedVehicle = await VehicleRentals.findById(vehicleRental.id);
      expect(updatedVehicle.description).toBe(updates.description);
    });
  });

  describe("when the id is invalid", () => {
    it("should return status 404", async () => {
      await api.put("/api/vehicalRentals/12345").send({}).expect(404);
    });
  });
});

describe("DELETE /api/vehicle-rentals/:vehicleId", () => {
  describe("when the id is valid", () => {
    it("should return status 204", async () => {
      const vehicleRental = await VehicleRentals.findOne();

      await api.delete(`/api/vehicleRentals/${vehicleRental.id}`).expect(204);
    });

    it("should remove the product from the database", async () => {
      const vehicleRental = await VehicleRentals.findOne();

      await api.delete(`/api/vehicleRentals/${vehicleRental.id}`).expect(204);

      const deletedVehicle = await VehicleRentals.findById(vehicleRental.id);
      expect(deletedVehicle).toBeNull();
    });
  });

  describe("when the id is invalid", () => {
    it("should return status 404", async () => {
      await api.delete("/api/vehicleRentals/12345").expect(404);
    });
  });
});

describe("GET /api/products/:productId", () => {
  describe("when the id is valid", () => {
    it("should return one product by ID", async () => {
      const vehicles = await VehicleRentals.findOne();

      const response = await api
        .get(`/api/vehicleRentals/${vehicles.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.vehicleModel).toBe(vehicles.vehicleModel);
    });
  });

  describe("when the id does not exist", () => {
    it("should return status 404", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      await api.get(`/api/vehicleRentals/${nonExistentId}`).expect(404);
    });
  });

  describe("when the id is invalid", () => {
    it("should return status 404", async () => {
      await api.get("/api/vehicleRentals/12345").expect(404);
    });
  });
});
