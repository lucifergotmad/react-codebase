import { doDecrypt, doEncrypt } from '../encryptor/encryptor.utils';

export const saveLocal = async (name: string, payload: any, ignore: string[] = []) => new Promise((resolve, reject) => {
  try {
    if (Array.isArray(payload)) {
      const encryptedResult = payload.map((data) => doEncrypt(data, ignore));
      localStorage.setItem(name, JSON.stringify(encryptedResult));
      resolve('Berhasil');
    } else if (typeof payload === 'string') {
      localStorage.setItem(name, doEncrypt(payload, ignore));
      resolve('Berhasil');
    } else {
      const encryptedResult = doEncrypt(payload, ignore);
      localStorage.setItem(name, JSON.stringify(encryptedResult));
      resolve('Berhasil');
    }
  } catch (error) {
    reject(error);
  }
});

export const getLocal = async (name: string, ignore: string[]) => new Promise((resolve, reject) => {
  try {
    const result = localStorage.getItem(name);

    if (result === null) {
      resolve([]);
    }

    if (result?.includes('[')) {
      const decryptedResult = JSON.parse(result).map((data: any) => doDecrypt(data, ignore));
      resolve(decryptedResult);
    } else if (result?.includes('{')) {
      const decryptedResult = doDecrypt(JSON.parse(result), ignore);
      resolve(decryptedResult);
    } else {
      resolve(doDecrypt(result, ignore));
    }
  } catch (error) {
    reject(error);
  }
});
