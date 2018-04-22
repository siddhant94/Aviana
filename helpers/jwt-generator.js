const jwt = require('jsonwebtoken');

module.exports = (userEmail, id) => {
  const JWTToken = jwt.sign(
    {
      email: userEmail,
      _id: id,
    },
    'secret',
    {
      expiresIn: '2h',
    },
  );
  return JWTToken;
};
