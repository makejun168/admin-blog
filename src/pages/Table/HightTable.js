import React from "react";
import { Table, Card, Row, Col, Button, Modal, message, Badge } from "antd";
import { getTableList } from "../../api";
import util from "../../utils/util";

const columns2 = [
  {
    title: "Id",
    dataIndex: "id",
    key: "1",
    fixed: 'left',
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
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
    key: "5",
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
];

const columns3 = [
  {
    title: "Id",
    dataIndex: "id",
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "State",
    dataIndex: "state",
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

export default class HightTable extends React.Component {
  state = {
    selectedRowKeys: [],
    selectedRow: null,
  };

  params = {
    page: 1,
  };

  // 动态获取数据
  request() {
    getTableList({ page: this.params.page }).then((res) => {
      // console.log(res);
      const { result } = res;
      this.setState({
        list: result.list,
        pagination: util.pagination(res, (current) => {
          console.log(current);
          this.params.page = current;
          this.request();
        }),
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
            selectedRow: null,
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

  handleDel = (text, record, index) => {
    console.log(record);
    console.log(index);
    Modal.confirm({
      title: 'Tips',
      content: 'are u sure delete this item',
      onOk: () => {
        message.success(`success${record.userName}`);
      }
    })
  }

  render() {
    const columns = [
      {
        title: "Id",
        dataIndex: "id"
      },
      {
        title: "State",
        dataIndex: "state",
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
            "1": <Badge status="success" text="游泳"/>,
            "2": <Badge status="error" text="知识" />,
            "3": <Badge status="default" />,
            "4": <Badge status="processing" />,
            "5": <Badge status="warning" />,
            "6": <Badge count={5}><a href="''" alt='' className="head-example"/></Badge>,
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
        title: "Control",
        render: (text, record, index) => {
          return (
            <Button onClick={() => { this.handleDel(text, record, index) }} >删除</Button>
            // <Button onClick={this.handleClick} ></Button>
          )
        }
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
    return (
      <div style={{ width: "100%" }}>
        <Row>
          <Col span="24">
            <Card className="card-wrap">
              {/* Column */}
              <Table
                rowKey={(record) => record.id}
                pagination={false}
                bordered
                columns={columns}
                dataSource={this.state.list}
                tableLayout={"auto"}
                scroll={{ y: 240 }}
              ></Table>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <Table
                rowKey={(record) => record.id}
                columns={columns2}
                dataSource={this.state.list}
                scroll={{ x: 2640 }}
              ></Table>
            </Card>
          </Col>
          <Col span={24}></Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card>
              <Table
                rowKey={(record) => record.id}
                columns={columns3}
                dataSource={this.state.list}
              ></Table>
            </Card>
          </Col>
          <Col span={24}></Col>
        </Row>
      </div>
    );
  }
}
