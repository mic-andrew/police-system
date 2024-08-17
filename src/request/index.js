import axios from "./axiosConfig";

export const signupReq = async (body) => {
  try {
    const res = await axios.post(`/auth/register`, body);
    return res.data;
  } catch (err) {
    if (err) {
      return err.response?.data;
    }
  }
};

export const loginReq = async (body) => {
  try {
    const res = await axios.post(`/auth/login`, body);
    return res.data;
  } catch (err) {
    if (err) {
      return err.response?.data;
    }
  }
};

export const uploadSuspectReq = async (body) => {
  try {
    const res = await axios.post(`/face-recognition/upload-suspect`, body);
    return res.data;
  } catch (err) {
    if (err) {
      return err.response?.data;
    }
  }
};

export const getSuspectsReq = async () => {
  try {
    const res = await axios.get(`/face-recognition/fetch-suspects`);
    return res.data;
  } catch (err) {
    if (err) {
      return err.response?.data;
    }
  }
};
