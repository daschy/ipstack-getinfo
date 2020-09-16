const fetch = require('node-fetch');
const assert = require('assert');

exports.create = (baseUrl, accessKey) => {
  assert(baseUrl, 'BaseUrl is null');
  assert(accessKey, 'AccessKey is null');
  return {

    getInfo: async (sourceIp) => {
      const resp = (await fetch(`${baseUrl}/${sourceIp}?access_key=${accessKey}`, { method: 'GET' }));

      if (!resp.ok) {
        throw resp;
      }

      return resp.json();
    },

  };
};
