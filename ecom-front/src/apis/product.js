const PRODUCT_API = {
  GET_LIST: {
    method: 'get',
    url: 'http://localhost:5500/api/product'
  },
  GET_ONE: {
    method: 'get',
    url: 'http://localhost:5500/api/product/{id}'
  },
  UPDATE: {
    method: 'put',
    url: 'http://localhost:5500/api/product/{id}',
    name: 'Cập nhật'
  },
  DELETE: {
    method: 'delete',
    url: 'http://localhost:5500/api/product/{id}',
    name: 'Xóa'
  },
  CREATE: {
    method: 'post',
    url: 'http://localhost:5500/api/product',
    name: 'Tạo mới'
  }
}

export default PRODUCT_API