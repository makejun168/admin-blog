import React from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Select,
  Input,
  message,
  Tree,
  Transfer,
} from "antd";
import BaseTable from "../../components/BaseTable";
import util from "../../utils/util";
import {
  getRoleList,
  roleCreate,
  roleEdit,
  getRoleUserList,
  editRoleUser,
} from "../../api";
import { TreeNode } from "antd/lib/tree-select";
import menuConfig from "../../resource/menuConfig";

const { Option } = Select;

export default class Permission extends React.Component {
  state = {
    list: [],
    selectedRowKeys: null,
    visible: false,
    settingVisible: false,
    roleVisible: false,
    menus: [],
    mockData: [],
    targetKeys: [],
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
  };

  saveSettingForm = (formRef) => {
    this.settingForm = formRef;
  };

  handleVisible = (target) => {
    this.setState({
      visible: target,
      settingVisible: target,
      roleVisible: target,
    });
  };

  // 确定角色管理按钮
  handleRoleSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedRowKeys[0];
    editRoleUser(data).then((res) => {
      console.log(res);
      message.success("编辑成功");
      this.handleVisible(false);
      this.request();
    });
  };

  handleEditPerSubmit = () => {
    let data = {
      ...this.settingForm.formRef.current.getFieldValue(),
      menu: this.state.menus,
    };
    roleEdit({ ...data }).then((res) => {
      this.settingForm.formRef.current.resetFields();
      message.success("编辑成功");
      this.handleVisible(false);
      this.request();
    });
  };

  handleSubmit = () => {
    let data = this.modalForm.formRef.current.getFieldValue();
    roleCreate(data).then((res) => {
      if (res.code === 0) {
        this.modalForm.formRef.current.resetFields();
        message.success("创建成功");
        this.handleVisible(false);
        this.request();
      }
    });
  };

  validateItem = () => {
    if (!this.state.selectedRowKeys) {
      message.error("请选择角色选项");
      return false;
    }
    return true;
  };

  // 设置权限
  handleSetting = () => {
    if (this.validateItem()) {
      this.setState({
        settingVisible: true,
      });
      const current = this.state.list.find(
        (item) => item.id === this.state.selectedRowKeys[0]
      );
      this.setState({
        menus: current.menus,
      });
      this.settingForm.formRef.current.setFieldsValue({
        roleName: current.role_name,
        status: current.status,
      });
    }
  };

  //分配用户权限
  handleUserAuth = () => {
    if (this.validateItem()) {
      let id = this.state.selectedRowKeys[0];
      this.getRoleList(id);
      this.setState({
        roleVisible: true,
      });
    }
  };

  // 查询用户的角色信息
  getRoleList = (id) => {
    getRoleUserList({ id }).then((res) => {
      console.log(res);
      const mockData = res.result.map((item) => ({
        key: item.user_id,
        title: item.user_name,
        status: item.status,
      }));
      const targetKeys = mockData
        .filter((item) => +item.status === 0)
        .map((item) => item.key);
      this.setState({
        mockData,
        targetKeys: targetKeys,
      });
    });
  };

  // 设置menuInfo
  setMenuInfo = (data) => {
    this.setState({
      menus: data,
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
          <Button
            type="primary"
            onClick={() =>
              this.setState({
                visible: true,
              })
            }
          >
            创建角色
          </Button>
          <Button onClick={this.handleSetting}>设置权限</Button>
          <Button type="danger" onClick={this.handleUserAuth}>
            用户授权
          </Button>
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
        <Modal
          forceRender
          title={"设置权限"}
          visible={this.state.settingVisible}
          onOk={this.handleEditPerSubmit}
          onCancel={() => {
            this.handleVisible(false);
            this.settingForm.formRef.current.resetFields();
          }}
        >
          <SettingForm
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menus: checkedKeys,
              });
            }}
            menus={this.state.menus}
            ref={this.saveSettingForm}
          />
        </Modal>
        <Modal
          forceRender
          title={"角色管理"}
          visible={this.state.roleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.handleVisible(false);
          }}
        >
          <TransferForm
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys,
              });
            }}
            mockData={this.state.mockData}
            targetKeys={this.state.targetKeys}
          />
        </Modal>
      </div>
    );
  }
}

class TransferForm extends React.Component {
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.props.patchUserInfo(nextTargetKeys);
    console.log("targetKeys: ", nextTargetKeys);
    console.log("direction: ", direction);
    console.log("moveKeys: ", moveKeys);
  };

  render() {
    const { targetKeys, mockData } = this.props;
    // console.log(targetKeys);
    return (
      <Transfer
        listStyle={{ width: 200, height: 400 }}
        dataSource={mockData}
        targetKeys={targetKeys}
        titles={["待选用户", "已选用户"]}
        onChange={this.handleChange}
        // onSelectChange={this.handleSelectChange}
        render={(item) => item.title}
      />
    );
  }
}

class SettingForm extends React.Component {
  formRef = React.createRef();

  state = { checkedKeys: [] };

  // 渲染树形结构
  renderTreeNode = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNode(item.children)}
          </TreeNode>
        );
      } else {
        return <TreeNode title={item.title} key={item.key} />;
      }
    });
  };

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <Form.Item label="角色名称" name="roleName" {...formItemLayout}>
          <Input disabled placeholder={"请输入用户名"}></Input>
        </Form.Item>
        <Form.Item label="状态" name="status" {...formItemLayout}>
          <Select>
            <Option value={0}>非启用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          {/* treeData={menuConfig} */}
          <Tree
            checkable
            defaultExpandAll
            treeData={menuConfig}
            checkedKeys={this.props.menus}
            onCheck={(checkKeys) => {
              this.onCheck(checkKeys);
            }}
          >
            {/* <TreeNode title="平台权限" key="platform_all">
              {this.renderTreeNode(menuConfig)}
            </TreeNode> */}
          </Tree>
        </Form.Item>
      </Form>
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
        <Form.Item
          id="role"
          label="角色名称"
          name="roleName"
          {...formItemLayout}
        >
          <Input placeholder={"请输入用户名"}></Input>
        </Form.Item>
        <Form.Item label="状态" name="status" {...formItemLayout}>
          <Select>
            <Option value={0}>非启用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
