import http from "../http-common";

class UserDataService {
  async verificationEmail(data) {
    return await http.post("/verification/email", data);
  }
  async verificationEmailChk(data) {
    return await http.patch("/verification/email", data);
  }
  async createUser(data) {
    return await http.post("/admin", data);
  }
  async login(data) {
    return await http.post("/auth/login", data);
  }
  async findId(name, phoneNumber) {
    return await http.get(`/admin/id?name=${name}&phoneNumber=${phoneNumber}`);
  }
  async findpassword(data) {
    return await http.post("/admin/verification",data);
  }
  async resetPwd(data) {
    return await http.patch("/admin/password",data);
  }
}

export default new UserDataService();
