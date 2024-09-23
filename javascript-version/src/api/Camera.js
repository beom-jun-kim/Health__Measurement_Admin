import http from "../http-common";

class Camera {
  async getCamera(page, size) {
    return await http.get(`/camera?page=${page}&size=${size}`);
  }
  async postCamera(data) {
    return await http.post("/camera", data);
  }
  async patchCamera(data) {
    return await http.patch("/camera", data);
  }
  async delCamera(cameraSid) {
    return await http.delete(`/camera?cameraSids=${cameraSid}`);
  }
}

export default new Camera();
