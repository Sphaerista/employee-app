import { Button, Result, Row } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "User created",
  updated: "User updated",
  removed: "User removed",
};

export const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? "success" : 404}
        title={status ? Statuses[status] : "Status not found"}
        extra={
          <Button key="dashboard">
            <Link to={"/"}>On main page</Link>
          </Button>
        }
      />
    </Row>
  );
};
