import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = ({vehicles}) => {
  return (
    <div className="rental-list">
      {vehicles.map((vehicle) =>(
      <VehicleRentalListing key={vehicle.id} vehicle={vehicle}/>
      ))}
    </div>
  );
};

export default VehicleRentalListings;

