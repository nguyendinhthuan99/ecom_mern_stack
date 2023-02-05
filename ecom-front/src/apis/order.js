const ORDER_API = {
  STATS: {
    method: 'get',
    url: 'http://localhost:5500/api/order/stats'
  },
  GET_LIST: {
    method: 'get',
    url: 'http://localhost:5500/api/order'
  },
  GET_ONE: {
    method: 'get',
    url: 'http://localhost:5500/api/order/{id}'
  },
  UPDATE: {
    method: 'put',
    url: 'http://localhost:5500/api/order/{id}',
    name: 'Cập nhật'
  },
  DELETE: {
    method: 'delete',
    url: 'http://localhost:5500/api/order/{id}',
    name: 'Xóa'
  },
  CREATE: {
    method: 'post',
    url: 'http://localhost:5500/api/order',
    name: 'Tạo mới'
  }
}

export default ORDER_API