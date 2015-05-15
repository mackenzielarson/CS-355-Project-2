# CS-355-Project-2
CS 355 Project 2 MVC Complete! Used Intellij 
#MYSQL STATEMENTS
SET foreign_key_checks = 0;
-- Project 01 HIGH SCHOOL SPORT TEAM DATABASE -- AUTHOR: MACKENZIE LARSON -- DATE:4/5/15

-- DROP TABLES IF EXISTS
DROP TABLE IF EXISTS SportHS; 
DROP TABLE IF EXISTS Roster; 
DROP TABLE IF EXISTS CRoster; 
DROP TABLE IF EXISTS Sport; 
DROP TABLE IF EXISTS Player; 
DROP TABLE IF EXISTS Coach; 
DROP TABLE IF EXISTS HS;

-- CREATING TABLES

CREATE TABLE HS( 
HSID INT PRIMARY KEY AUTO_INCREMENT, 
Name VARCHAR(200), 
Address VARCHAR(200)
);

CREATE TABLE Player( 
PlayerID INT PRIMARY KEY AUTO_INCREMENT, 
First_Name VARCHAR(50), 
Last_Name VARCHAR(50), 
HSName VARCHAR(200), 
Number INT, 
Age INT, 
Phone_Num VARCHAR(50), 
Email VARCHAR(100), 
Address VARCHAR(200) );

CREATE TABLE Coach( 
CoachID INT PRIMARY KEY AUTO_INCREMENT, 
Name VARCHAR(200), 
Phone_Num VARCHAR(50), 
Email VARCHAR(100), 
Address VARCHAR(200) );

CREATE TABLE Sport( 
SportID INT PRIMARY KEY AUTO_INCREMENT, 
HSName VARCHAR(200), 
SportName VARCHAR(200), 
SportClass VARCHAR(200), 
SportGender VARCHAR(200), 
Wins INT, 
Losses INT );

CREATE TABLE SportHS(
HSID INT, 
SportID INT, 
PRIMARY KEY (HSID, SportID), 
FOREIGN KEY (HSID) REFERENCES HS(HSID), 
FOREIGN KEY (SportID) REFERENCES Sport(SportID) 
); 

CREATE TABLE Roster( 
HSTeamID INT, 
PlayerID INT, 
PRIMARY KEY (HSTeamID, PlayerID), 
FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID), 
FOREIGN KEY (HSTeamID) REFERENCES Sport(SportID) );

CREATE TABLE CRoster( 
HSTeamID INT, 
CoachID INT, 
PRIMARY KEY (HSTeamID, CoachID), 
FOREIGN KEY (HSTeamID) REFERENCES Sport(SportID), 
FOREIGN KEY (CoachID) REFERENCES Coach(CoachID) );

DROP FUNCTION IF EXISTS Total_Wins;
DELIMITER //
CREATE FUNCTION Total_Wins(_hs_id int) RETURNS INT
begin
	DECLARE wins INT;
    SELECT SUM(Sport.Wins) 	INTO wins FROM HS 
    JOIN Sport ON HS.Name = Sport.HSName
    WHERE HS.HSID = _hs_id;
    RETURN wins;
end //
DELIMITER ;


    
-- Some SQL INSERTS to populate my database :) 

INSERT INTO HS(Name, Address) VALUES ("CHS", "1800 Broadmoor Drive");  
INSERT INTO HS(Name, Address) VALUES ("DVHS", "123 Happy Place");   
INSERT INTO HS(Name, Address) VALUES ("DELETE ME", "TRY TO DELETE THIS HS!");  

INSERT INTO Sport(HSName, SportName, SportClass, SportGender, Wins, Losses) VALUES ("CHS", "Volleyball", "Varsity", "Men", 33, 5); 
INSERT INTO Sport(HSName, SportName, SportClass, SportGender, Wins, Losses) VALUES ("CHS", "Water Polo", "Varsity", "Women", 13, 7);

INSERT INTO Sport(HSName, SportName, SportClass, SportGender, Wins, Losses) VALUES ("DVHS", "Football", "Varsity", "Men", 4, 15);
INSERT INTO Sport(HSName, SportName, SportClass, SportGender, Wins, Losses) VALUES ("DVHS", "Golf", "JV", "Women", 5, 7);
  
INSERT INTO Player(First_Name, Last_Name, HSName, Number , Age, Phone_Num, Email , Address) VALUES ("Josh", "Larson", "CHS", "17", "17", "123-456-5555", "J@THIS.COM", "333 OVERHERE PLACE"); 
INSERT INTO Player(First_Name, Last_Name, HSName, Number , Age, Phone_Num, Email , Address) VALUES ("Mack", "Larson", "CHS", "5", "20", "111-555-4444", "m@THIS.COM", "345 SOMETHING DR"); 
INSERT INTO Player(First_Name, Last_Name, HSName, Number , Age, Phone_Num, Email , Address) VALUES ("removeME", "removeME", "CHS", "44", "20", "925-888-8000", "DELETEME@DELETETHIS.COM", "22 DELETE THIS DRIVE"); 

INSERT INTO Roster(HSTeamID, PlayerID) VALUES (1,1); 
INSERT INTO Roster(HSTeamID, PlayerID) VALUES (1,2);
INSERT INTO Roster(HSTeamID, PlayerID) VALUES (1,3);


INSERT INTO Coach(Name, Phone_Num, Email, Address) VALUES ('Coach Jenna', '720-800-2000', 'THISISACOACH@gmail.com', '444 Coach Lives Here Lane'); 
INSERT INTO Coach(Name, Phone_Num, Email, Address) VALUES ('Delete Me!', '720-800-5000', 'THISISACOACHEXAMPLE2@gmail.com', '123 Coach Place'); 
INSERT INTO CRoster(CoachID, HSTeamID) VALUES (1, 1);
INSERT INTO CRoster(CoachID, HSTeamID) VALUES (2, 1);
