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
}

export default new CustSupMana();
