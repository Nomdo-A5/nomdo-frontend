import React from "react";
import './Login.css';
import NavbarMain from "../../components/Nav_login";
import { useHistory } from "react-router-dom";
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { Form, Input, Button,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginAuth } from "../../utils/authentication";
import { Link } from 'react-router-dom';

import Frontpic from '../Login/Frontpic.svg'

const Login = () => {
  const [password] = React.useState("");
  const [email] = React.useState("");
  const [error, setError] = React.useState(false);
  const history = useHistory()

  React.useEffect(() => {
    if (email || password) {
      setError(false);
    }
    return () => { };
  }, [email, password]);

  const onFinish = (values) => {
    axios.post(BASE_API_URL + 'login', {
      email: values.email,
      password: values.password
    })
      .then((response) => {
        if (response.data.status_code === 200) {
          loginAuth(response.data.access_token);
          console.log(response);
          history.push("/home");
        }
        else {
          console.log("Login failed");
        }

      }, (error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div-login" >
      <NavbarMain />
      <div className="spacer"/>
      <div className="main-division">
        <div className="left-division">
          <div className="inner-left-division">
            <div className="welcome-to-nomdo">
              Welcome to Nomdo!
            </div>
            <Form
              title="Sigin"
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
            <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="success" htmlType="submit" className="login-form-button">
                  SIGN IN
                </Button>
                <div className="dont-have-group">
                  <div className="dont-have-text">
                    Not a member?
                  </div>
                  <div className="dont-have-link">
                    <Link to={"./register"}>
                      Sign Up
                    </Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="right-division">
          <div className="inner-right-division">
            <img src={Frontpic} height={550} alt=""/>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Login;