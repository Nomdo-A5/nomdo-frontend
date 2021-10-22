import React from "react";
import './Login.css';
import Nav from "../Nav";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { BASE_API_URL } from "../../constants/urls";
import axios from "axios";
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginAuth } from "../../utils/authentication";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
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
          if(response.data.status_code == 200){
            loginAuth({
              token: response.data.access_token,
            });
            console.log(response);
            history.push("/Dashboard");
          }
          else{
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
      <Card title="Signin" bordered>
        <Form
        title = "Sigin"
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
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
        </Card>
      </div>
      <div className="error-alet">
        {error &&
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah!',
          }).then(function () {
            window.location = "/";
          })
        }
      </div>
    </div>
  );
};

export default Login;