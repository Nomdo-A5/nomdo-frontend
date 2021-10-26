import React, { useState } from 'react';
import Nav from "../Nav";
import './Register.css';
import {
  Form,
  Input,
  Button,
  Card
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/urls';
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
      name : values.username,
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
    <div className="div-register-page">
      <Nav/>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Card title="Sign up" style={{ width: 450 }} className="register-card">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
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
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
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
              <Input.Password />
            </Form.Item>


            <Form.Item {...tailFormItemLayout}>
              <div className="register-form-button">
                <Button type="primary" htmlType="submit" className="sign-up-button">
                  Sign up
                </Button>
                <div className="already-have-text">
                  Already have an account?  
                </div>
              </div>
              <div className="sign-in-text">
                <Link to={"/"}>
                    <a href=""> Signin now!</a>
                </Link>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;