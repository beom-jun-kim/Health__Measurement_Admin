import http from "../http-common";

class Labeling {
  async getLabelingImg(page, size) {
    return await http.get(`/labeling?page=${page}&size=${size}`);
  }
  async getLabelingSelect() {
    return await http.get("/labeling/select-options");
  }
  async patchLabelingSelect(data) {
    return await http.patch("/labeling", data);
  }
}

export default new Labeling();
