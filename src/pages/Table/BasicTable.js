import React from "react";
import { Table, Tag, Card, Row, Col } from "antd";
import { getTableList } from "../../api";

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
    key: '1'
  },
  {
    title: "State",
    dataIndex: "state",
    key: '2'
  },
  {
    title: "UserName",
    dataIndex: "userName",
    key: '3'
  },
  {
    title: "Interest",
    dataIndex: "interest",
    key: '4'
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: '5'
  },
  {
    title: "IsMarried",
    dataIndex: "isMarried",
    key: '6'
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: '7'
  },
  {
    title: "Time",
    dataIndex: "time",
    key: '8'
  },
  {
    title: "Address",
    dataIndex: "address",
    key: '9'
  },
];

export default class BaiscTable extends React.Component {
  state = {};

  // 动态获取数据
  request() {
    getTableList({page: 1}).then((res) => {
      console.log(res);
      const {result} = res;
      this.setState({
        list: result.list
      })
    });
  }

  componentDidMount() {
    this.request();
  }

  render() {
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
              <Table columns={columns} dataSource={this.state.list}></Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
