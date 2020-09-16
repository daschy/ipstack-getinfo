exports.getError = (message, statusCode = 501) => ({
  statusCode,
  body: JSON.stringify(
    {
      error: true,
      message,
    },
    null,
    2,
  ),
});

exports.getOk = (ip, country) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      ip, country,
    },
    null,
    2,
  ),
});
