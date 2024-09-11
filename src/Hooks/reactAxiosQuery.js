import axios from "axios";

export const getDrawings = async () => {
  const response = await axios.get("/drawings");
  return response.data;
};

export const getDrawing = async (drawingId) => {
  const response = await axios.get(`/drawings/${drawingId}`);
  return response.data;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", 
});

export const saveDrawing = async (drawing) => {
  const response = await axiosInstance.post("/drawings", { ...drawing });
  return response.data;
};




// export const saveDrawing = async (drawing) => {
//   const response = await axios.post("/drawings", { ...drawing });
//   return response.data;
// };

export const editDrawing = async (drawing) => {
  const response = await axios.put(`/drawings/${drawing.id}`, { ...drawing });
  return response.data;
};

export const deleteDrawing = async (drawingId) => {
  const response = await axios.delete(`/drawings/${drawingId}`);
  return response.data;
};
