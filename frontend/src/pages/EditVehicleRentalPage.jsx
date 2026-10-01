import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("");
  const [description, setDescription] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyContactEmail, setAgencyContactEmail] = useState("");
  const [fleetSize, setAgencyFleetSize] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [listingDate, setListingDate] = useState("");;
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);
        const data = await res.json();
        setVehicleModel(data.vehicleModel);
        setCategory(data.category);
        setDescription(data.description);
        setAgencyName(data.agency.name);
        setAgencyContactEmail(data.agency.contactEmail);
        setAgencyFleetSize(data.agency.fleetSize);
        setCity(data.location.city);
        setState(data.location.state);
        setDailyPrice(data.dailyPrice);
        setListingDate(data.listingDate
          ? data.listingDate.split("T")[0]
          : ""
        );
        setAvailabilityStatus(data.availabilityStatus);
        setBookingDeadline(data.bookingDeadline
          ? data.bookingDeadline.split("T")[0]
          : ""
        );
        setInsurancePolicy(data.insurancePolicy);
      } catch (error) {
        console.error("Error fetching vehicle:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const updateVehicle = async (vehicle) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      });
      if (!res.ok) {
        throw new Error("Failed to update vehicle");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };


  const submitForm = (e) => {
    e.preventDefault();

    const updatedVehicle = {
            vehicleModel: vehicleModel,
            agency: {
              name: agencyName,
              contactEmail: agencyContactEmail,
              fleetSize: fleetSize,
            },
            location: {
              city: city,
              state: state,
            },
            dailyPrice: dailyPrice,
            bookingDeadline: bookingDeadline,
            insurancePolicy: insurancePolicy,
            category: category,
            description: description,
            availabilityStatus: availabilityStatus,
        };

    updateVehicle(updatedVehicle);
    return navigate(`/vehicles/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create">
      <h2>Update Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          required
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
        />

        <label>Category:</label>
        <input
          type="text"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Vehicle Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <h3>Agency:</h3>
        <label>Name:</label>
        <input
          type="text"
          required
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="email"
          required
          value={agencyContactEmail}
          onChange={(e) => setAgencyContactEmail(e.target.value)}
        />

        <label>Fleet Size:</label>
        <input
          type="number"
          required
          value={fleetSize}
          onChange={(e) => setAgencyFleetSize(e.target.value)}
        />
        <h3>Location:</h3>
        <label> City:</label>
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>State:</label>
        <input
          type="text"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <label>Daily price:</label>
        <input
          type="number"
          required
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
        />
        <label>Listing date:</label>
        <input
          type="date"
          required
          value={listingDate}
          onChange={(e) => setListingDate(e.target.value)}
        />
        <label>Availability:</label>
        <select required value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
          <option value="available">available</option>
          <option value="rented">rented</option>
          <option value="maintenance">maintenance</option>
        </select>

        <label>Booking deadline:</label>
        <input
          type="date"
          required
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
        />

        <label>Insurance policy:</label>
        <input
          type="text"
          required
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
        />
        
        <button>Save Update</button>
      </form>
    </div>
  );
};

export default EditVehicleRentalPage;

