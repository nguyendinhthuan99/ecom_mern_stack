const CART_API = {
  GET_LIST: {
    method: 'get',
    url: 'http://localhost:5500/api/cart'
  },
  GET_ONE: {
    method: 'get',
    url: 'http://localhost:5500/api/cart/{id}'
  },
  UPDATE: {
    method: 'put',
    url: 'http://localhost:5500/api/cart/{id}',
    name: 'Cập nhật'
  },
  DELETE: {
    method: 'delete',
    url: 'http://localhost:5500/api/cart/{id}',
    name: 'Xóa'
  },
  CREATE: {
    method: 'post',
    url: 'http://localhost:5500/api/cart',
    name: 'Tạo mới'
  }
}

export default CART_API