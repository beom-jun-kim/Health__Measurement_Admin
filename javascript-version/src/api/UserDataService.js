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
  //   async sms(data) {
  //     return await http.post('/verification/sms', data)
  //   }
  //   async smsChk(data) {
  //     return await http.patch('/verification/sms', data)
  //   }
  //   async idChk(id) {
  //     return await http.get(`/user/check/${id}`)
  //   }
  //   async logout() {
  //     return await http.post('/auth/logout')
  //   }

  //   // 본인 로그인 정보
  //   async getUserInfo() {
  //     return await http.get('/user/info')
  //   }
  //   async editUserInfo(data) {
  //     return await http.patch('/user/info', data)
  //   }
  //   async deleteUser() {
  //     return await http.delete('/user')
  //   }
  //   async findIdSmsVerification(data) {
  //     return await http.post('/user/verification', data)
  //   }
  //   async getfindId(username, userPhoneNum) {
  //     return await http.get(`/user/id?name=${username}&phoneNumber=${userPhoneNum}`)
  //   }
  //   async postUserPw(data) {
  //     return await http.patch('/user/password', data)
  //   }
  //   async refreshToken() {
  //     return await http.post('/auth/refresh')
  //   }
}

export default new UserDataService();
