import React from "react";
import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import { CustomButton } from "../custom-button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};
// export const EmployeeForm: React.FC<Props<Employee>> = ({
export const EmployeeForm = ({
  onFinish,
  btnText,
  title,
  error,
  employee,
}: Props<Employee>) => {
  // employee-form
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="add-employee" onFinish={onFinish} initialValues={employee}>
        <CustomInput
          type="text"
          name="firstName"
          placeholder="First Name"
        ></CustomInput>
        <CustomInput
          type="text"
          name="lastName"
          placeholder="Last Name"
        ></CustomInput>
        <CustomInput type="number" name="age" placeholder="Age"></CustomInput>
        <CustomInput
          type="text"
          name="address"
          placeholder="Address"
        ></CustomInput>
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
