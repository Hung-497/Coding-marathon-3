import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };
  return (
    <nav className="navbar">
      <h1>Vehicle search</h1>
      <a href="/">Home</a>
        {isAuthenticated && (
          <div>
            <Link to="/add-rental">Add Vehicle</Link>
            <a><span>Welcome {JSON.parse(localStorage.getItem("user")).email}!</span></a>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
    </nav>
  );
}

export default Navbar;

