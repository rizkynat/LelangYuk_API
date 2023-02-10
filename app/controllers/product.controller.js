const db = require('../models')
const Product = db.product

exports.create = (req, res) => {
    // Save user to database
    console.log(req.file)
    // split filename from path storage/product
    const filenameRequest = req.file.filename
    const filenameProduct = filenameRequest.split("/")[2]
    Product.create({
        nama_produk: req.body.nama_produk,
        deskripsi: req.body.deskripsi,
        harga_dasar: req.body.harga_dasar,
        harga_capaian: req.body.harga_capaian,
        kategori: req.body.kategori,
        status_aktif: req.body.status_aktif,
        status_suka: req.body.status_suka,
        image_url: filenameProduct,
        jadwal_open: req.body.jadwal_open,
        jadwal_close: req.body.jadwal_close 
    })
    .then(product => {
        console.log(product)
        res.send({message: "Data added successfully!"})
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    })
}