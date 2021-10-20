import React from "react";
import './style/Login.css';
import Nav from "./Nav";
import Google from "./style/Google.png";
import { Link, useHistory } from "react-router-dom";
import { loginAuth } from "../utils/authentication";
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const history = useHistory()

  React.useEffect(() => {
    if (username || password) {
      setError(false);
    }
    return () => {};
  }, [username, password]);

  const _onSubmit = () => {
    if (username === "nomdo" && password === "123") {
      loginAuth({
        username: username,
      });
      history.push("/Dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="main-div-login">
      <Nav />
      <div className="body">
        <form className="form" action="login.php" method="post">
          <h3 className="judullogin">Sign In</h3>
            <div className="main-form-fill">
              <div className="form-group">
                <h3 className="labellogo">Username</h3>
                <input type="username" name="username" id="username" className="form-control"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <h3 className="labellogo">Password</h3>
                <input name="password" id="password" className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a href="" className="forgotlogin"> Forgot Password?</a>
              
                <p className="button-login" variant="primary" onClick={_onSubmit}>
                  <div className="signin-text">
                    Sign In
                  </div>
                </p>
              
              <div>
                <button type="submit" className="button-google"><img src={Google} alt=""  className="gambarlogin" />  
                  <div className="google-sign-text">
                    Sign in with Google
                  </div>
                </button>
              </div>
              <h5 className="linklogin">Don’t have account ?<a href=""><Link to="/Register"> Sign up</Link></a></h5>
            </div>
          </form>
      </div>
            <div className="error-alet">
              {error &&
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username atau Password salah!',
              }).then(function() {
                window.location = "/";
              })
              }
            </div>
    </div>
  );
};

export default Login;