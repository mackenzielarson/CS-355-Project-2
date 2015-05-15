var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);



/*Total*/
exports.TotalWins = function(HSID, callback){
    var query= "SELECT Total_Wins("+ HSID +") as total FROM HS;"
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
        }
        console.log(query);
        callback(false, result);
    })
}

exports.WinsTotal = function(HSName, callback){
    var query= "select sum(Wins) from Sport where HSName=" + HSName + ")"
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
        }
        console.log(query);
        callback(false, result);
    })
}

/*PLAYER*/
exports.PlayerGetBySportID = function(sportid, callback){
    var query = 'SELECT p.*, s.*, r.* FROM Sport as s left join Roster as r on s.SportID= r.HSTeamID left JOIN Player as p ON r.PlayerID= p.PlayerID WHERE s.SportID =' + sportid;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.PlayerInsert = function(player_info, callback) {
    //console.log(player_info);
    var query = 'INSERT INTO Player (First_Name, Last_Name, HSName, Number, Age, Phone_Num, Email, Address) VALUES (' +
        '\'' + player_info.fname + '\',' +
        '\'' + player_info.lname + '\',' +
        '\'' + player_info.hsname + '\',' +
        '\'' + player_info.number + '\',' +
        '\'' + player_info.age + '\',' +
        '\'' + player_info.phone + '\',' +
        '\'' + player_info.email + '\',' +
        '\'' + player_info.address + '\')';

    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            console.log(result);
            callback(false, result);
            //console.log("got there...");
        }
    );
}

exports.CoachInsert = function(coach_info, callback) {
    //console.log(player_info);
    var query = 'INSERT INTO Coach (Name, Phone_Num, Email, Address) VALUES (' +
        '\'' + coach_info.name + '\',' +
        '\'' + coach_info.phone + '\',' +
        '\'' + coach_info.email + '\',' +
        '\'' + coach_info.address + '\')';

    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.RosterInsert = function(player_id, player_info, callback){
    var query = 'INSERT INTO Roster (PlayerID, HSTeamID) VALUES (' +
        '\'' + player_id + '\',' +
        '\'' + player_info.HSTeamID + '\')';

    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            console.log(result);
            callback(false, result);
            //console.log("got there...");
        }
    );
}

