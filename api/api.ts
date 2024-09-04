import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

export const getData = async (url: string, headers: AxiosRequestHeaders): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const postData = async (url: string, data: unknown, headers: AxiosRequestHeaders): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
    throw error;
  }
};

export const patchData = async (url: string, data: unknown, headers: AxiosRequestHeaders): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(url, data, { headers });
    return response;
  } catch (error) {
    console.error(`Error patching data to ${url}:`, error);
    throw error;
  }
};

export const headData = async (url: string, headers: AxiosRequestHeaders): Promise<AxiosResponse> => {
  try {
    const response = await axios.head(url, { headers });
    return response;
  } catch (error) {
    console.error(`Error sending HEAD request to ${url}:`, error);
    throw error;
  }
};

export const putData = async (url: string, data: unknown, headers: AxiosRequestHeaders): Promise<AxiosResponse> => {
  try {
    const response = await axios.put(url, data, { headers });
    return response;
  } catch (error) {
    console.error(`Error putting data to ${url}:`, error);
    throw error;
  }
};
