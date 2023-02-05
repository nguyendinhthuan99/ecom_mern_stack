const USER_API = {
  GET_LIST: {
    method: 'get',
    url: 'http://localhost:5500/api/user'
  },
  GET_ONE: {
    method: 'get',
    url: 'http://localhost:5500/api/user/{id}'
  },
  UPDATE: {
    method: 'put',
    url: 'http://localhost:5500/api/user/{id}',
    name: 'Cập nhật'
  },
  DELETE: {
    method: 'delete',
    url: 'http://localhost:5500/api/user/{id}',
    name: 'Xóa người dùng'
  },
  STATS: {
    method: 'get',
    url: 'http://localhost:5500/api/user/stats',
    name: 'Thống kê'
  },
}

export default USER_API