exports.CRosterInsert = function(coach_id, coach_info, callback){
    var query = 'INSERT INTO CRoster (CoachID, HSTeamID) VALUES (' +
        '\'' + coach_id + '\',' +
        '\'' + coach_info.HSTeamID + '\')';

    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.PlayerGetByHSTeamID = function(hsteamid, callback) {
    console.log(hsteamid);
    var query = 'select * from Roster WHERE HSTeamID=' + hsteamid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.CoachGetByHSTeamID = function(hsteamid, callback) {
    console.log(hsteamid);
    var query = 'select * from CRoster WHERE HSTeamID=' + hsteamid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.PlayerGetByID = function(playerid, callback) {
    console.log(playerid);
    var query = 'select * from Player WHERE PlayerID=' + playerid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.CoachGetByID = function(coachid, callback) {
    console.log(coachid);
    var query = 'select * from Coach WHERE CoachID=' + coachid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.PlayerDeleteFromRoster = function (player, hsteam, callback){
    console.log(player);
    console.log(hsteam);
    var query = 'DELETE FROM Roster WHERE PlayerID=' + player + ' and HSTeamID=' + hsteam;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.CoachDeleteFromRoster = function (coach, hsteam, callback){
    console.log(coach);
    console.log(hsteam);
    var query = 'DELETE FROM CRoster WHERE CoachID=' + coach + ' and HSTeamID=' + hsteam;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}


exports.PlayerGetFromRoster = function (player, hsteam, callback){
    console.log(player);
    console.log(hsteam);
    var query = 'SELECT * FROM Roster WHERE PlayerID=' + player + ' and HSTeamID=' + hsteam;
    console.log(query);
    connection.query(query, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            //console.log("trying to get here");
            var query = 'SELECT p.*, s.*, r.* FROM Roster as r JOIN Player as p ON r.PlayerID= p.PlayerID JOIN Sport as s ON r.HSTeamID=s.SportID WHERE p.PlayerID= ' + player;
            console.log(query);
            connection.query(query,
                function (err, result) {
                    if(err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    callback(false, result);
                }
            );
        }
    })
}


exports.PlayerUpdate = function (player_info, callback){
    var query = 'UPDATE Player SET First_Name=\'' + player_info.fname +
        '\', Last_Name= \'' + player_info.lname +
        '\', Number= \''+ player_info.number +
        '\', Age= \''+ player_info.age +
        '\', Phone_Num= \''+ player_info.phone +
        '\', Email= \''+ player_info.email +
        '\', Address= \''+ player_info.address +
        '\' WHERE PlayerID=' + player_info.playerid;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}


/*Coach*/

exports.CoachUpdate = function (coach_info, callback){
    var query = 'UPDATE Coach SET Name=\'' + coach_info.name +
        '\', Phone_Num= \''+ coach_info.phone +
        '\', Email= \''+ coach_info.email +
        '\', Address= \''+ coach_info.address +
        '\' WHERE CoachID=' + coach_info.coachid;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}


exports.CoachGetFromRoster = function (coach, hsteam, callback){
    console.log(coach);
    console.log(hsteam);
    var query = 'SELECT * FROM CRoster WHERE CoachID=' + coach + ' and HSTeamID=' + hsteam;
    console.log(query);
    connection.query(query, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            //console.log("trying to get here");
            var query = 'SELECT c.*, s.*, cr.* FROM CRoster as cr JOIN Coach as c ON cr.CoachID= c.CoachID JOIN Sport as s ON cr.HSTeamID=s.SportID WHERE c.CoachID= '  + coach;
            console.log(query);
            connection.query(query,
                function (err, result) {
                    if(err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    callback(false, result);
                }
            );
        }
    })
}

exports.CoachGetBySportID = function(sportid, callback){
    var query  ='SELECT c.*, s.*, cr.* FROM Sport as s left join CRoster as cr on s.SportID= cr.HSTeamID left JOIN Coach as c ON cr.CoachID= c.CoachID WHERE s.SportID =' + sportid;
    var HSTeamID;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}
/*SPORT*/

exports.SUpdate = function(sport_info, callback){
    var query = 'UPDATE Sport SET SportName=' +
        '\'' + sport_info.sname + '\', ' +
        'SportClass= \'' + sport_info.sclass + '\',' +
        'SportGender= \''+ sport_info.sgender + '\', ' +
        'Wins= \''+ sport_info.wins + '\', ' +
        'Losses= \''+ sport_info.losses + '\' ' +
        'WHERE SportID=' + sport_info.sportid;
    console.log(query);
    connection.query(query, function(err, result){
        if(err){
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    })
}

exports.SDelete = function(sportid, callback){
    var query = 'DELETE FROM Sport WHERE SportID = ' + sportid;
    connection.query(query, function(err, result) {
        if (err) {
            console.log(query);
            console.log(err);
            callback(true);
            return;
        }
        console.log(query);
        callback(false, result);
    })
}

exports.SGetAll = function(callback) {
    connection.query('select * from Sport',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.SGetAllView = function(callback) {
    connection.query('select SportID, HSName, SportName, SportClass, SportGender, Wins, Losses from Sport',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.SGetByID = function(sportid, callback) {
    console.log(sportid);
    var query = 'select * from Sport WHERE SportID=' + sportid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.HSGetByName = function(hsname, callback) {
    console.log(hsname);
    var query = 'select * from HS WHERE Name="' + hsname + '"';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.SInsert = function(sport_info, callback) {
    //console.log(sport_info);
    var query = 'INSERT INTO Sport (HSName, SportName, SportClass, SportGender, Wins, Losses) VALUES (' +
        '\'' + sport_info.hsname + '\', ' +
        '\'' + sport_info.sname + '\',  ' +
        '\'' + sport_info.sclass + '\', ' +
        '\'' + sport_info.sgender + '\', ' +
        '\'' + sport_info.wins + '\', ' +
        '\'' + sport_info.losses + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            console.log(result);
            callback(false, result);
            console.log("got there...");
        }
    );
}


/*HS*/
exports.HSGetAll = function(callback) {
    connection.query('select * from HS',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.HSGetAllView = function(callback) {
        connection.query('select HSID, Name, Address from HS',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.HSGetByID = function(hsid, callback) {
    console.log(hsid);
    var query = 'select * from HS WHERE HSID=' + hsid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}



exports.HSSportGetByHSName = function(hsname, callback) {
    console.log(hsname);
    var query = 'select * from Sport where HSName="' + hsname + '"';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//SUM OF WINS!
exports.SportWinsTotalGetByHSName = function(hsname, callback) {
    console.log(hsname);
    var query = 'select sum(Wins) from Sport where HSName="' + hsname + '"';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.HSInsert = function(hs_info, callback) {
    console.log(hs_info);
    var query = 'INSERT INTO HS (Name, Address) VALUES (\'' + hs_info.name + '\', \'' + hs_info.address + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log("oh no");
                console.log(err);
                callback(true);
                return
            }
            console.log("in the clear...");
            callback(false, result);
        }
    );
}

exports.HSUpdate = function(hs_id, callback){
    console.log(hs_id);
    var query =  'UPDATE HS SET Name= \'' + hs_id.name + '\', Address= \'' + hs_id.address  +  '\' WHERE HSID=' + hs_id.hsid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

exports.HSRemove = function(hs_id, callback) {
    console.log(hs_id);
    var query = 'DELETE FROM HS WHERE HSID= (\'' + hs_id + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}


