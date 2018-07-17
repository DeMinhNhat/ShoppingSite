CREATE DATABASE qlbh;
USE qlbh;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- CREATE TABLES

CREATE TABLE `clienteles` (
	`CliID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`CliName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`CliID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
	`BraID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`BraName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`BraID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `categories` (
	`CatID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`CliID` int(11) UNSIGNED NOT NULL,
	`CatName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`CatID`),
	INDEX CliId (CliID),
	FOREIGN KEY (`CliID`) REFERENCES clienteles(`CliID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `users` (
	`f_ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`f_Username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`f_Email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`f_DOB` date NOT NULL,
	`f_Gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
	`f_Phone` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
	`f_Address` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
	`f_Permission` int(11) NOT NULL,
	PRIMARY KEY (`f_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `products` (
	`ProID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`ProName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
	`TinyDes` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	`FullDes` text COLLATE utf8_unicode_ci NOT NULL,
	`Price` int(11) NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Clicks` int(11) NOT NULL DEFAULT 0,
	`SoldQuantity` int(11) NOT NULL DEFAULT 0,
	`ImportDate` date NOT NULL,
	`SaleOff` int(11) UNSIGNED NOT NULL DEFAULT 0,
	`CatID` int(11) UNSIGNED NOT NULL,
	`BraID` int(11) UNSIGNED NOT NULL,
	PRIMARY KEY (`ProID`),
	INDEX CatId (CatID),
	FOREIGN KEY (`CatID`) REFERENCES categories(`CatID`) ON DELETE CASCADE,
	INDEX BraId (BraID),
	FOREIGN KEY (`BraID`) REFERENCES brands(`BraID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `orders` (
	`OrderID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderDate` datetime NOT NULL,
	`UserID` int(11) UNSIGNED NOT NULL,
	`Total` bigint(20) NOT NULL,
	`State` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,	-- Đã giao = 1 | Chưa giao = 0 | Đã hủy = -1
	PRIMARY KEY (`OrderID`),
	INDEX UserId (UserID),
	FOREIGN KEY (`UserID`) REFERENCES users(`f_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `orderdetails` (
	`ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`OrderID` int(11) UNSIGNED NOT NULL,
	`ProID` int(11) UNSIGNED NOT NULL,
	`Quantity` int(11) NOT NULL,
	`Amount` int(11) NOT NULL,
	PRIMARY KEY (`ID`),
	INDEX OrderId (OrderID),
	FOREIGN KEY (`OrderID`) REFERENCES orders(`OrderID`) ON DELETE CASCADE,
	INDEX ProId (ProID),
	FOREIGN KEY (`ProID`) REFERENCES products(`ProID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- INSERT TABLES

insert into  clienteles (CliID,CliName) value ( 1, "Phụ nữ");
insert into  clienteles (CliID,CliName) value ( 2, "Nam giới");

insert into  brands (BraID,BraName,Origin) value ( 1, "Herschel", "Canada");
insert into  brands (BraID,BraName,Origin) value ( 2, "Nike", "Amenica");
insert into  brands (BraID,BraName,Origin) value ( 3, "North-face", "Amenica");
insert into  brands (BraID,BraName,Origin) value ( 4, "Swiss-gear", " Switzerland");
insert into  brands (BraID,BraName,Origin) value ( 5, "Under-armour", "America");

insert into  categories (CatID,CliID,CatName) value ( 1,1, "Đầm");
insert into  categories (CatID,CliID,CatName) value ( 2,1, "Chân váy");
insert into  categories (CatID,CliID,CatName) value ( 3,1, "Juyt");
insert into  categories (CatID,CliID,CatName) value ( 4,1, "Quần ngắn");
insert into  categories (CatID,CliID,CatName) value ( 5,1, "Đồ lót");
insert into  categories (CatID,CliID,CatName) value ( 6,2, "Áo sơ mi");
insert into  categories (CatID,CliID,CatName) value ( 7,2, "Áo thun");
insert into  categories (CatID,CliID,CatName) value ( 8,2, "Jeans");
insert into  categories (CatID,CliID,CatName) value ( 9,2, "Áo khoác");
insert into  categories (CatID,CliID,CatName) value ( 10,2, "Short");

INSERT INTO products
(ProID, ProName, TinyDes, FullDes, Price, Quantity, ImportDate, CatID, BraID) VALUES
(1,"Alder Crossbody","Organized and Elegant","this is full describe",
290000, 100,'2018-07-01', 1, 1),
(2,"Bamfield Tote","Strong and Sweet","this is full describe",
79000, 122,'2018-04-20', 2, 2),
(3,"Dawson Backpack","Dumb and Young","this is full describe",
69000, 113,'2017-06-15', 3, 3),
(4,"Gorge Duffle","Robust and Strong","this is full describe",
139000, 172,'2017-02-22', 4, 4),
(5,"Mica Tote","Sweet and Young","this is full describe",
490000, 234,'2018-06-21', 5, 5),
(6,"Novel Duffle","Picturesque and Width","this is full describe",
99000, 390,'2018-01-19', 6, 1),
(7,"Odell Messenger","Schoolly and Pure","this is full describe",
69000, 225,'2018-02-18', 7, 2),
(8,"Pop Quiz Messenger","Young and Workplace","this is full describe",
89000, 290,'2018-06-27', 8, 3),
(9,"Retreat Backpack","Schoolly and Travelly","this is full describe",
79000, 140,'2018-05-01', 9, 4),
(10,"Woven Crossbody","Pretty and Girly","this is full describe",
390000, 440,'2018-03-23', 10, 5),
(11,"Alpha Adapt Crossbody","Sporty and Containable","this is full describe",
300000, 290,'2018-03-07', 1, 1),
(12,"Basketball Backpack","Sporty and Firmly","this is full describe",
90000, 312,'2018-04-11', 2, 2),
(13,"Core Small Crossbody","Windy and Big","this is full describe",
200000, 120,'2018-06-01', 3, 3),
(14,"Gym Club Duffel","Handsome and Strong","this is full describe",
350000, 122,'2018-10-21', 4, 4),
(15,"Gym Tote","Comfy and Practical","this is full describe",
350000, 333,'2018-09-01', 5, 5),
(16,"Hoops Elite Duffel","Blue and Strong","this is full describe",
80000, 123,'2018-07-02', 6, 1),
(17,"Paul Smith Messenger","Schoolly and Menly","this is full describe",
597000, 222,'2018-11-02', 7, 2),
(18,"Responder Backpack","Wildy and Naturally","this is full describe",
180000, 300,'2018-08-06', 8, 3),
(19,"Sportswear Tote","Delicately and Girly","this is full describe",
85000, 429,'2018-06-03', 9, 4),
(20,"Watanabe Man Messenger","Menly and Firmly","this is full describe",
132000, 469,'2017-05-01', 10, 5);