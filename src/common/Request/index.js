import Jsonp from 'jsonp';

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
}
