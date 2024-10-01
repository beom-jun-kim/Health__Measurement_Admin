import http from "../http-common";

class CustSupMana {
  async getCustSupMana(category, startDate, endDate, page, size) {
    return await http.get(
      `/board?category=${category}&startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`
    );
  }
  async getCustSupManaDetail(boardId) {
    return await http.get(`/board/${boardId}`);
  }
  async delCustSupManaDetail(boardId) {
    return await http.delete(`/board/${boardId}`);
  }
  async patchCustSupManaDetail(data) {
    return await http.patch(`/board`, data);
  }
  async postCustSupManaDetail(data) {
    return await http.post(`/board`, data);
  }
}

export default new CustSupMana();
