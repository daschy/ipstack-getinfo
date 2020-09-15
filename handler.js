const fetch = require('node-fetch');


module.exports.get = async (event) => {
  const sourceIp= event.requestContext.identity.sourceIp;
  console.log(`Source IP: ${sourceIp}`)
  const ipStackUrl = `${process.env.IP_STACK_BASE_URL}/${sourceIp}?access_key=${process.env.IP_STACK_API_KEY}`;
  const resp = await (await fetch(ipStackUrl)).json();
  console.log({resp});


  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        ip: sourceIp,
        country: resp.country_name,
      },
      null,
      2
    ),
  };
};
