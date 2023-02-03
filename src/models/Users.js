const pool = require('../configs/database')
let Users = {}

// Request users table
Users.allUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Users ', (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users)
        });
    });
};

Users.getUsersByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM Users WHERE email = ?', [email], (errors, users) =>{
            if(error){
                return reject(error)
            }
            return resolve(users[0])
        })
    })
}

Users.insertUsers = (username, email, password) => {
    return new Promise((resolve, reject) =>{
        pool.query('INSERT into Users (username, email, password) VALUES(?, ?, ?)', [username, email, password], (error, result ) =>{
            if(error){
                return reject(error)
            }
            return resolve(result.inserId)
        })
    })
}

Users.updateUsers = (username, nama_lengkap, email, password, alamat, no_telp, npwp, image_url) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE Users SET username = ?, email = ?, password = ? WHERE id_users = ?', [username, email, password, id_users], (errors) => {
            if(errors){
                return reject(errors)
            }
            return resolve()
        })
    })
}

Users.deleteUsers = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('DELETE FROM Users WHERE id = ?', [id], (error)=>{
            if(error){
                return reject(error);
            }
            return resolve(console.log("Users deleted"));
        });
    });
};

module.exports = Users