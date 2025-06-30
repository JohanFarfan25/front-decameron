import api from "./axiosIntance";

export const addRoom = (data) => {
  return api.post('/rooms', data);
};

export const getRooms = () => {
  return api.get('/rooms');
};

export const getRoomsByHotelUuid = (uuid) => {
  return api.get(`/rooms/hotel/${uuid}`);
};

export const updateRoom = (uuid, data) => {
  return api.put(`/rooms/${uuid}`, data);
};
export const deleteRoom = (uuid) => {
  return api.delete(`/rooms/${uuid}`);
};
