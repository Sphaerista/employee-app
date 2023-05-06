import React from "react";
import { Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import styles from "./index.module.css";
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomButton } from "../custom-button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Logout
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton type="ghost" icon={<UserOutlined />}>
              Register
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="ghost" icon={<LoginOutlined />}>
              Login
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
