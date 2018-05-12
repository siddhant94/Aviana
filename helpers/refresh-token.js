const crypto = require('crypto');

module.exports = (userId) => {
// Generate Refresh Token for a unique User.
  const guid = crypto.randomBytes(16).toString(userId);
  if (guid) {
    return guid;
  }
  return null;
};
