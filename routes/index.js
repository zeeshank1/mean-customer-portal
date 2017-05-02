var express = require('express');
var router = express.Router();
var connection = require('./../config/server');

/* GET default home page */
router.get('/', function(req, res) {
    console.log('zzzzzzzzzzzzzzzzzzzzz');
    res.sendFile('ddddindex.html');// res.sendFile: send the give file in response :  Transfers the file at the given path
});

router.get('/customers', function(req, res) {
    
    var query = connection.query('SELECT * FROM customer', function(err, rows) {
        if (err) {console.log("Error Selecting : %s ", err);}
        res.json({
            data: rows
        });
    });
    // console.log(query.sql);
});

router.get('/editcustomer/:id', function(req, res) {
    
    var id = req.params.id;
    var query = connection.query('SELECT * FROM customer WHERE id = ?', [id], function(err, rows) {
        if (err) // console.log("Error Selecting : %s ", err);
        res.json({
            data: rows
        });
        // console.log("data is" + rows)
    });
    // console.log(query.sql);
});

router.post('/saveeditcustomer', function(req, res) {
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = Number(input.id);
    var data = {
        name: input.name,
        address: input.address,
        email: input.email,
        contact_no: Number(input.contact_no),
    };

    connection.query("UPDATE customer set ? WHERE id = ? ", [data, id], function(err, rows) {
        if (err) 
        console.log("Error Updating : %s ", err);
        res.redirect('/customers');
    });
});

router.post('/savecustomer', function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
        name: input.name,
        address: input.address,
        email: input.email,
        contact_no: input.contact_no
    };

    var query = connection.query("INSERT INTO customer set ? ", data, function(err, rows) {
        if (err) { console.log("Error inserting : %s ", err);}
        res.redirect('/customers');
    });

});

router.delete('/deletecustomer/:id', function(req, res) {

    var id = req.params.id;    
    connection.query("DELETE FROM customer  WHERE id = ? ", [id], function(err, rows) {
        if (err) // console.log("Error deleting : %s ", err);
        res.json({
            status: 1,
            msg: 'sucessfully deleted'
        });
    });
});

module.exports = router;