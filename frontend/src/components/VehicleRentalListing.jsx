import { Link } from "react-router-dom";

const VehicleRentalListing = ({ vehicle }) => {
  return (
    <div className="rental-preview">
      <Link to={`/vehicles/${vehicle.id}`}>
      <h2>Vehicle Model: {vehicle.vehicleModel}</h2>
      </Link>
      <p>Category: {vehicle.category}</p>
      <p>Daily Price: {vehicle.dailyPrice}</p>
      <p>Agency:</p>
      <p>name: {vehicle.agency.name}</p>
      <p>Contact email: {vehicle.agency.contactEmail}</p>
      <p>fleet Size: {vehicle.agency.fleetSize}</p>
      <p>Location:</p>
      <p>City: {vehicle.location.city}</p>
      <p>State: {vehicle.location.state}</p>
      <p>Listing Date: {vehicle.listingDate  ? new Date(vehicle.listingDate).toLocaleDateString()
                     : "—"}</p>
      <p>Availability: {vehicle.availabiltyStatus}</p>
      <p>Booking Deadline: {vehicle.bookingDeadline   ? new Date(vehicle.bookingDeadline).toLocaleDateString()
                     : "—"} </p>
      <p>Insurance Policy: {vehicle.insurancePolicy}</p>
    </div>
  );
};

export default VehicleRentalListing;

