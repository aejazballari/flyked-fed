/* eslint-disable linebreak-style */
const CryptoJS = require('crypto-js');

const secretCode = 'Flyked';

// Encrypt Data using secret key.
export const encryptData = (data, secretKey) => {
  const excryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey || secretCode,
  ).toString();
  return excryptedData.replaceAll('/', 'aBcDeF123');
};

// Decrypt Data using secret key.
export const decryptData = (encryptedData, secretKey) => {
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData.replaceAll('aBcDeF123', '/'),
      secretKey || secretCode,
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
  return null;
};
