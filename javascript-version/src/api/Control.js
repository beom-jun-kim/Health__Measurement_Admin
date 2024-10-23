import http from "../http-common";

class Control {
  async getControlUserList(name, page, size) {
    return await http.get(
      `/surveillance?name=${name}&page=${page}&size=${size}`
    );
  }
  async getRoleTypeUserList() {
    return await http.get("role/list?roleType=control");
  }
  async getAffiliationeUserList() {
    return await http.get("/code?type=affiliation");
  }
  async patchControlUser(data) {
    return await http.patch("/surveillance", data);
  }
}

export default new Control();
