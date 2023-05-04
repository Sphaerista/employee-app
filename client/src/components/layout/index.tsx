import React from "react";
import { Layout as AntdLayout } from "antd";
import styles from "./index.module.css";
import { Header } from "../header";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntdLayout.Content style={{ height: "100%" }}>
        {children}
      </AntdLayout.Content>
    </div>
  );
};
