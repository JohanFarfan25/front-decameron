import axiosIntance from "./axiosIntance";

export const addHotel = (data) => {
  return axiosIntance.post('/hotels', data);
};

export const getHotels = () => {
  return axiosIntance.get('/hotels');
};

export const getHotelByUiid = (uuid) => {
  return axiosIntance.get(`/hotels/one/${uuid}`);
};

export const updateHotel = (uuid, data) => {
  return axiosIntance.put(`/hotels/${uuid}`, data);
};
export const deleteHotel = (uuid) => {
  return axiosIntance.delete(`/hotels/${uuid}`);
};
