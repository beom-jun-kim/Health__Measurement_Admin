import http from "../http-common";

class CommonCode {
  async getCommonCode() {
    return await http.get("/code/headers");
  }
  async getCommonCodeDetail(type) {
    return await http.get(`/code?type=${type}`);
  }
  async postCommonCodeDetail(data) {
    return await http.post("/code/headers", data);
  }
  async patchCommonCodeDetail(data) {
    return await http.patch("/code/headers", data);
  }
  async delCommonCodeDetail(id) {
    return await http.delete(`/code/headers/${id}`);
  }
  async postCommonCodeDetailDetail(data) {
    return await http.post("/code", data);
  }
  async patchCommonCodeDetailDetail(data) {
    return await http.patch("/code", data);
  }
}

export default new CommonCode();
