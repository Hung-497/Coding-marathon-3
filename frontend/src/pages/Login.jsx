import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const username = useField("");
  const password= useField("");
  const { login, isLoading, error } = useLogin("/api/auth/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = await login({ username, password });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input type="text" {...username} /> 
        <label>Password:</label>
        <input type="password" {...password} />
        <button disabled={isLoading}>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;