import React from "react";
import { Card, Button, message } from "antd";

const key = 'updatable';

export default class Message extends React.Component {
  success = () => {
    message.success("This is a success message");
  };

  error = () => {
    message.error("This is an error message");
  };

  warning = () => {
    message.warning("This is a warning message");
  };

  openMessage = () => {
    message.loading({ content: "Loading...", key });
    setTimeout(() => {
      message.success({ content: "Loaded!", key, duration: 2 });
    }, 1000);
  };

  render() {
    return (
      <div className="message">
        <Card title="Tips" className="card-wrap">
          <Button onClick={this.success}>Success</Button>
          <Button onClick={this.error}>Error</Button>
          <Button onClick={this.warning}>Warning</Button>
        </Card>
        <Card title="updateAble" className="card-wrap">
          <Button type="primary" onClick={this.openMessage}>
            Open the message box
          </Button>
          ,
        </Card>
      </div>
    );
  }
}
