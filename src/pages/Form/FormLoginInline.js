import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Modal, Button, Avatar, Typography, Card } from 'antd';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [form, prevVisible, visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title="Basic Drawer" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="name"
          label="User Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="User Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const FormLoginInLine = () => {
  const [visible, setVisible] = useState(false);

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <Card style={{ width: "100%" }}>
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === 'userForm') {
            const { basicForm } = forms;
            const users = basicForm.getFieldValue('users') || [];
            basicForm.setFieldsValue({
              users: [...users, values],
            });
            setVisible(false);
          }
        }}
      >
        <Form name="basicForm" onFinish={onFinish}>
          <Form.Item
            name="group"
            label="Group Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User List"
            shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
          >
            {({ getFieldValue }) => {
              const users = getFieldValue('users') || [];
              return users.length ? (
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="user">
                      <Avatar icon={<UserOutlined />} />
                      {user.name} - {user.age}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                  ( <SmileOutlined /> No user yet. )
                </Typography.Text>
              );
            }}
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button
              htmlType="button"
              style={{
                margin: '0 8px',
              }}
              onClick={showUserModal}
            >
              Add User
            </Button>
          </Form.Item>
        </Form>

        <ModalForm visible={visible} onCancel={hideUserModal} />
      </Form.Provider>
    </Card>
  );
};

export default FormLoginInLine;