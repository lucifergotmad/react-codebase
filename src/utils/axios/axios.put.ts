import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV_VARIABLES } from '../../shared/constants/env.const';
import { getLocal } from '../storage/storage.utils';

export const AxiosPut = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
  const userData = await getLocal('userData', []);
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${userData?.accessToken}` },
  };

  try {
    const result = await axios.put<T>(ENV_VARIABLES.BACKEND_API_URL + url, data, config);
    return result;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.clear();
      window.location.reload();
    }

    throw new Error('Failed when make an API request!');
  }
};
