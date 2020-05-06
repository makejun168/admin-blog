import React from "react";
import { Card } from "antd";
import BaseForm from '../../components/BaseForm';
import { getUserList } from "../../api";
import util from "../../utils/util";
import BaseTable from "../../components/BaseTable";


export default class Employment extends React.Component {
  state = {
    pagination: [],
    list: [],
    selectedRowKeys: null
  };

  params = {
    page: 1
  }

  formList = [
    {
      type: "INPUT",
      name: "user_name",
      label: "用户名",
      placeholder: "请输入用户名",
      value: ''
    },
    {
      type: "INPUT",
      name: "mobile",
      label: "手机号",
      placeholder: "请输入手机号",
      value: ''
    },
    {
      type: "DATEPICKER",
      name: "join_time",
      label: "入职时间",
      placeholder: "请输入入职时间",
      value: ''
    },
  ];

  onFinish = (values) => {
    console.log(values);
    this.request(values);
  };

  handleFilter = () => {
    this.request();
  }

  request = () => {
    getUserList().then(res => {
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
    })
  }

  componentDidMount() {
    this.request();
  }

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "userName",
      },
      {
        title: "性别",
        dataIndex: "sex",
        render: (sex) => {
          return sex === 2 ? '男' : '女'
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        render: (state) => {
          return {
            '1': '咸鱼',
            '2': '精英',
            '3': '底层人士',
            '4': '高管',
            '5': '大学生'
          }[state]
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render: (state) => {
          return {
            '1': '篮球',
            '2': '足球',
            '3': '羽毛球',
            '4': '跳舞',
            '5': 'PY',
            '6': '跳绳',
            '7': '代码',
            '8': '预览'
          }[state]
        }
      },
      {
        title: "生日",
        dataIndex: "birthday"
      },
      {
        title: "联系地址",
        dataIndex: "address"
      },
      {
        title: "早起时间",
        dataIndex: "time"
      }
    ];
    return <div style={{width: '100%'}}>
      <Card className="card-wrap">
        <BaseForm layout="inline" ref='form' formList={this.formList} handleSubmit={this.onFinish}/>
      </Card>
      <Card title="">
        <BaseTable
          updateSelectedItem={util.updateSelectedItem.bind(this)}
          selectedRowKeys={this.state.selectedRowKeys}
          rowSelectionType={'radio'}
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.pagination}
        />
      </Card>
    </div>;
  }
}
