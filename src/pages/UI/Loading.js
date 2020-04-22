import React from "react";
import { Card, Spin, Alert, Switch } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default class LoadingContainer extends React.Component {
  state = {
    loading: false,
  };

  toggle = (value) => {
    this.setState({ loading: value });
  };
  // 默认图标是静态的
  antIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
  render() {
    const container = (
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="success"
      />
    );
    return (
      <div className="LoadingContainer" style={{ width: "100%" }}>
        <Card title="Basic" className="card-wrap">
          <Spin></Spin>
        </Card>
        <Card title="size" className="card-wrap">
          <Spin size="small" className="spin-item" />
          <Spin className="spin-item" />
          <Spin size="large" className="spin-item" />
          <Spin indicator={this.antIcon()} />
        </Card>
        <Card title="Spin delay">
          <Spin spinning={this.state.loading} delay={500}>
            {container}
          </Spin>
          <div style={{ marginTop: 16 }}>
            Loading state：
            <Switch checked={this.state.loading} onChange={this.toggle} />
          </div>
        </Card>
        <Card title="alert">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="success"
          />
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="warning"
          />
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="error"
          />
        </Card>
      </div>
    );
  }
}
