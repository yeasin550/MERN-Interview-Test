import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ontik-technology-server.vercel.app",
});

export const saveDrawing = async (drawing) => {
  const response = await axiosInstance.post("/drawings", { ...drawing });
  return response.data;
};


export const getDrawings = async () => {
  const response = await axiosInstance.get("/drawings");
  return response.data;
};

export const getDrawing = async (drawingId) => {
  const response = await axiosInstance.get(`/drawings/${drawingId}`);
  return response.data;
};


export const editDrawing = async (drawing) => {
  const response = await axiosInstance.put(`/drawings/${drawing.id}`, {
    ...drawing,
  });
  return response.data;
};

export const deleteDrawing = async (drawingId) => {
  const response = await axiosInstance.delete(`/drawings/${drawingId}`);
  return response.data;
};
