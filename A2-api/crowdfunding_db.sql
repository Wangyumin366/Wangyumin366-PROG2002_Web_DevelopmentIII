/*
 Navicat Premium Data Transfer

 Source Server         : mysql-local
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : crowdfunding_db

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 14/10/2024 01:37:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`CATEGORY_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'medical');
INSERT INTO `category` VALUES (2, 'education');
INSERT INTO `category` VALUES (3, 'social impact');
INSERT INTO `category` VALUES (4, 'arts & culture');
INSERT INTO `category` VALUES (5, 'animal welfare');

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------
DROP TABLE IF EXISTS `fundraiser`;
CREATE TABLE `fundraiser`  (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `CAPTION` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `TARGET_FUNDING` int NULL DEFAULT NULL,
  `CURRENT_FUNDING` int NULL DEFAULT NULL,
  `CITY` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `CATEGORY_ID` int NULL DEFAULT NULL,
  `ACTIVE` tinyint NULL DEFAULT 1,
  PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  INDEX `funraiser_category_fcfk_idx`(`CATEGORY_ID` ASC) USING BTREE,
  CONSTRAINT `funraiser_category_fcfk` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Martha Stewart', 'Cancer Treatment for a Local Resident', 25000, 19000, 'Philadelphia', 2, 1);
INSERT INTO `fundraiser` VALUES (2, 'EcoFuture', 'Plastic-Free Oceans Initiative', 50000, 22000, 'San Diego', 3, 1);
INSERT INTO `fundraiser` VALUES (3, 'Creative Minds', 'Public Art Installation', 15000, 8000, 'Portland', 4, 1);
INSERT INTO `fundraiser` VALUES (4, 'Save the Paws', 'Spay and Neuter Campaign', 12000, 5000, 'Denver', 5, 1);
INSERT INTO `fundraiser` VALUES (5, 'Bright Horizons', 'STEM Workshops for Girls', 8000, 3000, 'San Jose', 1, 1);
INSERT INTO `fundraiser` VALUES (6, 'Healing Hands', 'Support for Rare Disease Research', 30000, 15000, 'Orlando', 2, 1);
INSERT INTO `fundraiser` VALUES (7, 'Green Earth', 'Reforestation in National Parks', 40000, 18000, 'Phoenix', 3, 1);
INSERT INTO `fundraiser` VALUES (8, 'Healthy Futures', 'Mental Health Support for Youth', 18000, 9000, 'Seattle', 4, 1);
INSERT INTO `fundraiser` VALUES (9, 'Wildlife Rescue', 'Save Endangered Species', 22000, 11000, 'Austin', 5, 1);
INSERT INTO `fundraiser` VALUES (10, 'Hope for All', 'Disaster Relief Fund', 35000, 25000, 'Miami', 1, 1);
INSERT INTO `fundraiser` VALUES (11, 'Bright Minds', 'Education for Underprivileged Children', 27000, 12000, 'Chicago', 2, 1);
INSERT INTO `fundraiser` VALUES (12, 'Clean Water Initiative', 'Water Purification in Rural Areas', 40000, 20000, 'Houston', 3, 1);

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
INSERT INTO `donation` VALUES (11, '2024-10-14 00:45:33', 5.00, 'hhh', 4);

SET FOREIGN_KEY_CHECKS = 1;
