import http from "../http-common";

class Labeling {
  async getLabelingImg(page, size,isLabeled) {
    return await http.get(`/labeling?page=${page}&size=${size}&isLabeled=${isLabeled}`);
  }
  async getLabelingSelect() {
    return await http.get("/labeling/select-options");
  }
  async patchLabelingSelect(data) {
    return await http.patch("/labeling", data);
  }
  async delLabelingSelect(id) {    
    return await http.delete(`/labeling?id=${id}`);
  }
}

export default new Labeling();
