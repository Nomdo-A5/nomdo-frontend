import { Link } from "react-router-dom";
import Google from "./style/Google.png";
import Nav from "./Nav";
import "./style/Register.css";

function Register() {
  return (
    <div className="main-div-register">
      <Nav />
      <div class="bodyregis">
        <form className="formregis">
          <h3 className="judulregis">Sign Up</h3>
          <div className="main-form-fill">
            <div className="form-groupregis">
              <h3 className="labellogoregis">Username</h3>
              <input type="text" name="username" id="username" className="form-control form-controlregis" />
            </div>
            <div className="form-groupregis">
              <h3 className="labellogoregis">Email</h3>
              <input type="email" name="email" id="email" className="form-control form-controlregis" />
            </div>
            <div className="form-groupregis">
              <h3 className="labellogoregis">Phone Number</h3>
              <input type="text" name="phone" id="phone" className="form-control form-controlregis" />
            </div>
            <div className="form-groupregis">
              <h3 className="labellogoregis">Password</h3>
              <input type="password" name="password" id="password" className="form-control form-controlregis" />
            </div>
            <div className="form-groupregis">
              <h3 className="labellogoregis">Confirmation Password</h3>
              <input type="password" name="passwordconfirmation" id="passwordconfirmation" className="form-control form-controlregis" />
            </div>
            <Link to="/Dashboard"><button type="submit" className="btnregis btn-block">Sign Up</button></Link>
            <div>
              <button type="submit" className="btn1regis btn-block"><img src={Google} alt=""  className="gambarregis" />Sign in with Google</button>
            </div>
          </div>
          <h5 className="linkregis">Have an account ?<a href=""><Link to="/"> Sign In</Link></a></h5>
        </form>
      </div>
    </div>
  );
}

export default Register;