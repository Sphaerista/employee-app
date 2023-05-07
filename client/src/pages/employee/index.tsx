import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { selectUser } from "../../features/auth/authSlice";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { Layout } from "../../components/layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import { CustomButton } from "../../components/custom-button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/error-message";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteEmployee = async () => {
    hideModal();
    try {
      if (data) {
        await removeEmployee(data.id).unwrap();
        navigate(`${Paths.status}/removed`);
      }
    } catch (error) {
      const possibleError = isErrorWithMessage(error);
      if (possibleError) {
        setError(error.data.message);
      } else {
        setError("Unknown error");
      }
    }
  };

  if (isLoading) {
    return <span>Loading</span>;
  }
  if (!data) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <Descriptions title="Employee info" bordered>
        <Descriptions.Item label="Name" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>

      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Edit
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Remove
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Comfirm the removal"
        open={isModalOpen}
        onOk={handleDeleteEmployee}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Sure to remove?
      </Modal>
    </Layout>
  );
};
