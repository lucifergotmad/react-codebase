import type { EnhancedStore } from '@reduxjs/toolkit';
import type { Axios, AxiosError, AxiosRequestConfig } from 'axios';

const setupAxios = (axios: Axios, store: EnhancedStore) => {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const {
      auth: { accessToken },
    } = store.getState();

    const customHeaders = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    return {
      ...config,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...customHeaders,
      },
    };
  }, (error: AxiosError) => Promise.reject(error));
};

export default setupAxios;
