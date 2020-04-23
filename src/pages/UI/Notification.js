import React from "react";
import { Card, Button, notification } from "antd";
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";
import "./ui.less";

export default class Notice extends React.Component {
  state = {};

  openNotification = () => {
    notification.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  openNotificationWithPlace = (placement) => {
    notification.info({
      message: `Notification ${placement}`,
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement,
    });
  };

  render() {
    return (
      <div className="notice">
        <Card title="Notice" className="card-wrap">
          <Button onClick={this.openNotification}>Click</Button>
        </Card>
        <Card title="Notice with Icon" className="card-wrap">
          <Button onClick={() => this.openNotificationWithIcon("success")}>
            Success
          </Button>
          <Button onClick={() => this.openNotificationWithIcon("info")}>
            Info
          </Button>
          <Button onClick={() => this.openNotificationWithIcon("warning")}>
            Warning
          </Button>
          <Button onClick={() => this.openNotificationWithIcon("error")}>
            Error
          </Button>
        </Card>
        <Card title="Notice with Icon" className="card-wrap">
          <Button onClick={() => this.openNotificationWithIcon("success")}>
            Success
          </Button>
          <Button onClick={() => this.openNotificationWithIcon("info")}>
            Info
          </Button>
          <Button onClick={() => this.openNotificationWithIcon("warning")}>
            Warning
          </Button>
          <Button onClick={() => this.openNotificationWithIcon("error")}>
            Error
          </Button>
        </Card>
        <Card>
          <Button
            type="primary"
            onClick={() => this.openNotificationWithPlace("topLeft")}
          >
            <RadiusUpleftOutlined />
            topLeft
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotificationWithPlace("topRight")}
          >
            <RadiusUprightOutlined />
            topRight
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotificationWithPlace("bottomLeft")}
          >
            <RadiusBottomleftOutlined />
            bottomLeft
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotificationWithPlace("bottomRight")}
          >
            <RadiusBottomrightOutlined />
            this. bottomRight
          </Button>
        </Card>
      </div>
    );
  }
}
