const { add, exists } = require('../store/urlStore');

function generateShortcode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  do {
    code = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  } while (exists(code));
  return code;
}

function createShortURL({ url, validity, shortcode,  baseURL }) {
  const isValidURL = /^https?:\/\/.+\..+/.test(url);
  if (!isValidURL) throw new Error('Invalid URL format');

  if (shortcode && !/^[a-zA-Z0-9]{3,10}$/.test(shortcode)) {
    throw new Error('Invalid shortcode format');
  }

  if (!validity) validity = 30;

  const expiry = new Date(Date.now() + validity * 60000); 

  let finalCode = shortcode;
  if (shortcode) {
    if (exists(shortcode)) throw new Error('Shortcode already exists');
  } else {
    finalCode = generateShortcode();
  }

  add(finalCode, url, expiry);

  return {
    shortLink:  `${baseURL}/${finalCode}`,
    expiry: expiry.toISOString()
  };
}

module.exports = { createShortURL };
