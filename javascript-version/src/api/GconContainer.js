import http from "../http-common";

class GconContainer {
  async getCityes() {
    return await http.get(`/code?type=city`);
  }
  async getGcon(code, page, size) {
    return await http.get(`/container?code=${code}&page=${page}&size=${size}`);
  }
  async getGconDetail(id) {
    return await http.get(`/container/${id}`);
  }
  async patchGconDetail(data) {
    return await http.patch(`/container`, data);
  }
  async getEquipment(id) {
    return await http.get(`/container/${id}/equipment`);
  }
  async delGconDetail(id) {
    return await http.delete(`/container/${id}`);
  }
  async postGconDetail(data) {
    return await http.post(`/container`, data);
  }
  async getLatAndLon(addr) {
    return await http.get(`/container/gw?address=${addr}`);
  }
  async shoesManage(page, size) {
    return await http.get(`/shoes?page=${page}&size=${size}`);
  }
  async gconSelect() {
    return await http.get(`/container/select`);
  }
  async shoesPatch() {
    return await http.patch(`/shoes`);
  }
}

export default new GconContainer();
