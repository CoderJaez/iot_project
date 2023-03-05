const { mongoose } = require("mongoose");
const bycrypt = require("bcrypt");
const TryCatch = require("../utils/tryCatch");
const User = require("../models/user");
const { use } = require("../routes/readings");
async function encryptPass(pass) {
  let encryptedPass;
  await bycrypt.hash(pass, 10, function (err, hash) {
    encryptedPass = hash;
  });
  return encryptedPass;
}
module.exports = {
  insertUser: TryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    let user = new User({
      name: name,
      email: email,
      password: encryptPass(password),
    });

    user = await user.save();
    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Error saving user" });

    return res
      .status(200)
      .json({ success: true, message: "New user registered." });
  }),
  getUser: TryCatch(async (req, res) => {}),
};
