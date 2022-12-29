import { doDecrypt, doEncrypt } from '../encryptor/encryptor.utils';

export const saveLocal = async (name: string, payload: any, ignore: string[] = []) => {
  try {
    if (Array.isArray(payload)) {
      const encryptedResult = payload.map((data) => doEncrypt(data, ignore));
      localStorage.setItem(name, JSON.stringify(encryptedResult));
      return 'Berhasil';
    }

    if (typeof payload === 'string') {
      localStorage.setItem(name, doEncrypt(payload, ignore));
      return 'Berhasil';
    }
    const encryptedResult = doEncrypt(payload, ignore);
    localStorage.setItem(name, JSON.stringify(encryptedResult));
    return 'Berhasil';
  } catch (error) {
    return error;
  }
};

export const getLocal = async (name: string, ignore: string[]) => {
  try {
    const result = localStorage.getItem(name);

    if (result === null) {
      return [];
    }

    if (result?.includes('[')) {
      const decryptedResult = JSON.parse(result).map((data: any) => doDecrypt(data, ignore));
      return decryptedResult;
    }

    if (result?.includes('{')) {
      const decryptedResult = doDecrypt(JSON.parse(result), ignore);
      return decryptedResult;
    }
    return doDecrypt(result, ignore);
  } catch (error) {
    return error;
  }
};
