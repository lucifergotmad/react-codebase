const ENCKEY = process.env.REACT_APP_ENCRYPTION_KEY ?? 'binary1010';
const IS_ENC = Boolean(process.env.REACT_APP_ENCRYPTION_MODE) ?? false;

const hexEncode = (str: number) => {
  const result = str.toString(16);
  return result;
};

const hexDecode = (hex: string) => {
  const result = parseInt(hex, 16);
  return result;
};

const chr = (asci: number) => {
  const result = String.fromCharCode(asci);
  return result;
};

const encryptASCII = (str: string) => {
  if (str) {
    const dataKey: any = {};
    for (let i = 0; i < ENCKEY.length; i += 1) {
      dataKey[i] = ENCKEY.substring(i, 1);
    }

    let encryptedString = '';
    let nkey = 0;
    const stringLength = str.length;

    for (let i = 0; i < stringLength; i += 1) {
      encryptedString += hexEncode(str[i].charCodeAt(0) + dataKey[nkey].charCodeAt(0));

      if (nkey === Object.keys(dataKey).length - 1) {
        nkey = 0;
      }
      nkey += 1;
    }
    return encryptedString.toUpperCase();
  }
  return true;
};

const decryptASCII = (str: string) => {
  if (str) {
    const dataKey: any = {};
    for (let i = 0; i < ENCKEY.length; i += 1) {
      dataKey[i] = ENCKEY.substring(i, 1);
    }

    let decryptedString = '';
    let nkey = 0;
    const stringLength = str.length;
    let i = 0;
    while (i < stringLength) {
      decryptedString += chr(
        hexDecode(str.substring(i, 2)) - dataKey[nkey].charCodeAt(0),
      );
      if (nkey === Object.keys(dataKey).length - 1) {
        nkey = 0;
      }
      nkey += 1;
      i += 2;
    }
    return decryptedString;
  }
  return true;
};

const doEncrypt = (dataBeforeCopy: any, ignore: string[] = []) => {
  if (!IS_ENC) {
    return dataBeforeCopy;
  }
  if (!dataBeforeCopy) {
    return dataBeforeCopy;
  }
  if (
    typeof dataBeforeCopy === 'object'
        && !(dataBeforeCopy instanceof Date)
  ) {
    const data = Array.isArray(dataBeforeCopy)
      ? [...dataBeforeCopy]
      : { ...dataBeforeCopy };
    Object.keys(data).map((x: any) => {
      const result = ignore.find((find: any) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          data[x] = data[x].map((y: any) => {
            if (typeof y === 'string') {
              return encryptASCII(y);
            } if (
              typeof data[x] === 'object'
                            && data[x]
                            && !(data[x] instanceof Date)
            ) {
              return doEncrypt(y, ignore);
            }
            return false;
          });
        } else if (typeof data[x] === 'string' && data[x]) {
          data[x] = encryptASCII(data[x]);
        } else if (typeof data[x] === 'number' && data[x]) { /* empty */ } else if (
          typeof data[x] === 'object'
                        && data[x]
                        && !(dataBeforeCopy instanceof Date)
        ) {
          data[x] = doEncrypt(data[x], ignore);
        }
      }
      return false;
    });
    return data;
  } if (typeof dataBeforeCopy === 'string') {
    const data = encryptASCII(dataBeforeCopy);
    return data;
  }
  return dataBeforeCopy;
};

const doDecrypt = (dataBeforeCopy: any, ignore: string[] = []) => {
  if (!IS_ENC) {
    return dataBeforeCopy;
  }

  if (!dataBeforeCopy) {
    return dataBeforeCopy;
  }

  if (
    typeof dataBeforeCopy === 'object'
        && !(dataBeforeCopy instanceof Date)
  ) {
    const data = Array.isArray(dataBeforeCopy)
      ? [...dataBeforeCopy]
      : { ...dataBeforeCopy };
    Object.keys(data).map((x: any) => {
      const result = ignore.find((find: any) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          data[x] = data[x].map((y: any) => {
            if (typeof y === 'string') {
              return decryptASCII(y);
            } if (
              typeof data[x] === 'object'
                            && data[x]
                            && !(data[x] instanceof Date)
            ) {
              return doDecrypt(y, ignore);
            }
            return false;
          });
        } else if (typeof data[x] === 'string' && data[x]) {
          data[x] = decryptASCII(data[x]);
        } else if (typeof data[x] === 'number' && data[x]) { /* empty */ } else if (
          typeof data[x] === 'object'
                        && data[x]
                        && !(dataBeforeCopy instanceof Date)
        ) {
          data[x] = doDecrypt(data[x], ignore);
        }
      }
      return false;
    });
    return data;
  } if (typeof dataBeforeCopy === 'string') {
    const data = decryptASCII(dataBeforeCopy);
    return data;
  }
  return dataBeforeCopy;
};

export { doDecrypt, doEncrypt };
