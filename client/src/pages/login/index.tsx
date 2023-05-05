import React, { useState } from "react";
import { Card, Form, Row, Space, Typography } from "antd";
import { Layout } from "../../components/layout";
import { CustomInput } from "../../components/custom-input";
import { PasswordInput } from "../../components/password-input/input";
import { CustomButton } from "../../components/custom-button";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message";

export const Login = () => {
  const [error, setError] = useState("");
  const [loginUser, loginUserResult] = useLoginMutation();
  const navigate = useNavigate();
  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (err) {
      const possibleError = isErrorWithMessage(err);
      if (possibleError) {
        setError(err.data.message);
      } else {
        setError("unkown error");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              No account? <Link to={Paths.register}>Register</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
