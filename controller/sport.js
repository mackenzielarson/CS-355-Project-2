/**
 * Created by Mackenzie on 4/25/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all users in a <table> */
router.get('/all', function (req, res) {
    db.SGetAll(function (err, result) {
            if (err) throw err;
            res.render('displaySportTable.ejs', {rs: result});
        }
    );
});


/* View a single users information */
router.get('/', function (req, res) {
    if(req.query.hsid == null) {
        res.redirect('/sport/all');
    }
    else {
        db.SGetByID(req.query.sportid, function (err, result) {
                console.log(result);
                if (err) throw err;
                console.log(result);
                res.render('displaySportInfo.ejs', {rs: result, SportID: req.query.SportID});
            }
        );
    }
});


router.get('/create', function(req, res){
    db.HSGetAll(function (err, hs) {
        if (err) throw err;
        res.render('createSportForm.ejs', {action: '/sport/create', rs: hs});
        console.log("rendered created page");
    })
});

router.post('/create', function (req, res) {
    console.log("trying to post info snippet");
    console.log(req.body);
    db.SInsert( req.body, function (err, result) {
            if (err) throw err;
            //console.log(req.body);
            if(typeof result.insertId !== 'undefined') {
                db.HSGetByName(req.body.hsname, function(err, hs) {
                    if(err) throw err;
                    console.log(hs);
                db.SGetByID(result.insertId, function(err, result) {
                    if (err) throw err;
                    res.render('displaySportInfoSnippet.ejs', {rs: result, SportID: result.insertId, hs: hs});
                });
                });
            }
            else {
                res.send('Sport was not inserted.');
            }
        }
    );
});

router.get('/delete', function(req, res){
    db.SDelete(req.query.SportID, function(err, result){
        if(err) throw err;
        res.redirect('/hs/view?hs_id=' + req.query.HSID);;
    })
})


router.get('/edit', function(req, res){
    console.log(req.query);
    db.SGetByID(req.query.SportID, function(err, result){
        if(err) throw err;
        console.log(result);
        res.render('sportEditForm.ejs', {rs: result, action: '/sport/edit'});
    })
})

router.post('/edit', function(req, res){
    console.log(req.body);
    db.SUpdate(req.body, function(err, result){
        if(err) throw err;
        //onsole.log("SportID: " + req.body.sportid)
        db.SGetByID(req.body.sportid, function(err, result){
            if(err) throw err;
            res.render('displaySportUpdatedSnippet.ejs', {rs: result});
        });
    })
});

router.get('/teaminfo', function(req, res) {
    db.SGetByID(req.query.SportID, function (err, sport) {
        if (err) throw err;
        console.log(sport);
        db.PlayerGetBySportID(sport[0].SportID, function (err, player) {
            if (err) throw err;
            console.log(player);
            db.CoachGetBySportID(sport[0].SportID, function (err, coach) {
                if (err) throw err;
                console.log(coach);
                res.render('displaySportInfo.ejs', {sport: sport, player: player, coach: coach, teamid: req.query.SportID});
            })
        })
    })
})


module.exports = router;