import http from "../http-common";

class Monitoring {
  async getManageLog(startDate, endDate, userName, page, size) {
    return await http.get(
      `/admin/log?startDate=${startDate}&endDate=${endDate}&userName=${userName}&page=${page}&size=${size}`
    );
  }
}

export default new Monitoring();
