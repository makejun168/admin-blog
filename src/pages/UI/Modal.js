import React from "react";
import { Card, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm, warning, info, error } = Modal;

// const ReachableContext = React.createContext();
// const UnreachableContext = React.createContext();

export default class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  config = () => ({
    title: "Use Hook!",
    content: (
      <div>
        content
      </div>
    ),
  });

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleClickConfirm = () => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Card title="Modal" className="card-wrap">
          <Button type="primary" onClick={this.showModal}>
            Open
          </Button>
          <Button type="primary" onClick={this.showModal}>
            自定义页脚
          </Button>
          <Button type="primary" onClick={this.showModal}>
            顶部20px
          </Button>
          <Button type="primary" onClick={this.showModal}>
            水平垂直居中
          </Button>
          <Button onClick={this.handleClickConfirm}>Click</Button>
        </Card>
        <Card title="Modal Function" className="card-wrap">
          <Button
            onClick={() => {
              confirm(this.config());
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={() => {
              warning(this.config());
            }}
          >
            Warning
          </Button>
          <Button
            onClick={() => {
              info(this.config());
            }}
          >
            Info
          </Button>
          <Button
            onClick={() => {
              error(this.config())
              // confirm({
              //   title: "Are you sure delete this task?",
              //   icon: <ExclamationCircleOutlined />,
              //   content: "Some descriptions",
              //   okText: "Yes",
              //   okType: "danger",
              //   okButtonProps: {
              //     disabled: true,
              //   },
              //   cancelText: "No",
              //   onOk() {
              //     console.log("OK");
              //   },
              //   onCancel() {
              //     console.log("Cancel");
              //   },
              // });
            }}
          >
            Error
          </Button>
        </Card>
        <Modal
          title="Basic Modal"
          centered
          okText="OK"
          cancelText="cancel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
