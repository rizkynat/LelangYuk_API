
module.exports = (sequelize, Sequelize)=>{
    const Users = sequelize.define("users", {
        id_users: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        nama_lengkap: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        alamat: {
            type: Sequelize.STRING
        },
        no_telp: {
            type: Sequelize.STRING
        },
        npwp: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },

    })

    return Users;
}