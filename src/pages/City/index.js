import React from "react";
import { Card, Form, Select, Button, Table, Modal } from "antd";
import { getOpenCity } from "../../api";
import util from "../../utils/util";

const { Option } = Select;

class OpenCityForm extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 10,
      },
    };
    // horizontal
    return (
      <Form layout={"horizontal"}>
        <Form.Item label="城市" {...formItemLayout}>
          <Select placeholder="Select a option">
            <Option value="1">北京</Option>
            <Option value="2">深圳</Option>
            <Option value="3">上海</Option>
          </Select>
        </Form.Item>
        <Form.Item label="营运模式" {...formItemLayout}>
          <Select placeholder="Select a option">
            <Option value="1">自营</Option>
            <Option value="2">加盟</Option>
          </Select>
        </Form.Item>
        <Form.Item label="用车模式" {...formItemLayout}>
          <Select placeholder="Select a option">
            <Option value="1">指定停车点</Option>
            <Option value="2">禁停区</Option>
          </Select>
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

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
          <Select placeholder="全部" style={{ width: 80 }}>
            <Option value="1">全部</Option>
            <Option value="2">自营</Option>
            <Option value="3">加盟</Option>
          </Select>
        </Form.Item>
        <Form.Item label="加盟商授权状态" name="op_mode">
          <Select placeholder="全部" style={{ width: 80 }}>
            <Option value="1">全部</Option>
            <Option value="2">已授权</Option>
            <Option value="3">未授权</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button type="warning">重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default class City extends React.Component {
  state = {
    list: [],
    pagination: {},
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

  // 新增城市
  handleSubmit = () => {
    this.setState({
      showModal: false,
    });
  };

  // 开通城市
  openCity = () => {
    this.setState({
      showModal: true,
    });
  };
  render() {
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
      },
      {
        title: "营运模式",
        dataIndex: "op_mode",
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
            visible={this.state.showModal}
            onOk={this.handleSubmit}
            onCancel={() => {
              this.setState({
                showModal: false,
              });
            }}
          >
            <OpenCityForm />
          </Modal>
        </Card>
      </div>
    );
  }
}
