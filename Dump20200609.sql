-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: skooldb
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution` (
  `uuid` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `phone` varchar(45) NOT NULL,
  `personUUID` varchar(45) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `nostudents` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_user1_idx` (`personUUID`),
  CONSTRAINT `fk_user1` FOREIGN KEY (`personUUID`) REFERENCES `user` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution`
--

LOCK TABLES `institution` WRITE;
/*!40000 ALTER TABLE `institution` DISABLE KEYS */;
INSERT INTO `institution` VALUES ('511a57e8-ae7d-499f-b4c5-5de1902485cd','School3','Address3',NULL,'234451',NULL,'school3@sch.com','65','2020-06-09 15:46:37',NULL),('67aa8f9b-1c34-461b-afea-44950b76e425','School1','Address1',NULL,'12345',NULL,'school1@sch.com','100','2020-06-09 15:13:33',NULL),('b43b6313-52d4-4519-85f2-1d42595fcb04','School2','Address2',NULL,'123456',NULL,'school2@sch.com','232','2020-06-09 15:42:30',NULL);
/*!40000 ALTER TABLE `institution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `uuid` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` varchar(45) DEFAULT NULL,
  `updatedAt` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('ca88bad2-1e7f-4c8f-b57a-7afaa3a9a186','User',NULL,NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uuid` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `roleUUID` varchar(45) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_role1_idx` (`roleUUID`),
  CONSTRAINT `fk_role1` FOREIGN KEY (`roleUUID`) REFERENCES `role` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2207be00-3cd4-4026-a597-301a483bc89b','demo3@user.com','$2a$12$vQfoRcNxzBX1otQF3jovXOB/yb1T8JxMQgwDkRWlVD.8R7bnYpCzC','Demo','User3','demo3@user.com',NULL,NULL,NULL,'2020-06-09 15:10:16',NULL,1),('41f0781c-c685-4d4b-948b-b7999bdb760d','demo@user8.com','$2a$12$LRF1Hlg12mXSjI/MO6081.SWorCGnD7B1y2kpQutTJBkxjzZlf5sS','Demo','User8','demo@user8.com',NULL,NULL,NULL,'2020-06-09 15:41:26',NULL,1),('4431a872-5d83-4d03-8460-94cf88b0633c','demo@user7.com','$2a$12$r1L9G1oSnK/lnXeKPzmohObD.8HO/XlTK.EqvVszAJcREZX/PpnKK','demo','user7','demo@user7.com',NULL,NULL,NULL,'2020-06-09 15:33:48',NULL,1),('5d65c752-5958-42d5-b77b-d958611c6f75','demo@user6.com','$2a$12$GA7vZ.2PHp8kvNUav3SwWejIlvBcSyMFy5vWxIbOLZRM73FbYkUw6','demo','user6','demo@user6.com',NULL,NULL,NULL,'2020-06-09 15:26:32',NULL,1),('612f2de3-c04b-4205-b0cf-ef6ee79d509b','demo6@user.com','$2a$12$yLbz5ZMEyNT4GhodH.ndDede1YHpTUYzyqkIn3562/0BTGXwn69Oa','Demo','User6','demo6@user.com',NULL,NULL,NULL,'2020-06-09 15:17:26',NULL,1),('68affc59-e227-44f4-b2a2-64fe8f0c5788','demo4@user.com','$2a$12$MWkKZ0zb2roNT3Oijd57cOtkUegM1VfXzLJcxgPqTGBy/Z9O5rT4u','Demo','User4','demo4@user.com',NULL,NULL,NULL,'2020-06-09 15:11:24',NULL,1),('adda5430-23f6-45ab-848a-7dea1f490d8a','demo5@user.com','$2a$12$BryrOiOSNHJHFB6UDnlTL.YuAqXBluxtGZBK9Tt28XQDy9BjtVSnG','Demo','User5','demo5@user.com',NULL,NULL,NULL,'2020-06-09 15:15:42',NULL,1),('efb9d6e0-7117-4238-95e6-1f1452671bb4','demo1@user.com','$2a$12$ZRfoT2yRc2bB7Az8sS/0cOJmuUa.F/.JctzDfYbOlG25GgW5x4KB6','Demo','User 2','demo1@user.com',NULL,NULL,NULL,'2020-06-09 14:59:49',NULL,1),('f30d9b90-7143-4866-94c3-860e67a28635','demo@user.com','$2a$12$bg3LvhqOmMf1fLFX394Rke1lECB1azaJrLLdZ./H8R8q4XzZWG3KG','Demo','User 1','demo@user.com',NULL,NULL,NULL,'2020-06-09 14:55:46',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-09 22:00:25
