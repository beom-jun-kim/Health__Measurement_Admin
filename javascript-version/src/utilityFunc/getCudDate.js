import Nav from "@/api/Nav";

export const useCUDDate = () => {
  const cudDate = ref(null);
  const loadcudDate = ref({
    create: false,
    delete: false,
    update: false,
  });

  const getCudDate = async () => {
    const storedData = localStorage.getItem("CUDData");
    if (storedData) {
      cudDate.value = storedData;
    }
    try {
      const response = await Nav.getCUD(cudDate.value);
      loadcudDate.value = response.data;
    } catch (e) {
      console.log("cudDate 조회 실패", e);
    }
  };

  return {
    loadcudDate,
    getCudDate,
  };
};
