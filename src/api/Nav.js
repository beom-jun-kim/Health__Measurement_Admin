import http from "../http-common";

class Nav {
  async getNav() {
    return await http.get("/menu");
  }
  async getCUD(id) {
    return await http.get(`/rolemenuoperation?menuSid=${id}`);
  }
}

export default new Nav();
