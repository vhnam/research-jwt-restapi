require('dotenv').config();

const CryptoJS = require('crypto-js');

const encodeBase64 = input => {
  const encryptedWord = CryptoJS.enc.Utf8.parse(input);
  const encrypted = CryptoJS.enc.Base64.stringify(encryptedWord);
  return encrypted;
};

const encodeHmacSHA512 = input => {
  const encrypted = CryptoJS.HmacSHA256(input, process.env.JWT_SECRET);
  return encrypted;
};

module.exports = {
  encodeBase64: encodeBase64,
  encodeHmacSHA512: encodeHmacSHA512
};
