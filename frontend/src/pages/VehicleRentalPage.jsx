import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const VehicleRentalPage = ({isAuthenticated}) => {

    const { id } = useParams();
    const [vehicle, setVehicle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    const deleteVehicle = async (vehicleId) => {
        try {
            const res = await fetch(`/api/vehicleRentals/${vehicleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
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
                const response = await fetch(`/api/vehicleRentals/${id}`);
                if (!response.ok) throw new Error("Could not fetch vehicle");
                const data = await response.json();
                setVehicle(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [id]);

    return (
        <div className="create">
             {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h2>{product.productName}</h2>
                    <p>Category: {product.category}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: {product.price}</p>
                    <h4>Supplier:</h4>
                    <p>Inventory: {product.inventoryCount}</p>
                    <p>Supplier Name: {product.supplier.name}</p>
                    <p>Supplier Email: {product.supplier.contactEmail}</p>
                    <p>Supplier Phone #: {product.supplier.contactPhone}</p>
                    <p>Verified Status: {product.supplier.isVerified ? "Yes" : "No"}</p>
                    <button onClick={() => handleGoHome()}>Back</button>
                    {isAuthenticated && (
                        <>
                            <button onClick={() => onDeleteClick(product._id)}>Delete</button>
                            <button onClick={() => navigate(`/edit/${product._id}`)}>Edit</button>
                        </>
                    )}
                </>
            )}

        </div>
    );
};

export default VehicleRentalPage;

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
                    <ul>Location</ul>
                    <li>City: {vehicle.location.city}</li>
                    <li>State: {vehicle.location.state}</li>
                    <p>Daily Price: €{vehicle.dailyPrice}</p>
                    <p>Booking Deadline: {vehicle.bookingDeadline
                        ? new Date(vehicle.bookingDeadline).toLocaleDateString()
                        : "—"}
                    </p>
                    <p>Insurance Policy: {vehicle.insurancePolicy}</p>
                    <p>Category: {vehicle.category}</p>
                    <p>Description: {vehicle.description}</p>
                    <p>Listing Date: {vehicle.listingDate ? new Date(vehicle.listingDate).toLocaleDateString()
                        : "—"}</p>
                    <p>Availability Status: {vehicle.availabilityStatus}</p>
                    {isAuthenticated && (
                    <>
                        <br />
                        <button onClick={() => onDeleteClick(vehicle._id)}>Delete</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={() => navigate(`/edit-vehicles/${id}`)}>Edit</button>
                        <br />
                    </>
                    )}
                </div>
                )}
