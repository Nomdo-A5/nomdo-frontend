import React, { useState } from 'react';
import Nav from "../../components/Nav_login";
import './Register.css';
import { Form, Input, Button, Card } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
import Frontpic from '../Login/Frontpic.svg';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();
  const history = useHistory()


  const onFinish = (values) => {
    axios.post(BASE_API_URL + 'register', {
      name: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirm
    })
      .then((response) => {
        if (response.data.status_code === 200) {
          console.log(response);
          history.push("/");
        }
        else {
          console.log("Login failed");
        }

      }, (error) => {
        console.log(error);
      });
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <div className="main-div-login" >
      <Nav />
      <div className="spacer" />
      <div className="main-division-register">
        <div className="left-division-register">
          <div className="inner-left-division-register">
            <div className="welcome-to-nomdo-register">
              Welcome to Nomdo!
            </div>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
            >

              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input
                  width="300px"
                  placeholder="Email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  
                  {
                    required: true,
                    message: 'Please input your Username',
                  },
                ]}
              >
                <Input
                  width="300px"
                  placeholder="Username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item>
                <Button type="success" htmlType="submit" className="login-form-button-register">
                  SIGN UP
                </Button>
                <div className="dont-have-group-register">
                  <div className="dont-have-text-register">
                    Have an account?
                  </div>
                  <div className="dont-have-link-register">
                    <Link to={"./"}>
                      Sign In
                    </Link>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="right-division-register">
          <div className="inner-right-division-register">
            <img src={Frontpic} height={550} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;