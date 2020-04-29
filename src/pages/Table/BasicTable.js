import React from "react";
import { Table, Tag, Card, Row, Col, Button, Modal, message } from "antd";
import { getTableList } from "../../api";
import util from "../../utils/util";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "1",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "2",
    render(state) {
      // 定义字典
      let config = {
        "1": "<。)#)))≦",
        "2": "m( =∩王∩= )m",
        "3": "o(=•ェ•=)m",
        "4": "U•ェ•*U",
        "5": "(*^_^*)",
      };
      return config[state];
    },
  },
  {
    title: "UserName",
    dataIndex: "userName",
    key: "3",
  },
  {
    title: "Interest",
    dataIndex: "interest",
    key: "4",
    render(interest) {
      // 定义字典
      let config = {
        "1": "游泳",
        "2": "跳水",
        "3": "篮球",
        "4": "足球",
        "5": "多人运动",
        "6": "跳绳",
        "7": "体操",
        "8": "铁人三项",
      };
      return config[interest];
    },
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "IsMarried",
    dataIndex: "isMarried",
    key: "6",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "7",
    render(sex) {
      return sex === 1 ? "男" : "女";
    },
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "8",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "9",
  },
  // {
  //   title: '操作',
  //   render: (current) => <Button type="danger" onClick={() => this.handleClick(current)}>删除</Button>
  // }
];

export default class BasicTable extends React.Component {
  state = {
    selectedRowKeys: [],
    selectedRow: null,
  };

  params = {
    page: 1
  }

  // 动态获取数据
  request() {
    getTableList({ page: this.params.page }).then((res) => {
      // console.log(res);
      const { result } = res;
      this.setState({
        list: result.list,
        pagination: util.pagination(res, current => {
          this.params.page = current;
          this.request();
        })
      });
    });
  }

  handleClickDel = () => {
    if (this.state.selectedRow.length > 0) {
      Modal.confirm({
        title: "tips",
        content: "Do you want to delete these items?",
        onOk: () => {
          message.success("删除成功");
          this.request(this.params.page);
          this.setState({
            selectedRowKeys: [],
            selectedRow: null
          });
          // console.log(this.state.selectedRow);
        },
        onCancel() {},
      });
    }
  };

  componentDidMount() {
    this.request(this.params.page);
  }

  render() {
    const rowSelection = {
      // 'radio'
      type: "checkbox",
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRow: selectedRows,
        });
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name,
      }),
    };
    return (
      <div style={{ width: "100%" }}>
        <Row>
          <Col span="24">
            <Card className="card-wrap">
              {/* Column */}
              <Table
                pagination={false}
                bordered
                dataSource={data}
                tableLayout={"auto"}
              >
                <ColumnGroup title="Name">
                  <Column
                    title="First Name"
                    dataIndex="firstName"
                    key="firstName"
                  />
                  <Column
                    title="Last Name"
                    dataIndex="lastName"
                    key="lastName"
                  />
                </ColumnGroup>
                <Column title="Age" dataIndex="age" key="age" />
                <Column title="Address" dataIndex="address" key="address" />
                <Column
                  title="Tags"
                  dataIndex="tags"
                  key="tags"
                  render={(tags) => (
                    <span>
                      {tags.map((tag) => (
                        <Tag color="blue" key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </span>
                  )}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <span>
                      <a
                        href="/#/admin/table/basic"
                        alt=""
                        style={{ marginRight: 16 }}
                      >
                        Invite {record.lastName}
                      </a>
                      <a href="/#/admin/table/basic" alt="">
                        Delete
                      </a>
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <Table
                pagination={this.state.pagination}
                rowKey={(record) => record.id}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.state.list}
              ></Table>
              <Button type="danger" onClick={this.handleClickDel}>
                删除多行
              </Button>
            </Card>
          </Col>
          <Col span={24}></Col>
        </Row>
        <Row>
          <Col span={24}></Col>
        </Row>
      </div>
    );
  }
}
