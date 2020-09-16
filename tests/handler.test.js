const fetch = require('node-fetch');

const serviceUrl = 'http://127.0.0.1:3000/dev';

test('handler tests', async () => {
  const respOk = await fetch(`${serviceUrl}?operation=getInfo`);
  expect(respOk.ok).toBe(true);
  const respOkBody = await respOk.json();
  expect(respOkBody).toEqual(expect.objectContaining({
    ip: expect.any(String),
  }));

  const respError = await fetch(`${serviceUrl}?operation=getInfo1`);
  expect(respError.ok).toBe(false);
  const respErrorBody = await respError.json();
  expect(respErrorBody).toEqual(expect.objectContaining({
    error: expect.any(Boolean),
    message: expect.any(String),
  }));

  const respError2 = await fetch(`${serviceUrl}?operation1=getInfo`);
  expect(respError2.ok).toBe(false);
  const respError2Body = await respError2.json();
  expect(respError2Body).toEqual(expect.objectContaining({
    error: expect.any(Boolean),
    message: expect.any(String),
  }));
});
