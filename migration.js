
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
  console.log('Resync DB');
  //initial();
});

function initial() {
  Role.create({
    id_roles: 1,
    name: "user"
  });
 
  Role.create({
    id_roles: 2,
    name: "admin"
  });
}
