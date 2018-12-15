const jwt = require('jsonwebtoken');
const config = require('../config/config-sample');

// const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0Bnb29nbGUuY29tIiw
// iX2lkIjoiNWFlNDNjMmNiZmE5NG
// IzMjAxYzcyYWRiIiwiYXBwX2tleSI6Im1kNW00ODJocWJ0IiwiaWF0IjoxNTI1NTE0NzIzLCJleHA
// iOjE1MjU1MjE5MjN9.UN8fXPxPPFD_FjO0jrGmLFOqRxSQqprYFSUTNZS2eHY';

const verifyJWTTokenForAccessToken = (accessTokenGot, secret) => {
  const jwtVerifyResponse = jwt.verify(accessTokenGot, secret, (err, decoded) => {
    if (err) {
      throw (err);
    }
    return decoded;
  });
  return jwtVerifyResponse;
};
// verifyJWTTokenForAccessToken(accessToken, 'secret');

const createAccessToken = (userEmail, id, appKey) => {
  const JWTToken = jwt.sign(
    {
      email: userEmail,
      _id: id,
      app_key: appKey,
    },
    config.app_secret,
    {
      // expiresIn: '2h',
      expiresIn: '2h',
    },
  );
  return JWTToken;
};
exports.createAccessToken = createAccessToken;
exports.verifyJWTTokenForAccessToken = verifyJWTTokenForAccessToken;
