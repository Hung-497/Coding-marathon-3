import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";


const AddVehicleRentalPage = () => {
  const vehicleModel = useField("");
  const agencyName = useField("");
  const agencyEmail = useField("");
  const fleetSize = useField(0);
  const city = useField("");
  const state = useField("");
  const dailyPrice = useField("");
  const bookingDeadline = useField(""); ///type = date
  const insurancePolicy = useField("")
  const description = useField("");
  const category = useField("Economy");
  const availabilityStatus = useField("available");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  // const token = user.token;

  const addVehicleRental = async (newVehicle) => {
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,s
        },
        body: JSON.stringify(newVehicle),
      });
      if (!res.ok) {
        throw new Error("Failed to add Vehicle");
      }
      return true;
    } catch (error) {
      console.error("Error adding Vehicle:", error);
      return false;
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    const newVehicle = {
            vehicleModel: vehicleModel.value,
            agencyName: agencyName.value,
            agencyEmail: agencyEmail.value,
            fleetSize: fleetSize.value,
            city: city.value,
            state: state.value,
            dailyPrice: dailyPrice.value,
            bookingDeadline: bookingDeadline.value,
            insurancePolicy: insurancePolicy.value,
            category: category.value,
            description: description.value,
            availabilityStatus: availabilityStatus.value,
        };
      console.log(newVehicle);
    const success = await addVehicleRental(newVehicle);
    if (success) {
      console.log("Vehicle Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the Vehicle");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input {...vehicleModel} required />
        <label>Category:</label>
        <select {...category}>
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>
        <label>Description:</label>
        <textarea required {...description}></textarea>
        <label>Agency Name:</label>
        <input {...agencyName} required />
        <label>Agency Email:</label>
        <input {...agencyEmail} required />
        <label>Fleet Size:</label>
        <input {...fleetSize} type="number" min="0" />
        <label>City:</label>
        <input {...city} required />
        <label>State:</label>
        <input {...state} required />
        <label>Daily Price:</label>
        <input {...dailyPrice} type="number" step="0.01" min="0" required />
        <label>Availability Status:</label>
        <select {...availabilityStatus}>
          <option value="available" default>Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <label>Booking Deadline:</label>
        <input {...bookingDeadline} type="date" />
        <label>Insurance Policy:</label>
        <input {...insurancePolicy} type="text" required />
        <button>Add Vehicle Rental</button>
      </form>
    </div>
  );
};

export default AddVehicleRentalPage;

