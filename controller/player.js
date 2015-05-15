/**
 * Created by Mackenzie on 5/7/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');

router.get('/moreinfo', function(req, res) {
    db.PlayerGetByID(req.query.PlayerID, function (err, player) {
        if (err) throw err;
        console.log(player);
        db.PlayerGetByHSTeamID(req.query.HSTeamID, function (err, hsteam) {
            if (err) throw err;
            console.log(hsteam);
            db.PlayerGetFromRoster(player[0].PlayerID, hsteam[0].HSTeamID, function (err, player) {
                if (err) throw err;
                res.render('displayPlayerInfo.ejs', { player: player, hsteam: hsteam})
            })
        })
    })
})

router.get('/delete', function(req, res){
    db.PlayerGetByID(req.query.PlayerID, function (err, player) {
        if (err) throw err;
        console.log(player);
        db.PlayerGetByHSTeamID(req.query.HSTeamID, function (err, hsteam) {
            if (err) throw err;
            console.log(hsteam);
            db.PlayerDeleteFromRoster(player[0].PlayerID, hsteam[0].HSTeamID, function (err, player) {
                if (err) throw err;
                res.redirect('/sport/teaminfo?SportID=' + req.query.SportID);
                //res.render('displayPlayerInfo.ejs', { player: player, hsteam: hsteam})
            })
        })
    })
})

router.get('/create', function(req, res){
    db.HSGetAll(function (err, hs) {
        if (err) throw err;
        db.SGetAll(function (err, sport) {
            if (err) throw err;
            res.render('createPlayerForm.ejs', {action: '/player/create',hs: hs, sport: sport, hsteamid: req.query.SportID, sportid: req.query.SportID});
        })
    })
});

router.post('/create', function (req, res) {
    console.log(req.body);
    db.PlayerInsert( req.body, function (err, newPlayer) {
            if (err) throw err;
            console.log(req.body);
            if(typeof newPlayer.insertId !== 'undefined') {
                db.PlayerGetByID(newPlayer.insertId, function (err, result) {
                    if (err) throw err;
                    db.PlayerGetByHSTeamID(req.body.HSTeamID, function (err, hsteam) {
                        if (err) throw err;
                        console.log(req.query.hsteamid);
                        console.log(hsteam);
                        db.RosterInsert(newPlayer.insertId, req.body, function (err, result) {
                            if (typeof newPlayer.insertId !== 'undefined') {
                                db.HSGetByName(req.body.hsname, function (err, hs) {
                                    if (err) throw err;
                                    console.log(hs);
                                    db.SGetByID(req.body.SportID, function (err, sport) {
                                        if (err) throw err;
                                        console.log(sport);
                                        db.PlayerGetByID(newPlayer.insertId, function (err, player) {
                                            res.render('displayPlayerInfoSnippet.ejs', {
                                                rs: player,
                                                PlayerID: newPlayer.insertId,
                                                hs: hs,
                                                sport: sport

                                            });
                                        })
                                    });
                                });
                            }
                            else {
                                res.send('Player was not inserted.');
                            }
                        })
                    })
                })
            }
        }
    );
});


router.get('/edit', function(req, res) {
    console.log(req.query);
    db.PlayerGetByID(req.query.PlayerID, function (err, player) {
        if (err) throw err;
        console.log(player);
        db.PlayerGetByHSTeamID(req.query.HSTeamID, function (err, hsteam) {
            if (err) throw err;
            console.log(hsteam);
            console.log("got here1");
            db.PlayerGetFromRoster(player[0].PlayerID, hsteam[0].HSTeamID, function (err, player) {
                if (err) throw err;
                console.log("got here2");
                res.render('playerEditForm.ejs', {player:player, hsteam:hsteam, action: '/player/edit'});
                console.log("got here3");
            })
        })
    })
})

router.post('/edit', function(req, res){
    console.log(req.body);
    console.log("got here4");
    db.PlayerUpdate(req.body, function(err, result){
        if(err) throw err;
        console.log("PlayerID: " + req.body.playerid);
        console.log("got here5");
        db.PlayerGetByID(req.body.playerid, function (err, player) {
            if (err) throw err;
            console.log(player);
            console.log("got here6");
            console.log("PlayerID: " + req.body.playerid);
            //new bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            db.PlayerGetByHSTeamID(req.body.hsteamid, function (err, hsteam) {
                console.log("got here7");
                if (err) throw err;
                console.log(hsteam);
                db.PlayerGetFromRoster(player[0].PlayerID, hsteam[0].HSTeamID, function (err, player) {
                    if (err) throw err;
                    res.render('displayPlayerUpdatedInfo.ejs', { rs: player, hsteam: hsteam})
                })
            })
        })
    })
});

module.exports = router;