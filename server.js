const express = require("express");
const http = require("http");

var opt = {
  host: "api.map.baidu.com",
  port: "80",
  method: "GET",
  path:
    "/weather/v1/?district_id=440100&data_type=all&ak=azXMfuFQMErXF6GjYEFnDnefakKjtis8",
  headers: {},
};

// 使用代理
const app = express();
app.get("/weather", function (req, res) {
  let body = "";
  const data = http
    .request(opt, function (res) {
      res
        .on("data", function (data) {
          console.log(data);
          body += data;
        })
        .on("end", function () {
          console.log(body);
          res.send(body);
        });
    })
    .on("error", function (e) {
      console.log("error: " + e.message);
    });
});

app.listen(5000);
