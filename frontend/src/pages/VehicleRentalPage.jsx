import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const VehicleRentalPage = ({isAuthenticated}) => {

  const { id } = useParams();

    const [vehicle, setVehicle] = useState("");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

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
                    <ul>Agency: <ul>
                    <p>Description: {vehicle.description}</p>
                    <p>Price: €{vehicle.price}</p>
                    <p>Inventory: {vehicle.inventoryCount}</p>
                    <p>Supplier name: {vehicle.supplier.name}</p>
                    <p>Contact Email: {vehicle.supplier.contactEmail}</p>
                    <p>Contact Phone: {vehicle.supplier.contactPhone}</p>
                    <p>Verified: {vehicle.supplier.isVerified ? "✅" : "❌"}</p>
                    {isAuthenticated && (
                        <>
                            <br />
                            <button onClick={() => onDeleteClick(vehicle._id)}>Delete</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => navigate(`/edit-vehicle/${id}`)}>Edit</button>
                            <br />
                        </>
                    )}

                </div>
            )}

        </div>
  );
};

export default VehicleRentalPage;

