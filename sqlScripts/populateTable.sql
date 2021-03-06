/*
Group 7 - StudentWorks
Last Modified - August 6th, 2018

The following script populates initial data for the four tables, USERS, PROJECTS, COMMENTS and BRIDGE_USERS_PROJECTS
in mysql server for StudentWorks project.
There are many commented out records that were used for testing purposes.  They were kept here in case retesting 
was needed in the future.
Note that there was a change last minute, and the COMMENTS data are hosted on a MongoDB instead.
*/

use sw;

INSERT INTO PROJECTS (title, description, creationDate, language, framework, courses, category, ImageFilePath, VideoFilePath, status, color, platform)
VALUES 
    ('Conteract', 'This is a webapp to connect employees with potential employers.', now(), 'Javascript', 'jQuery', 'PRJ666', NULL,'1/img/conteractThumbnail.jpg', '1/video/Conteract.mp4', 'approved', '#eda3a3', 'Windows'),
    ('The Last Transmission', 'This is a game within a 2D world with point and click shooting elements. The camera is situated in a birds eye view, and the objective of the game is to find jerry cans.', now(), 'Java', 'Reactjs', 'PRJ666', NULL, '2/img/TheLastTransmissionThumbnail.jpg', '2/video/TheLastTransmission.mp4', 'approved', '#efeba0', 'Windows'),
    ('Solitary', 'This is a 2D platformer with various puzzles. The object of the game is to reach the end point of the 2D stage.', now(), 'C++', 'Unity', 'PRJ666', NULL, '3/img/solitaryThumbnail.jpg', '3/video/Solitary_-new.mp4', 'approved', '#a0efa1', 'Windows'),
    ('Kitchen Modeller', 'An app to accurrately design the kitchen', '2004-05-01', 'Visual Basic', NULL, NULL, 'utility', '4/img/kitchen.png', '4/video/Kitchen.mp4', 'approved', '#a0d9ef', 'Windows'),
    ('Arcanoid Game', 'A version of the popular arcanoid game from the 80s', '2005-05-01', 'C++', NULL, NULL, 'game','5/img/arcanoid1.png', '5/video/Arcanoid.mp4', 'approved', '#cca9d8', 'Windows'),       
    ('Calculator App', 'This is a calculator meant for doing simple arithmetic', now(), 'C++', 'Chai', 'JAC444', 'android', '6/img/calculatorAppThumbnail.jpg', '6/video/calculator videos - exponents.mp4', 'approved', '#f5f5f5', 'Windows'),
    ('Chess App', 'This is a chess app with a very smart AI', now(), 'C++', 'nginx', 'JAC444', 'linux', 'images/empty.png', null, 'approved',  '#eda3a3', 'Windows'),
    ('StudentWorks', 'This is our school project for PRJ666. The attached instructional video recorded using StudentWorks', now(), 'JavaScript', 'Express.js', null, 'Content management', '8/img/logo-1533678847447.png','8/video/how_to_StudentWorks-1533678312817.webm', 'approved', '#a0d9ef', 'Windows');
    /*
    ('Language filter project#1', 'This is a project to test the language filter using C++ as the language value.', now(), 'C++', 'Visual Studio', 'OOP244', 'linux', 'images/empty.png', null),
    ('Language filter project#2', 'This is a project to test the language filter using C++ as the language value.', now(), 'C++', 'GNU', 'IPC144', 'windows', 'images/empty.png', null),
    ('Language filter project#3', 'This is a project to test the language filter using C++ as the language value.', now(), 'C++', 'Boost', 'OOP345', 'mac', 'images/empty.png', null),
    ('Language filter project#4', 'This is a project to test the language filter using C++ as the language value.', now(), 'C++', 'nginx', 'OOP244', 'linux', 'images/empty.png', null),
    ('Language filter project#5', 'This is a project to test the language filter using C++ as the language value.', now(), 'C++', 'COM', 'OOP244', 'windows', 'images/empty.png', null),
    ('Language filter project#6', 'This is a project to test the language filter using C++ as the language value.', now(), 'C++', 'ATL', 'OOP244', 'mac', 'images/empty.png', null),
    ('Framework filter project#1', 'This is a project to test the framework filter using jQuery as the framework value.', now(), 'Javascript', 'jQuery', 'INT222', 'linux', 'images/empty.png', null),
    ('Framework filter project#2', 'This is a project to test the framework filter using jQuery as the framework value.', now(), 'Javascript', 'jQuery', 'INT322', 'windows', 'images/empty.png', null),
    ('Framework filter project#3', 'This is a project to test the framework filter using jQuery as the framework value.', now(), 'Javascript', 'jQuery', 'INT422', 'mac', 'images/empty.png', null),
    ('Framework filter project#4', 'This is a project to test the framework filter using jQuery as the framework value.', now(), 'Javascript', 'jQuery', 'INT222', 'linux', 'images/empty.png', null),
    ('Framework filter project#5', 'This is a project to test the framework filter using jQuery as the framework value.', now(), 'Javascript', 'jQuery', 'INT322', 'windows', 'images/empty.png', null),
    ('Framework filter project#6', 'This is a project to test the framework filter using jQuery as the framework value.', now(), 'Javascript', 'jQuery', 'INT422', 'mac', 'images/empty.png', null),
    ('Category filter project#1', 'This is a project to test the category filter using game as the category value.', now(), null, null, null, 'game', 'images/empty.png', null),
    ('Category filter project#2', 'This is a project to test the category filter using game as the category value.', now(), null, null, null, 'game', 'images/empty.png', null),
    ('Category filter project#3', 'This is a project to test the category filter using game as the category value.', now(), null, null, null, 'game', 'images/empty.png', null),
    ('Category filter project#4', 'This is a project to test the category filter using game as the category value.', now(), null, null, null, 'game', 'images/empty.png', null),
    ('Category filter project#5', 'This is a project to test the category filter using game as the category value.', now(), null, null, null, 'game', 'images/empty.png', null),
    ('Category filter project#6', 'This is a project to test the category filter using game as the category value.', now(), null, null, null, 'game', 'images/empty.png', null);
    
    */


