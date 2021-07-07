const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Amitkawhi0533',
    database: '3rd_project'
});

connection.connect(err => {
    if (err) {
        console.log("error connection" + err.stack);
        return;
    }
    console.log('connected to my sql');
});

const queryHandler = q => {
    return new Promise((resolve, reject) => {
        connection.query(q, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = queryHandler;