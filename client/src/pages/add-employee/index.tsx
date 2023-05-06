import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout";
import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const AddEmployee = () => {
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [AddEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await AddEmployee(data).unwrap();
      navigate(`${Paths.status}/created`);
    } catch (err) {
      const possibleError = isErrorWithMessage(err);

      if (possibleError) {
        setError(err.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          btnText="Add"
          onFinish={handleAddEmployee}
          title="Add Employee"
          error={error}
        />
      </Row>
    </Layout>
  );
};
