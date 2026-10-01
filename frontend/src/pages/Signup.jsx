import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const name = useField("");
  const password = useField("password");
  const username = useField("username");
  const phone_number = useField("");
  const licenseNumber = useField("");
  const date_of_birth = useField("");
  const licenseExpiryDate = useField("");
  const city = useField("");
  const yearsOfExperience = useField(0);
  const { signup, isLoading, error } = useSignup("/api/auth/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const address = {
      licenseExpiryDate,
      city,
      yearsOfExperience
    }
    const credentials = {
          name: name.value,
          username: username.value, 
          password: password.value, 
          phone_number: phone_number.value,
          licenseNumber: licenseNumber.value, 
          date_of_birth: date_of_birth.value, 
          address: {
            licenseExpiryDate: licenseExpiryDate.value,
            city: city.value,
            yearsOfExperience: yearsOfExperience.value
          }
        }
    const user = await signup(credentials);
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} type="text"/>
        <label>Username:</label>
        <input {...username} type="text"/>
        <label>Password:</label>
        <input {...password} type="password"/>
        <label>Phone number:</label>
        <input {...phone_number} type="text"/>
        <label>License number:</label>
        <input {...licenseNumber} type="text"/>
        <label>Date of Birth:</label>
        <input {...date_of_birth} type="date"/>
        <label>License Expiry Date:</label>
        <input {...licenseExpiryDate} type="date"/>
        <label>City:</label>
        <input {...city} type="text"/>
        <label>Years of experience:</label>
        <input {...yearsOfExperience} type="number"/>
        <button disabled={isLoading}>Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;