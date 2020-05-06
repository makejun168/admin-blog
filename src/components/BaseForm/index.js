import React from "react";
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from "antd";
import util from "../../utils/util";

export default class BaseForm extends React.Component {
  initFormList = () => {
    const formList = this.props.formList;
    // 返回的 formItemList
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item) => {
        const { name, label, value, placeholder, list } = item;
        if (item.type === "SELECT") {
          const SELECT = (
            <Form.Item name={name} label={label} key={name}>
              <Select placeholder={placeholder}>
                {util.getOptionList(list)}
              </Select>
            </Form.Item>
          );
          formItemList.push(SELECT);
        } else if (item.type === "INPUT") {
          const INPUT = (
            <Form.Item label={label} name={name} key={name}>
              <Input type="text" value={value} placeholder={placeholder} />
            </Form.Item>
          );
          formItemList.push(INPUT);
        } else if (item.type === "CHECKBOX") {
          const CHECKBOX = (
            <Form.Item label={label} name={name}>
              <Checkbox>{label}</Checkbox>
            </Form.Item>
          );
          formItemList.push(CHECKBOX);
        } else if (item.type === "时间查询") {
          const BEGIN_TIME = (
            <Form.Item label="开始时间" name="start_time">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          );
          const END_TIME = (
            <Form.Item label="~" colon={false} name="end_time">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          );
          formItemList.push(BEGIN_TIME);
          formItemList.push(END_TIME);
        } else if (item.type === 'RADIO'){
          const RADIO = (<Form.Item label={label} name={name} key={name}>
            <Radio value={value}/>
          </Form.Item>);
          formItemList.push(RADIO);
        }
      });
    }
    return formItemList;
  };

  onFinish = (data) => {
    this.props.handleSubmit(data);
  };

  render() {
    return (
      <Form layout={this.props.layout} onFinish={this.onFinish}>
        {this.initFormList()}
        <Form.Item>
          {/* htmlType="submit"  */}
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button type="warning">重置</Button>
        </Form.Item>
      </Form>
    );
  }
}
