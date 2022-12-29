import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV_VARIABLES } from '../../shared/constants/env.const';
import { getLocal } from '../storage/storage.utils';

export const AxiosGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const userData = await getLocal('userData', []);

  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${userData?.accessToken}` },
  };

  try {
    const result = await axios.get<T>(ENV_VARIABLES.BACKEND_API_URL + url, config);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    throw new Error('Failed when make an API request!');
  }
};

export const AxiosGetWithParams = async <T>(url: string, params: any): Promise<AxiosResponse<T>> => {
  const userData = await getLocal('userData', []);

  const config: AxiosRequestConfig = {
    params,
    headers: { Authorization: `Bearer ${userData?.accessToken}` },
  };

  try {
    const result = await axios.get<T>(ENV_VARIABLES.BACKEND_API_URL + url, config);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    throw new Error('Failed when make an API request!');
  }
};