INSERT INTO USERS (firstName, lastName, password, email, userName, userType, program, registrationStatus, registrationDate, registrationCode, imagePath, userDescription)
VALUES
    ('Fred', 'Smith', 'PassWrd', 'fs@myseneca.ca', 'fred_s', 'Contributor', 'BSD', TRUE, now(), '123', null, null),
    ('Charlotte', 'Baptist', 'MyNameIsCB12','cbaptist@myseneca.ca', 'cbaptist', 'Contributor', 'DDA', TRUE, now(), '234', null, null),
    ('Huda', 'Al Dallal', 'myPassw0rd4', 'hal-dallal@myseneca.ca', 'huda_a', 'Admin', 'CPA', TRUE, now(), '345', null, null),
    ('John','Smith', 'pass1234', 'johnsmith12@myseneca.ca', 'johns', 'Contributor', 'CPD', FALSE, '2017-12-25', '456', null, null),
    ('Owen', 'Mak', 'asdf1234', 'omak@myseneca.ca', 'omak', 'Admin', 'CPA', TRUE, now(), '567', null, null),
    ('Jon', 'Snow', 'Winterfell', 'john@gmail.com', 'jsnow', 'Contributor', null, FALSE, '2016-01-01', '678', null, null),
    ('John', 'Doe', 'm1ss1ng', 'unknown@nowhere.com', 'jDoe', 'Contributor', null, FALSE, '2013-06-06', '789', null, null),
    ('Vasia', 'Jopovych', 'vj123', 'vjopovych@hotmail.com', 'vJopovych', 'Contributor', null, TRUE, '2018-01-01', '890', null, null),
    ('Vaselisa', 'Pizdaivanovna', 'vp456', 'vPizdaivanovna@gmail.com', 'vPizdaivanovna','Contributor', null, TRUE, '2018-01-01', '901', null, null),
    ('Johnny', 'Waters', 'jw789', 'jWaters@gmail.com', 'jWaters', 'Contributor', null, TRUE, '2018-01-01', '1234', null, null),
    ('Yuriy', 'Kartuzov', 'yuriy', 'kyuriy@myseneca.ca', 'yuriy', 'Contributor', null, TRUE, now(), '12345', '/userPhotos/Profile 2-1532837282989.png', null),
    ('Yuriy', 'Kartuzov', 'yuriyA', 'kyuriy@myseneca.ca', 'yuriyA', 'Admin', null, TRUE, now(), '12345', '/userPhotos/Profile 2-1532837282989.png', null),
    ('Not Really', 'Owen', 'asdf1234', 'owenmak325@gmail.com', 'NotOwen', 'Admin', 'CPA', TRUE, now(), '12345', '/userPhotos/akatsuki_ninja-1533266311759.jpg', 'This profile belongs to Owen');


/* Associate users to projects:
    Fred (UserID == 1)      -> WebForm (projectID == 2)
    Charlotte (UserID == 2) -> Calculator (projectID == 2)
    Huda (UserID == 3)      -> WebForm (projectID == 1)
    John (UserID == 4)      -> no projects (NULL)
*/

INSERT INTO BRIDGE_USERS_PROJECTS (userID, projectID)
VALUES
    (1, 2),
    (2, 2),
    (3, 1),
    (3, 2),
    (5, 3),
    (11, 4),
    (5, 5),
    (4, 6),
    (5, 6),
    (6, 4),
    (7, 4),    
    (8, 1),
    (9, 1),
    (10, 1),
    (2, 6),
    (3, 8),
    (5, 8),
    (11, 8);

INSERT INTO COMMENTS (userID, commentContent, date)
VALUES
/* I'm pretty sure you need to know which project this belongs to */
    (1, 'Hey, what library did you use for this?', now()),
    (2, 'Wow, great job! Can I pm you for some questions', now()),
    (1, 'Yes, go ahead', now()),
    (3, 'Thanks for your contribution!', now());
    