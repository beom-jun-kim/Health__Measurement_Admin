import http from "../http-common";

class GconUserManage {
  async getGconAllUser(page, size, name) {
    return await http.get(
      `/user/list?page=${page}&size=${size}&username=${name}`
    );
  }
  async patchUserStatus(data) {
    return await http.patch("/user/status", data);
  }
  async getGconUserDetail(id) {
    return await http.get(`/user/detail/${id}`);
  }
}

export default new GconUserManage();
