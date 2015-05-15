/**
 * Created by Mackenzie on 5/7/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');

router.get('/moreinfo', function(req, res) {
    db.CoachGetByID(req.query.CoachID, function (err, coach) {
        if (err) throw err;
        console.log(coach);
        db.CoachGetByHSTeamID(req.query.HSTeamID, function (err, hsteam) {
            if (err) throw err;
            console.log(hsteam);
            db.CoachGetFromRoster(coach[0].CoachID, hsteam[0].HSTeamID, function (err, coach) {
                if (err) throw err;
                res.render('displayCoachInfo.ejs', { coach: coach, hsteam: hsteam})
            })
        })
    })
})

router.get('/delete', function(req, res){
    db.CoachGetByID(req.query.CoachID, function (err, coach) {
        if (err) throw err;
        console.log(coach);
        db.CoachGetByHSTeamID(req.query.HSTeamID, function (err, hsteam) {
            if (err) throw err;
            console.log(hsteam);
            db.CoachDeleteFromRoster(coach[0].CoachID, hsteam[0].HSTeamID, function (err, coach) {
                if (err) throw err;
                res.redirect('/sport/teaminfo?SportID=' + req.query.SportID);
                //res.render('displayPlayerInfo.ejs', { player: player, hsteam: hsteam})
            })
        })
    })
})

router.get('/edit', function(req, res) {
    console.log(req.query);
    db.CoachGetByID(req.query.CoachID, function (err, coach) {
        if (err) throw err;
        console.log(coach);
        db.CoachGetByHSTeamID(req.query.HSTeamID, function (err, hsteam) {
            if (err) throw err;
            console.log(hsteam);
            db.CoachGetFromRoster(coach[0].CoachID, hsteam[0].HSTeamID, function (err, coach) {
                if (err) throw err;
                res.render('coachEditForm.ejs', {coach:coach, hsteam:hsteam, action: '/coach/edit'});
            })
        })
    })
})

router.post('/edit', function(req, res){
    console.log(req.body);
    db.CoachUpdate(req.body, function(err, result){
        if(err) throw err;
        console.log("CoachID: " + req.body.coachid);
        db.CoachGetByID(req.body.coachid, function (err, coach) {
            if (err) throw err;
            console.log(coach);
            db.CoachGetByHSTeamID(req.body.hsteamid, function (err, hsteam) {
                if (err) throw err;
                console.log(hsteam);
                db.CoachGetFromRoster(coach[0].CoachID, hsteam[0].HSTeamID, function (err, coach) {
                    if (err) throw err;
                    res.render('displayCoachUpdatedInfo.ejs', { rs: coach, hsteam: hsteam})
                })
            })
        })
    })
});



router.get('/create', function(req, res){
    db.HSGetAll(function (err, hs) {
        if (err) throw err;
        db.SGetAll(function (err, sport) {
            if (err) throw err;
            res.render('createCoachForm.ejs', {action: '/coach/create', hs: hs, sport: sport, hsteamid: req.query.SportID, sportid: req.query.SportID});
        })
    })
});


router.post('/create', function (req, res) {
    console.log(req.body);
    db.CoachInsert( req.body, function (err, newCoach) {
            if (err) throw err;
            console.log(req.body);
            if(typeof newCoach.insertId !== 'undefined') {
                db.CoachGetByID(newCoach.insertId, function (err, result) {
                    if (err) throw err;
                    db.CoachGetByHSTeamID(req.body.HSTeamID, function (err, hsteam) {
                        if (err) throw err;
                        console.log(req.query.hsteamid);
                        console.log(hsteam);
                        db.CRosterInsert(newCoach.insertId, req.body, function (err, result) {
                            if (typeof newCoach.insertId !== 'undefined') {
                                db.HSGetByName(req.body.hsname, function (err, hs) {
                                    if (err) throw err;
                                    console.log(hs);
                                    db.SGetByID(req.body.SportID, function (err, sport) {
                                        if (err) throw err;
                                        console.log(sport);
                                        db.CoachGetByID(newCoach.insertId, function (err, coach) {
                                            res.render('displayCoachInfoSnippet.ejs', {
                                                rs: coach,
                                                CoachID: newCoach.insertId,
                                                hs: hs,
                                                sport: sport

                                            });
                                        })
                                    });
                                });
                            }
                            else {
                                res.send('Coach was not inserted.');
                            }
                        })
                    })
                })
            }
        }
    );
});










module.exports = router;