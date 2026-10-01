import useField from "../hooks/useField";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const username = useField("username");
  const password= useField("password");
  const { login, isLoading, error } = useLogin("/api/auth/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    }
    const user = await login(credentials);
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