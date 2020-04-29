import React from "react";
import { Card, Form, Select, Button, Table, Modal, message } from "antd";
import { getOpenCity, addOpenCity } from "../../api";
import util from "../../utils/util";

const { Option } = Select;

class FilterForm extends React.Component {
  formRef = React.createRef();

  onGenderChange = (value) => {
    this.formRef.current.setFieldsValue({
      // note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  onFinish = (values) => {
    console.log(values);
  };

  getFormData = () => {
    console.log(this.formRef.current.getFieldValue());
  };

  render() {
    // const {}
    return (
      <Form
        layout="inline"
        name="search"
        ref={this.formRef}
        onFinish={this.onFinish}
      >
        <Form.Item label="城市" name="city_id">
          <Select placeholder="Select a option" style={{ width: 80 }}>
            <Option value="1">北京</Option>
            <Option value="2">深圳</Option>
            <Option value="3">上海</Option>
          </Select>
        </Form.Item>
        <Form.Item label="用车区域" name="mode">
          <Select placeholder="全部" style={{ width: 120 }}>
            <Option value="">全部</Option>
            <Option value="2">指定停车区域模式</Option>
            <Option value="3">禁停区模式</Option>
          </Select>
        </Form.Item>
        <Form.Item label="营运模式" name="op_mode">
          <Select placeholder="全部" style={{ width: 120 }}>
            <Option value="1">全部</Option>
            <Option value="2">自营</Option>
            <Option value="3">加盟</Option>
          </Select>
        </Form.Item>
        <Form.Item label="加盟商授权状态" name="status">
          <Select placeholder="全部" style={{ width: 120 }}>
            <Option value="1">全部</Option>
            <Option value="2">已授权</Option>
            <Option value="3">未授权</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          {/* htmlType="submit"  */}
          <Button type="primary" onClick={this.getFormData}>
            查询
          </Button>
          <Button type="warning">重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default class City extends React.Component {
  openFormRef = React.createRef();
  state = {
    list: [],
    pagination: {},
    showModal: false,
  };

  params = {
    page: 1,
  };

  componentDidMount() {
    this.request();
  }

  // API LIST
  request = () => {
    getOpenCity({ page: this.params.page }).then((res) => {
      console.log(res);
      this.setState({
        list: res.result.item_list,
        pagination: util.pagination(res, (current) => {
          this.params.page = current;
          this.request();
        }),
      });
    });
  };

  setVisible = (visible) => {
    this.setState({
      showModal: visible,
    });
  };

  // 开通城市
  openCity = () => {
    this.setVisible(true);
  };

  // 新增城市
  handleSubmit = () => {
    let data = this.openFormRef.current.getFieldValue();
    console.log(data);
    addOpenCity().then((res) => {
      // console.log(res);
      message.success(res.result);
      this.setVisible(false);
      this.request();
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10,
      },
    };
    const columns = [
      {
        title: "城市ID",
        dataIndex: "id",
      },
      {
        title: "城市名称",
        dataIndex: "name",
      },
      {
        title: "用车模式",
        dataIndex: "mode",
        render(target) {
          return target === 1 ? "停车点" : "禁停区";
        },
      },
      {
        title: "营运模式",
        dataIndex: "op_mode",
        render(target) {
          return target === 1 ? "自营" : "加盟";
        },
      },
      {
        title: "授权加盟商",
        dataIndex: "franchisee_name",
      },
      {
        title: "城市管理员",
        dataIndex: "city_admins",
        render: (arr) => {
          return arr
            .map((item) => {
              return item.user_name;
            })
            .join(", ");
        },
      },
      {
        title: "操作时间",
        dataIndex: "update_time",
        render: util.formateDate
      },
      {
        title: "操作人",
        dataIndex: "sys_user_name",
      },
    ];
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap">
          <FilterForm></FilterForm>
        </Card>
        <Card>
          <Button type="primary" onClick={this.openCity}>
            OpenCity
          </Button>
        </Card>
        <Card>
          <Table
            bordered
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
          <Modal
            title="open city"
            forceRender={true}
            visible={this.state.showModal}
            onOk={this.handleSubmit}
            onCancel={() => this.setVisible(false)}
          >
            <Form
              ref={this.openFormRef}
              onFinish={this.handleSubmit}
              layout={"horizontal"}
            >
              <Form.Item label="城市" {...formItemLayout} name="city">
                <Select placeholder="Select a option">
                  <Option value="1">北京</Option>
                  <Option value="2">深圳</Option>
                  <Option value="3">上海</Option>
                </Select>
              </Form.Item>
              <Form.Item label="营运模式" {...formItemLayout} name="mode">
                <Select placeholder="Select a option">
                  <Option value="1">自营</Option>
                  <Option value="2">加盟</Option>
                </Select>
              </Form.Item>
              <Form.Item label="用车模式" {...formItemLayout} name="op_mode">
                <Select placeholder="Select a option">
                  <Option value="1">指定停车点</Option>
                  <Option value="2">禁停区</Option>
                </Select>
              </Form.Item>
              <Form.Item {...formItemLayout}>
                {/* htmlType="submit" */}
                <Button type="primary" onClick={this.handleSubmit}>
                  Add
                </Button>
                <Button
                  type="danger"
                  onClick={() => {
                    this.openFormRef.current.resetFields();
                  }}
                >
                  reset
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    );
  }
}
