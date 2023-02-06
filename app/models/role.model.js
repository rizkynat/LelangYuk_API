module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("produks", {
        id_produks: {
            type: Sequelize.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nama_produk: {
            type: Sequelize.STRING
        },
        deskripsi: {
            type: Sequelize.STRING
        },
        harga_dasar: {
            type: Sequelize.INTEGER
        },
        harga_capaian: {
            type: Sequelize.INTEGER
        },
        kategori: {
            type: Sequelize.ENUM('Kendaraan','Fashion','Elektronik','Properti')
        },
        status_aktif: {
            type: Sequelize.ENUM('active', 'unactive')
        },
        status_suka: {
            type: Sequelize.ENUM('active', 'unactive')
        },
        image_url: {
            type: Sequelize.STRING
        },
        jadwal_open: {
            type: Sequelize.DATE
        },
        jadwal_close: {
            type: Sequelize.DATE
        }
    });

    return Role;
}