/**
 * Created by Mackenzie on 4/25/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.HSGetAll(function (err, result) {
            if (err) throw err;
            res.render('displayHSTable.ejs', {rs: result});
        }
    );
});


/* View a single users information */
router.get('/', function (req, res) {
    if(req.query.hsid == null) {
        res.redirect('/hs/all');
    }
    else {
        db.HSGetByID(req.query.hsid, function (err, result) {
                console.log(result);
                if (err) throw err;
                console.log(result);
                res.render('displayHSInfo.ejs', {rs: result, HSID: req.query.HSID});
            }
        );
    }
});

// Create HS Form
router.get('/create', function(req, res){
    res.render('createHSForm.ejs', {action: '/hs/create'});
});

// Save HS information
router.post('/create', function (req, res) {
    console.log(req.body);
    db.HSInsert( req.body, function (err, result) {
            if (err)throw err;
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.HSGetByID(result.insertId, function(err, result){

                    res.render('displayHSInfoSnippet.ejs', {rs: result, HSID: result.insertId});

                });
            }
            else {
                res.send('HS was not inserted.');
            }
        }
    );
});


router.get('/update', function (req, res) {
    console.log(req.query);
    db.HSGetByID(req.query.HSID, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.render('updateHSForm.ejs', {rs: result, action: '/hs/update'});
    });
});

router.post('/update', function (req, res) {
    console.log(req.body);
    db.HSUpdate( req.body, function (err, result) {
            if (err)throw err;
            console.log("HSID: " + req.body.hsid);
            db.HSGetByID(req.body.hsid, function(err, result){
                if(err) throw err;
                console.log(req.body);
                res.render('displayHSUpdatedInfoSnippet.ejs', {rs: result});
                });
    })
});

router.get('/delete', function(req, res){
    db.HSGetAll(function(err, result){
       if(err) throw err;
       console.log(result);
            res.render('removeHSForm.ejs', {action: '/hs/remove', rs: result});
    }
    );
});

// Save HS information
router.get('/remove', function (req, res) {
    console.log(req.query);
    db.HSRemove( req.query.hs_id, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('displayHSRemovedInfoSnippet.ejs', {rs: result});
        }
    );
});

router.get('/select', function (req, res) {
    db.HSGetAllView(function (err, result) {
            if (err) throw err;
            res.render('displayHSDropDown.ejs', {rs: result});
        }
    );
});

router.get('/view', function (req, res) {
    db.HSGetByID(req.query.hs_id, function (err, name) {
        if (err) throw err;
        console.log(name);
        db.HSSportGetByHSName(name[0].Name, function(err, sport) {
            if (err) throw err;
            db.TotalWins(req.query.hs_id, function (err, total) {
                if (err) throw err;
                res.render('displayHSInfo.ejs', {name: name, sport: sport, total: total});
            })
        })
    });
})

module.exports = router;

