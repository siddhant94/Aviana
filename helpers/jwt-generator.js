const jwt = require('jsonwebtoken');

module.exports = (userEmail, id, appKey) => {
  const JWTToken = jwt.sign(
    {
      email: userEmail,
      _id: id,
      app_key: appKey,
    },
    'secret',
    {
      expiresIn: '2h',
    },
  );
  return JWTToken;
};
