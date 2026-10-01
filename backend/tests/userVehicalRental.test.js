const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const User = require("../models/userModel");

const api = supertest(app);

const validUser = {
  name: "jojo",
  username: "jojo@example.com",
  password: "Secret123",
  phone_number: "1234567890",
  licenseNumber: "0987654321",
  date_of_birth: "2000-04-12",
  address: {
    licenseExpiryDate: "2010-05-13",
    city: "Texax",
    yearsOfExperience: 2025
  }
}

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/signup", () => {
  describe("when the user is valid", () => {
    it("should return status 201", async () => {
      await api
        .post("/api/auth/signup")
        .send(validUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    it("should return an username and token", async () => {
      const response = await api
        .post("/api/auth/signup")
        .send(validUser)
        .expect(201);

      expect(response.body).toHaveProperty("token");
      expect(response.body.username).toBe(validUser.username);
    });

    it("should persist the user in the database", async () => {
      await api.post("/api/auth/signup").send(validUser).expect(201);

      const savedUser = await User.findOne({ username: validUser.username });
      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe(validUser.name);
    });
  });

  describe("when the user is invalid", () => {
    it("should return status 400 when required fields are missing", async () => {
      const response = await api
        .post("/api/auth/signup")
        .send({ username: "missing@example.com" })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Please fill all sections.");
    });

    it("should not persist a user in the database", async () => {
      await api
        .post("/api/auth/signup")
        .send({ username: "missing@example.com" })
        .expect(400);

      const usersAtEnd = await User.find({});
      expect(usersAtEnd).toHaveLength(0);
    });
  });

  describe("when the username is already registered", () => {
    it("should return status 400", async () => {
      await api.post("/api/auth/signup").send(validUser).expect(201);

      const response = await api
        .post("/api/auth/signup")
        .send({ ...validUser, name: "Another Productowner" })
        .expect(400);

      expect(response.body).toHaveProperty("error", "already exists");
    });
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await api.post("/api/auth/signup").send(validUser).expect(201);
  });

  describe("when the credentials are valid", () => {
    it("should return status 200", async () => {
      await api
        .post("/api/auth/login")
        .send({
          username: validUser.username,
          password: validUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("should return an username and token", async () => {
      const response = await api
        .post("/api/auth/login")
        .send({
          username: validUser.username,
          password: validUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.body.username).toBe(validUser.username);
    });
  });

  describe("when the credentials are invalid", () => {
    it("should return status 400 with a wrong password", async () => {
      const response = await api
        .post("/api/auth/login")
        .send({
          username: validUser.username,
          password: "WrongPassword!",
        })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return status 400 with an username that does not exist", async () => {
      const response = await api
        .post("/api/auth/login")
        .send({
          username: "nobody@example.com",
          password: validUser.password,
        })
        .expect(400);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });
  });
});
