-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'medical'),(2,'education'),(3,'social impact'),(4,'arts & culture'),(5,'animal welfare');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CAPTION` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `TARGET_FUNDING` int DEFAULT NULL,
  `CURRENT_FUNDING` int DEFAULT NULL,
  `CITY` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CATEGORY_ID` int DEFAULT NULL,
  `ACTIVE` tinyint DEFAULT '1',
  PRIMARY KEY (`FUNDRAISER_ID`),
  KEY `funraiser_category_fcfk_idx` (`CATEGORY_ID`),
  CONSTRAINT `funraiser_category_fcfk` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

-- ----------------------------
-- Table structure for donation
-- ----------------------------
DROP TABLE IF EXISTS `donation`;
CREATE TABLE `donation`  (
  `DONATION_ID` int NOT NULL AUTO_INCREMENT,
  `DATE` datetime NULL DEFAULT NULL,
  `AMOUNT` decimal(10, 2) NULL DEFAULT NULL,
  `GIVER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `FUNDRAISER_ID` int NULL DEFAULT NULL,
  PRIMARY KEY (`DONATION_ID`) USING BTREE,
  INDEX `donation_fundraiser_fk`(`FUNDRAISER_ID` ASC) USING BTREE,
  CONSTRAINT `donation_fundraiser_fk` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (1, '2024-09-21 14:45:10', 500.00, 'Sarah Walker', 1);
INSERT INTO `donation` VALUES (2, '2024-09-22 11:25:34', 1000.00, 'Ethan Scott', 2);
INSERT INTO `donation` VALUES (3, '2024-09-23 09:50:50', 250.00, 'Sophia Lewis', 3);
INSERT INTO `donation` VALUES (4, '2024-09-24 15:40:12', 750.00, 'Daniel Harris', 4);
INSERT INTO `donation` VALUES (5, '2024-09-25 10:10:05', 1200.00, 'Grace White', 5);
INSERT INTO `donation` VALUES (6, '2024-09-26 12:30:25', 300.00, 'Jacob Hall', 6);
INSERT INTO `donation` VALUES (7, '2024-09-27 13:55:47', 400.00, 'Mia Green', 7);
INSERT INTO `donation` VALUES (8, '2024-09-28 17:35:56', 600.00, 'Aiden Young', 2);
INSERT INTO `donation` VALUES (9, '2024-09-29 08:05:14', 900.00, 'Lily King', 1);
INSERT INTO `donation` VALUES (10, '2024-09-30 16:22:48', 850.00, 'Lucas Adams', 3);

-- Dump completed on 2024-10-02  0:38:28
