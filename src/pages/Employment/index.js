import React from "react";
import { Card, Button, Modal, Input, Form, Radio, Select, DatePicker, message } from "antd";
import BaseForm from "../../components/BaseForm";
import { getUserList, addUser } from "../../api";
import util from "../../utils/util";
import BaseTable from "../../components/BaseTable";

const {Option} = Select;
const { TextArea } = Input;

export default class Employment extends React.Component {
  state = {
    pagination: [],
    list: [],
    selectedRowKeys: null,
    visible: false,
    type: null
  };

  params = {
    page: 1,
  };

  formList = [
    {
      type: "INPUT",
      name: "user_name",
      label: "用户名",
      placeholder: "请输入用户名",
      value: "",
    },
    {
      type: "INPUT",
      name: "mobile",
      label: "手机号",
      placeholder: "请输入手机号",
      value: "",
    },
    {
      type: "DATEPICKER",
      name: "join_time",
      label: "入职时间",
      placeholder: "请输入入职时间",
      value: "",
    },
  ];

  handleVisible = (target) => {
    this.setState({
      visible: target,
    });
  };

  onFinish = (values) => {
    console.log(values);
    this.request(values);
  };

  handleFilter = () => {
    this.request();
  };

  request = () => {
    getUserList().then((res) => {
      const { result } = res;
      if (result) {
        this.setState({
          list: result.item_list,
          pagination: util.pagination(res, (current) => {
            this.params.page = current;
            this.request();
          }),
        });
      }
    });
  };

  handleSubmit = () => {
    console.log(this.modalForm.formRef.current.getFieldValue());
    const data = this.modalForm.formRef.current.getFieldValue();
    addUser(data).then(res => {
      console.log(res);
      // eslint-disable-next-line
      if (res.code == 0) {
        this.handleVisible(false);
        message.success('新增成功');
        this.request();
      }
    })
  };

  handleOperate = (operate) => {
    if (operate === "create") {
      this.setState({
        type: operate,
        visible: true,
        title: "创建员工",
      });
    } else if (operate === 'delete') {

    } else if (operate === 'detail') {
      
    } else if (operate === 'edit') {
      
    }
  };

  saveFormRef = (formRef ) => {
    this.modalForm = formRef;
    console.log(this.modalForm, "我要输出")
  }

  componentDidMount() {
    this.request();
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "userName",
      },
      {
        title: "性别",
        dataIndex: "sex",
        render: (sex) => {
          return sex === 2 ? "男" : "女";
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        render: (state) => {
          return {
            "1": "咸鱼",
            "2": "精英",
            "3": "底层人士",
            "4": "高管",
            "5": "大学生",
          }[state];
        },
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render: (state) => {
          return {
            "1": "篮球",
            "2": "足球",
            "3": "羽毛球",
            "4": "跳舞",
            "5": "PY",
            "6": "跳绳",
            "7": "代码",
            "8": "预览",
          }[state];
        },
      },
      {
        title: "生日",
        dataIndex: "birthday",
      },
      {
        title: "联系地址",
        dataIndex: "address",
      },
      {
        title: "早起时间",
        dataIndex: "time",
      },
    ];
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap">
          <BaseForm
            layout="inline"
            ref="form"
            formList={this.formList}
            handleSubmit={this.onFinish}
          />
        </Card>
        <Card>
          <Button type="primary" onClick={() => this.handleOperate("create")}>
            创建员工
          </Button>
          <Button onClick={() => this.handleOperate("edit")}>编辑</Button>
          <Button onClick={() => this.handleOperate("detail")}>员工详情</Button>
          <Button type="danger" onClick={() => this.handleOperate("delete")}>
            删除员工
          </Button>
        </Card>
        <Card title="">
          <BaseTable
            updateSelectedItem={util.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            rowSelectionType={"radio"}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </Card>
        <Modal
          forceRender
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.handleVisible(false)}
        >
          {/* wrappedComponentRef={(inst) => this.myForm = inst} */}
          <UserForm type={this.state.type} ref={this.saveFormRef}/>
        </Modal>
      </div>
    );
  }
}

class UserForm extends React.Component {
  formRef = React.createRef();
  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    return (
      <Form layout="horizontal" ref={this.formRef}>
        <Form.Item label="用户名" name="userName" {...formItemLayout}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="性别" name="sex" {...formItemLayout}>
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="状态" name="state" {...formItemLayout}>
          <Select>
            <Option value={1}>精英</Option>
            <Option value={2}>咸鱼</Option>
            <Option value={3}>韭菜</Option>
            <Option value={4}>废物</Option>
          </Select>
        </Form.Item>
        <Form.Item label="生日" name="birthday" {...formItemLayout}>
          <DatePicker/>
        </Form.Item>
        <Form.Item label="地址" name="address" {...formItemLayout}>
          <TextArea rows={3} placeholder={'请输入联系地址'}/>
        </Form.Item>
      </Form>
    );
  }
}
