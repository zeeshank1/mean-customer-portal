
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'curd_db',
    debug: false
});
connection.connect(function(err) {
    if (err) {
        console.error('error connecting MySQL Server : ' + err.stack);
        return;
    }
});
module.exports = connection;