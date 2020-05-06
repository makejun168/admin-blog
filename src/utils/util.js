import React from "react";
import { Select } from "antd";
const { Option } = Select;

export default {
  formateDate(time) {
    if (!time) {
      return "";
    }
    let date = new Date(time);
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      " " +
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
    );
  },

  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current);
      },
      current: data.result.page,
      total: data.result.total_count,
      pageSize: data.result.page_size,
      showTotal: () => {
        return `共${data.result.total_count}条`;
      },
    };
  },
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = [];
    data.forEach((item) => {
      options.push(
        <Option value={item.value} key={item.value}>
          {item.name}
        </Option>
      );
    });
    return options;
  },
  updateSelectedItem(selectedRowKeys) {
    this.setState({
      selectedRowKeys
    })
  }
};
