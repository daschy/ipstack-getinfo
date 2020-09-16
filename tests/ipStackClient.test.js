jest.mock('node-fetch');

const fetch = require('node-fetch');
const ipstack = require('../libs/ipstackClient');

const { Response } = jest.requireActual('node-fetch');

test('create ipstack client - Error', async () => {
  expect(() => {
    ipstack.create(null, null);
  }).toThrow();
});

test('create ipstack client - OK', async () => {
  expect(() => {
    ipstack.create('my base url', 'my access key');
  }).not.toThrow();
});

test('ipstackclient.getInfo - OK', async () => {
  const ip = 'myIp';
  const expectedGetInfoBody = {
    ip,
    country_name: 'United States',
  };
  fetch.mockReturnValue(
    Promise.resolve(new Response(JSON.stringify(expectedGetInfoBody))),
  );
  const url = 'http://randomurl';
  const accessKey = '12345';
  const client = ipstack.create(url, accessKey);

  const info = await client.getInfo(ip);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(`${url}/${ip}?access_key=${accessKey}`, {
    method: 'GET',
  });
  expect(info).toStrictEqual(expectedGetInfoBody);
});
