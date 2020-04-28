import Jsonp from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

const baseUrl = 'http://106.12.220.186:4000/api';

export default class Http {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      Jsonp(options.url, {
        param: 'callback',
        timeout: 80000
      }, (err, response) => {
        console.log(response);
        resolve(response);
        // todo
      })
    })
  }
  static get(options) {
    console.log(options);
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseUrl,
        params: (options.data) || ''
      }).then(res => {
        if (res.status === 200) {
          let response = res.data;
          if (response.code === 0) {
            resolve(response);
          } else {
            Modal.info({
              title: '提示',
              content: response.msg
            })
          }
        } else {
          reject();
        }
      })
    });
  }
}
