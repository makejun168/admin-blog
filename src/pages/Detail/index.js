import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Button } from "antd";

const Demo = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue({ user: "哈哈哈" });
    }
  }, [form, visible]);

  function onClose() {
    setVisible(false);
  }

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Show Dialog
      </Button>
      {/* forceRender Modal 套用 form的时候 无法获取到 this.ref 状态 */}
      <Modal forceRender visible={visible} onOk={onClose} onCancel={onClose}>
        <Form form={form}>
          <Form.Item name="user">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Demo;
