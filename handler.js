/* eslint-disable no-console */
const assert = require('assert');
const ipstack = require('./libs/ipstackClient');
const { getError, getOk } = require('./libs/responses');

module.exports.get = async (event) => {
  try {
    assert(process.env.IP_STACK_BASE_URL, 'IP_STACK_BASE_URL is null');
    assert(process.env.IP_STACK_ACCESS_KEY, 'IP_STACK_ACCESS_KEY is null');
    assert(process.env.PARAM_OPERATION_NAME, 'PARAM_OPERATION_NAME is null');
    assert(process.env.PARAM_OPERATION_VALUE, 'PARAM_OPERATION_VALUE is null');
  } catch (ex) {
    console.error(`Env vars are not valid: ${ex.message}`);
    return getError('Internal Server Error', 500);
  }

  try {
    const queryParams = event.queryStringParameters;
    const queryParamValue = queryParams[process.env.PARAM_OPERATION_NAME];
    assert(queryParamValue, `param ${process.env.PARAM_OPERATION_NAME} not passed`);
    assert(queryParamValue === process.env.PARAM_OPERATION_VALUE,
      `${process.env.PARAM_OPERATION_NAME} value not valid (${queryParamValue})`);
  } catch (ex) {
    console.error(`Param not valid: ${ex.message}`);
    return getError('Operation not implemented', 501);
  }

  if (!event || !event.requestContext) {
    console.warn('Source IP not valid');
    return getOk(null, null);
  }

  try {
    const { sourceIp } = event.requestContext.identity;
    console.log(`Source IP: ${sourceIp}`);
    const client = ipstack.create(process.env.IP_STACK_BASE_URL, process.env.IP_STACK_ACCESS_KEY);
    const resp = await client.getInfo(sourceIp);
    return getOk(resp.ip, resp.country_name);
  } catch (ex) {
    console.error(`Ipstack error: ${ex.message}`);
    return getError('Internal Server Error', 500);
  }
};
