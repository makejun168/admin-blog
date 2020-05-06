import React from "react";
import { Card, Form, Button, Table, Modal, message } from "antd";
import { getOrderList, getBikeInfo, finishOrder } from "../../api";
import util from "../../utils/util";
import BaseForm from "../../components/BaseForm";

export default class Order extends React.Component {
  state = {
    list: [],
    visible: false,
    orderInfo: {},
    selectedRowKeys: null,
    selectedRow: [],
  };

  layout = "inline";

  params = {
    page: 1,
  };

  formList = [
    {
      type: "SELECT",
      name: "city",
      label: "城市",
      placeholder: "全部",
      value: 1,
      list: [
        { value: 0, name: "全部" },
        { value: 1, name: "北京" },
        { value: 2, name: "上海" },
        { value: 3, name: "深圳" },
      ],
    },
    {
      type: "时间查询",
    },
    {
      type: "SELECT",
      name: "status",
      label: "订单状态",
      placeholder: "全部",
      value: 1,
      list: [
        { value: 0, name: "全部" },
        { value: 1, name: "进行中" },
        { value: 2, name: "结束行程" },
      ],
    },
  ];

  componentDidMount() {
    this.request();
  }

  // 打开结束订单模态框
  handleConfirm = () => {
    if (!this.state.selectedRow.length) {
      Modal.info({
        title: "提示",
        content: "请选择一条订单进行结束",
      });
      return;
    }
    const { id } = this.state.selectedRow[0];
    getBikeInfo({ orderId: id }).then((res) => {
      console.log(res);
      this.setState({
        orderInfo: res.result,
        visible: true,
      });
    });
  };

  // 订单结束确认
  handleFinishOrder = () => {
    const { id } = this.state.selectedRow[0];
    finishOrder({ orderId: id }).then((res) => {
      console.log(res);
      message.success("订单结束成功");
      this.setState({
        visible: false,
        selectedRow: null,
        selectedRowKeys: [],
      });
      this.request();
    });
  };

  request = () => {
    getOrderList({ page: this.params.page }).then((res) => {
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

  onFinish = (values) => {
    console.log(values);
    this.request(values);
  };

  openOrderDetail = () => {
    console.log(this.state.selectedRow);
    const { id } = this.state.selectedRow[0];
    if (id === null) {
      Modal.info({
        title: "提示",
        content: "请选择一条订单进行结束",
      });
      return;
    }
    window.location.href = `#/common/order/detail/${id}`;
  };

  render() {
    const rowSelection = {
      // 'radio'
      type: "radio",
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRow: selectedRows,
        });
      },
    };
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn",
      },
      {
        title: "车辆编号",
        dataIndex: "bike_cn",
      },
      {
        title: "用户名",
        dataIndex: "user_name",
      },
      {
        title: "手机号",
        dataIndex: "order_sn",
      },
      {
        title: "里程",
        dataIndex: "distance",
        render: (distance) => {
          return distance / 1000 + "km";
        },
      },
      {
        title: "行驶时长",
        dataIndex: "total_time",
        render: (total_time) => {
          return total_time / 1000 + "km";
        },
      },
      {
        title: "状态",
        dataIndex: "status",
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
      },
      {
        title: "订单金额",
        dataIndex: "total_fee",
      },
      {
        title: "实付金额",
        dataIndex: "user_pay",
      },
    ];
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap">
          <BaseForm
            layout={this.layout}
            formList={this.formList}
            handleSubmit={this.onFinish}
          />
        </Card>
        <Card>
          <Button type="primary" onClick={this.openOrderDetail}>
            订单详情
          </Button>
          <Button type="danger" onClick={this.handleConfirm}>
            结束订单
          </Button>
        </Card>
        <Card>
          <Table
            rowSelection={rowSelection}
            rowKey={(record) => record.id}
            dataSource={this.state.list}
            columns={columns}
            pagination={this.state.pagination}
          ></Table>
        </Card>
        <Modal
          onOk={this.handleFinishOrder}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
          title="结束订单"
          visible={this.state.visible}
        >
          <Form layout="horizontal">
            <Form.Item label="车辆编号">
              {this.state.orderInfo.bike_sn}
            </Form.Item>
            <Form.Item label="剩余电量">
              {this.state.orderInfo.battery + "%"}
            </Form.Item>
            <Form.Item label="行程开始时间">
              {this.state.orderInfo.start_time}
            </Form.Item>
            <Form.Item label="当前位置">
              {this.state.orderInfo.location}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
