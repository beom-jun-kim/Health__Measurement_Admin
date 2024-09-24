import http from "../http-common";

class Manage {
  async getAdminList(username, page, size) {
    return await http.get(
      `/admin/list?name=${username}&page=${page}&size=${size}`
    );
  }
  async getAdminRole() {
    return await http.get("/role/list");
  }
  async patchAdminRole(data) {
    return await http.patch("/admin/list", data);
  }
  async getAdminRoleList(page, size) {
    return await http.get(`/role/list?page=${page}&size=${size}`);
  }
  async postAdminRoleChange(data) {
    return await http.post("/role", data);
  }
  async patchAdminRoleChange(data) {
    return await http.patch("/role", data);
  }
  async delAdminRoleChange(id) {
    return await http.delete(`/role/${id}`);
  }
  async getIndexRole(id, page, size) {
    return await http.get(
      `/admin/by-role?roleSid=${id}&page=${page}&size=${size}`
    );
  }
}

export default new Manage();
