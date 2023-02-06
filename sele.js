/* const db = require("./app/models");
const User = db.user;

const user = User.findOne({
  where: { username: "Doe" },
});

console.log(user); */

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

hashPassword('secretpassword').then((hash) => {
  console.log(hash);
});