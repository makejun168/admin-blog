import React from "react";
import { Table } from "antd";

export default class BaseTable extends React.Component {
  state = {};

  onRowClick = (record, index) => {
    if (this.props.rowSelectionType === "checkbox") {
      let selectedRowKeys = this.props.selectedRowKeys || [];
      // let selectedIds = this.props.selectedIds;
      if (selectedRowKeys.length) {
        const i = selectedRowKeys.indexOf(record.id);
        if (i === -1) {
          selectedRowKeys.push(record.id);
          // selectedIds.push(record.id);
        } else {
          selectedRowKeys.splice(i, 1);
          // selectedIds.splice(i, 1);
        }
      } else {
        selectedRowKeys = [record.id];
        // selectedIds = [record.id];
      }
      this.props.updateSelectedItem([...selectedRowKeys]);
    } else {
      // 根据 key 值来 选择当前点击的是 第几行
      this.props.updateSelectedItem([record.id]);
    }
  };
  tableInit = () => {
    const { columns, dataSource, pagination, selectedRowKeys } = this.props;
    let rowSelectionType = this.props.rowSelectionType;
    let ROW_SELECTIONS = {
      type: "radio",
      selectedRowKeys: selectedRowKeys,
    };
    if (rowSelectionType === false || rowSelectionType === null) {
      ROW_SELECTIONS = null;
    } else if (rowSelectionType === "checkbox") {
      ROW_SELECTIONS.type = "checkbox";
    } else {
      ROW_SELECTIONS.type = "radio";
    }

    return (
      <Table
        bordered
        rowSelection={rowSelectionType ? ROW_SELECTIONS : null}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        onRow={(record, index) => {
          return {
            onClick: (event) => {
              if (!this.props.rowSelectionType) {
                return false;
              }
              this.onRowClick(record, index);
            },
          };
        }}
      ></Table>
    );
  };

  render() {
    return <div>{this.tableInit()}</div>;
  }
}
