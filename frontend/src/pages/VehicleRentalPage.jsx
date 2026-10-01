import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const VehicleRentalPage = () => {

  const { id } = useParams();

    const [vehicle, setVehicle] = useState("");

    const navigate = useNavigate();

    // const user = JSON.parse(localStorage.getItem("user"));
    // const token = user ? user.token : null;

    const deleteVehicle = async (vehicleId) => {
        try {
            const res = await fetch(`/api/vehicles/${vehicleId}`, {
                method: "DELETE",
                headers: {
                    // Authorization: `Bearer ${token}`,    // <-- ADD THIS
                },
            });
            if (!res.ok) throw new Error("Failed to delete vehicle");
            navigate("/");
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };
    const onDeleteClick = (vehicleId) => {
        const confirm = window.confirm("Are you sure you want to delete this vehicle?");
        if (!confirm) return;
        deleteVehicle(vehicleId);
        navigate("/");
    };

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`/api/vehicles/${id}`);
                if (!response.ok) throw new Error("Could not fetch vehicle");
                const data = await response.json();
                setVehicle(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchVehicle();
    }, []);

  return (
    <div className="create">

            {vehicle && (
                <div className="rental-preview">
                    <div style={{ marginRight: 22 + 'em' }}>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </div>
                    <h2>{vehicle.vehicleModel}</h2>
                    <ul> Agency: </ul>
                    <li>Agency Name: {vehicle.agency.name}</li>
                    <li>Agency Email: {vehicle.agency.contactEmail}</li>
                    <li>Agency Fleet Size: {vehicle.agency.fleetSize}</li>
                    <p>City: {vehicle.city}</p>
                    <p>State: {vehicle.state}</p>
                    <p>Daily Price: €{vehicle.dailyPrice}</p>
                    <p>Booking Deadline: {vehicle.bookingDeadline}</p>
                    <p>Insurance Policy: {vehicle.insurancePolicy}</p>
                    <p>Category: {vehicle.category}</p>
                    <p>Description: {vehicle.decription}</p>
                    <p>Availability Status: {vehicle.availabilityStatus}</p>
                        <>
                            <br />
                            <button onClick={() => onDeleteClick(vehicle._id)}>Delete</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => navigate(`/edit-vehicle/${id}`)}>Edit</button>
                            <br />
                        </>

                </div>
            )}

        </div>
  );
};

export default VehicleRentalPage;

