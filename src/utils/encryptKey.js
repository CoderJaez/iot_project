const crypto = require("crypto");

const EncryptKey = () => {
  try {
    const key = "hardware";
    const hash = crypto.createHash("md5", { outputLength: 16 });
    hash.update(key);
    const hashKey = hash.digest("hex");
    return hashKey;
  } catch (err) {
    console.error("Error Encryption:", err);
  }
};

module.exports = EncryptKey;
