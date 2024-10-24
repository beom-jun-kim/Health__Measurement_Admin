import http from "../http-common";

class Mat {
  async getMat(page, size) {
    return await http.get(`/mat?page=${page}&size=${size}`);
  }
  async postMat(data) {
    return await http.post("/mat", data);
  }
  async patchMat(data) {
    return await http.patch("/mat", data);
  }
  async delMat(matSid) {
    return await http.delete(`/mat?matSids=${matSid}`);
  }
}

export default new Mat();
