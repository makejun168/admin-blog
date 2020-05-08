// http://api.map.baidu.com/telematics/v3/weather?location={城市名}&output={返回格式}&ak={百度AK}
// Restful API

import Http from '../common/Request'

export const getWeatherData = Http.jsonp({url: 'http://api.map.baidu.com/telematics/v3/weather?district_id=440100&output=all&ak=azXMfuFQMErXF6GjYEFnDnefakKjtis8'});

export const getTableList = params => Http.get({url: '/table/list', data: params});

export const getOpenCity = params => Http.get({url: '/open_city', data: params});
export const addOpenCity = params => Http.get({url: '/city/open', data: params});

export const getOrderList = params => Http.get({url: '/order/list', data: params});
export const getBikeInfo = params => Http.get({url: '/order/ebike_info', data: params});
export const finishOrder = params => Http.get({url: '/order/finish_order', data: params});
export const getOrderDetail = params => Http.get({url: '/order/detail', data: params});
export const getUserList = params => Http.get({url: '/user/list', data: params});
export const deleteUser = params => Http.get({url: '/user/delete', data: params});
export const editUser = params => Http.get({url: '/user/edit', data: params});
export const addUser = params => Http.get({url: '/user/add', data: params});
export const getBikeList = params => Http.get({url: '/map/bike_list', data: params});
export const getRoleList = params => Http.get({url: '/role/list', data: params});
export const roleCreate = params => Http.get({url: '/role/create', data: params});

