import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Layout, PageHeader, message } from "antd";
import { Link } from "@reach/router";
import { useNavigate } from "@reach/router";
import { useFirebase } from "../firebase/useFirebase";

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const TextLayout = styled.div``;

function Login() {
  const { login, resetPassword } = useFirebase();
  const [passResetMode, setPassResetMode] = React.useState(false);
  const navigate = useNavigate();

  const onFormFinish = async (values) => {
    try {
      await login(values.email, values.password);
      message.success("Login is successful");
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onResetPasswordClick = async (values) => {
    try{
      await resetPassword(values.email);
      message.success("Password reset link has been sent to your email")
    } catch(error){
      message.error(error.message);
    }
  }

  return (
    <MainLayout>
      {passResetMode? (
        <>
        <PageHeader title="Password reset" />
        <Form onFinish={onResetPasswordClick}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </>
      ):
      (
      <>
        <PageHeader title="Login" />
        <Form onFinish={onFormFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>

        <TextLayout>
          Don't have login yet? Register <Link to="/register">here</Link>
        </TextLayout>

        <TextLayout>
          Forgot your password? Click <a onClick={() => setPassResetMode(true)}>here</a>
        </TextLayout>
      </>
      )}
    </MainLayout>
  );
}

export default Login;
