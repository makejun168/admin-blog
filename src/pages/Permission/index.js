import React from "react";
import { Card, Button, Modal, Form, Select, Input, message } from "antd";
import BaseTable from "../../components/BaseTable";
import util from "../../utils/util";
import { getRoleList, roleCreate } from "../../api";

const { Option } = Select;

export default class Permission extends React.Component {
  state = {
    list: [],
    selectedRowKeys: null,
    visible: false,
  };

  formList = [
    {
      type: "INPUT",
      label: "角色名称",
      placeholder: "请输入角色名称",
      name: "role_name",
    },
    {
      type: "SELECT",
      label: "状态",
      name: "status",
      placeholder: "全部",
      list: [
        { id: 0, value: "关闭" },
        { id: 1, value: "开启" },
      ],
    },
  ];

  request = () => {
    getRoleList().then((res) => {
      console.log(res);
      if (res.code === 0) {
        this.setState({
          list: res.result.item_list,
        });
      }
    });
  };

  componentDidMount() {
    this.request();
  }

  saveFormRef = (formRef) => {
    this.modalForm = formRef;
    console.log(this.modalForm);
  };

  handleVisible = (target) => {
    this.setState({
      visible: target,
    });
  };

  handleSubmit = () => {
    console.log(this.modalForm.formRef.current.getFieldValue());
    let data = this.modalForm.formRef.current.getFieldValue();
    roleCreate(data).then((res) => {
      console.log(res);
      if (res.code === 0) {
        this.modalForm.formRef.current.resetFields();
        message.success("创建成功");
        this.this.handleVisible(false);
        this.request();
      }
    });
  };

  render() {
    const columns = [
      { title: "角色ID", dataIndex: "id" },
      { title: "角色名称", dataIndex: "role_name" },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: (time) => util.formateDate(time),
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render: (status) => (status === 1 ? "启用" : "停用"),
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time",
        render: (time) => util.formateDate(time),
      },
      { title: "授权人", dataIndex: "authorize_user_name" },
    ];
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap" title="Permission">
          <Button type="primary" onClick={() => this.handleVisible(true)}>
            创建角色
          </Button>
          <Button>设置权限</Button>
          <Button>用户授权</Button>
        </Card>
        <Card>
          <BaseTable
            updateSelectedItem={util.updateSelectedItem.bind(this)}
            rowSelectionType={"radio"}
            selectedRowKeys={this.state.selectedRowKeys}
            columns={columns}
            dataSource={this.state.list}
          />
        </Card>
        <Modal
          forceRender
          title={"创建角色"}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.handleVisible(false);
            this.modalForm.formRef.current.resetFields();
          }}
        >
          <UserForm ref={this.saveFormRef} />
        </Modal>
      </div>
    );
  }
}

class UserForm extends React.Component {
  formRef = React.createRef();
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <Form.Item label="角色名称" name="roleName" {...formItemLayout}>
          <Input placeholder={"请输入用户名"}></Input>
        </Form.Item>
        <Form.Item label="状态" name="state" {...formItemLayout}>
          <Select>
            <Option value={0}>非启用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
