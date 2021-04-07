import { LoginIcon } from "../../assets";
import textResources from "../../textResources";

export const Login = () => {
  return (
    <div className="login_container">
      <div className="login_content">
        <form>
          <h2>{textResources.Login_label}</h2>
          <p className="label_email">{textResources.Login_label_email}</p>
          <label>
            <input type="text" name="email" className="login_input" />
          </label>
          <div className="submit_container">
            <img className="loginIcon" src={LoginIcon} alt="login-icon"></img>
            <p className="label_login">{textResources.Login_label}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
