import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-rental" element={<AddVehicleRentalPage />} />
             <Route path="/vehicles/:id" element={<VehicleRentalPage  />} />
            <Route path="/edit-vehicles/:id" element={ <EditVehicleRentalPage/> } /> 
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

