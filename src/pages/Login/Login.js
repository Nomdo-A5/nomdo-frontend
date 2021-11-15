import React from "react";
import './Login.css';
import Nav from "../../components/Nav";
import { useHistory } from "react-router-dom";
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { Form, Input, Button,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginAuth } from "../../utils/authentication";
import { Link } from 'react-router-dom';

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
      <Nav />
      <div className="body" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Card title="Signin" bordered className="login-card">
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
              <a className="login-form-forgot">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <div className="dont-have-text">
                Don't have an account yet?
                <div className="register-text">
                  <Link to={"./register"}>
                    <a>Register now!</a>
                  </Link>
                </div>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;