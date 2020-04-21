// http://api.map.baidu.com/telematics/v3/weather?location={城市名}&output={返回格式}&ak={百度AK}

import axios from 'axios'

export const getWeatherData = axios.get('http://api.map.baidu.com/telematics/v3/weather?district_id=440100&output=all&ak=azXMfuFQMErXF6GjYEFnDnefakKjtis8')
