CREATE DATABASE  IF NOT EXISTS `erpv2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `erpv2`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: erpv2
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `affectations_achat`
--

DROP TABLE IF EXISTS `affectations_achat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affectations_achat` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `facture_fournisseur_uid` int unsigned NOT NULL,
  `commande_uid` int unsigned NOT NULL,
  `montant` double(14,2) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_affectations_achat_facture_fournisseur_uid_idx` (`facture_fournisseur_uid`),
  KEY `fk_affectations_achat_facture_commande_uid_idx` (`commande_uid`),
  CONSTRAINT `fk_affectations_achat_facture_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  CONSTRAINT `fk_affectations_achat_facture_fournisseur_uid` FOREIGN KEY (`facture_fournisseur_uid`) REFERENCES `factures_fournisseur` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affectations_achat`
--

LOCK TABLES `affectations_achat` WRITE;
/*!40000 ALTER TABLE `affectations_achat` DISABLE KEYS */;
/*!40000 ALTER TABLE `affectations_achat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arretes_banque`
--

DROP TABLE IF EXISTS `arretes_banque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arretes_banque` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `banque_uid` int unsigned NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_arretes_banque_banque_uid_idx` (`banque_uid`),
  KEY `fk_arretes_banque_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_arretes_banque_banque_uid` FOREIGN KEY (`banque_uid`) REFERENCES `mes_banques` (`uid`),
  CONSTRAINT `fk_arretes_banque_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arretes_banque`
--

LOCK TABLES `arretes_banque` WRITE;
/*!40000 ALTER TABLE `arretes_banque` DISABLE KEYS */;
/*!40000 ALTER TABLE `arretes_banque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arretes_caisse`
--

DROP TABLE IF EXISTS `arretes_caisse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arretes_caisse` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `caisse_uid` int unsigned NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_arretes_caisse_caisse_uid_idx` (`caisse_uid`),
  KEY `fk_arretes_caisse_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_arretes_caisse_caisse_uid` FOREIGN KEY (`caisse_uid`) REFERENCES `caisses` (`uid`),
  CONSTRAINT `fk_arretes_caisse_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arretes_caisse`
--

LOCK TABLES `arretes_caisse` WRITE;
/*!40000 ALTER TABLE `arretes_caisse` DISABLE KEYS */;
/*!40000 ALTER TABLE `arretes_caisse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arretes_mobile_money`
--

DROP TABLE IF EXISTS `arretes_mobile_money`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arretes_mobile_money` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `operateur_uid` int unsigned NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_arretes_mobile_money_operateur_uid_idx` (`operateur_uid`),
  KEY `fk_arretes_mobile_money_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_arretes_mobile_money_operateur_uid` FOREIGN KEY (`operateur_uid`) REFERENCES `operateurs` (`uid`),
  CONSTRAINT `fk_arretes_mobile_money_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arretes_mobile_money`
--

LOCK TABLES `arretes_mobile_money` WRITE;
/*!40000 ALTER TABLE `arretes_mobile_money` DISABLE KEYS */;
/*!40000 ALTER TABLE `arretes_mobile_money` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arretes_stock`
--

DROP TABLE IF EXISTS `arretes_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arretes_stock` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `item_uid` int unsigned NOT NULL,
  `magasin_uid` int unsigned NOT NULL,
  `quantity` double(14,2) NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_arretes_stock_item_uid_idx` (`item_uid`),
  KEY `fk_arrete_stock_magasin_uid_idx` (`magasin_uid`),
  KEY `fk_arretes_stock_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_arrete_stock_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_arretes_stock_item_uid` FOREIGN KEY (`item_uid`) REFERENCES `items` (`uid`),
  CONSTRAINT `fk_arretes_stock_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arretes_stock`
--

LOCK TABLES `arretes_stock` WRITE;
/*!40000 ALTER TABLE `arretes_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `arretes_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arretes_wallet_electronic`
--

DROP TABLE IF EXISTS `arretes_wallet_electronic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arretes_wallet_electronic` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `wallet_electronic_uid` int unsigned NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_arretes_wallet_electronic_wallet_electronic_uid_idx` (`wallet_electronic_uid`),
  KEY `fk_arretes_wallet_electronic_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_arretes_wallet_electronic_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `fk_arretes_wallet_electronic_wallet_electronic_uid` FOREIGN KEY (`wallet_electronic_uid`) REFERENCES `wallets_electonic` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arretes_wallet_electronic`
--

LOCK TABLES `arretes_wallet_electronic` WRITE;
/*!40000 ALTER TABLE `arretes_wallet_electronic` DISABLE KEYS */;
/*!40000 ALTER TABLE `arretes_wallet_electronic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avoir_client`
--

DROP TABLE IF EXISTS `avoir_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avoir_client` (
  `num_avoir` int(4) unsigned zerofill NOT NULL,
  `outside_uid` int unsigned NOT NULL,
  `client_uid` int unsigned NOT NULL,
  `facture_client_uid` int unsigned NOT NULL,
  `event` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '0 null\n1 credit\n2 remb',
  `state` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '0 to credit\n1 credited',
  PRIMARY KEY (`num_avoir`),
  KEY `fk_avoir_client_client_uid_idx` (`client_uid`),
  KEY `fk_avoir_client_outside_uid_idx` (`outside_uid`),
  KEY `fk_avoir_client_facture_client_uid_idx` (`facture_client_uid`),
  CONSTRAINT `fk_avoir_client_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  CONSTRAINT `fk_avoir_client_facture_client_uid` FOREIGN KEY (`facture_client_uid`) REFERENCES `factures_client` (`num_facture`),
  CONSTRAINT `fk_avoir_client_outside_uid` FOREIGN KEY (`outside_uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avoir_client`
--

LOCK TABLES `avoir_client` WRITE;
/*!40000 ALTER TABLE `avoir_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `avoir_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banques`
--

DROP TABLE IF EXISTS `banques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banques` (
  `uid` int unsigned NOT NULL,
  `rib` varchar(45) NOT NULL,
  `agence` varchar(45) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `devise_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_banques_devise_uid_idx` (`devise_uid`),
  CONSTRAINT `fk_banques_devise_uid` FOREIGN KEY (`devise_uid`) REFERENCES `devises` (`uid`),
  CONSTRAINT `fk_banques_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banques`
--

LOCK TABLES `banques` WRITE;
/*!40000 ALTER TABLE `banques` DISABLE KEYS */;
/*!40000 ALTER TABLE `banques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bons_entree`
--

DROP TABLE IF EXISTS `bons_entree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bons_entree` (
  `uid` int unsigned NOT NULL,
  `sender_uid` int unsigned NOT NULL,
  `magasin_uid` int unsigned NOT NULL,
  `note` tinytext,
  PRIMARY KEY (`uid`),
  KEY `fk_bons_entree_tier_uid_idx` (`sender_uid`),
  KEY `fk_bons_entree_magasin_uid_idx` (`magasin_uid`),
  CONSTRAINT `fk_bons_entree_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_bons_entree_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`),
  CONSTRAINT `fk_bons_entree_tier_uid` FOREIGN KEY (`sender_uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bons_entree`
--

LOCK TABLES `bons_entree` WRITE;
/*!40000 ALTER TABLE `bons_entree` DISABLE KEYS */;
/*!40000 ALTER TABLE `bons_entree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bons_sortie`
--

DROP TABLE IF EXISTS `bons_sortie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bons_sortie` (
  `uid` int unsigned NOT NULL,
  `receiver_uid` int unsigned NOT NULL,
  `magasin_uid` int unsigned NOT NULL,
  `note` tinytext,
  PRIMARY KEY (`uid`),
  KEY `fk_bons_sortie_tier_uid_idx` (`receiver_uid`),
  KEY `fk_bons_sortie_magasin_uid_idx` (`magasin_uid`),
  CONSTRAINT `fk_bons_sortie_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_bons_sortie_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`),
  CONSTRAINT `fk_bons_sortie_tier_uid` FOREIGN KEY (`receiver_uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bons_sortie`
--

LOCK TABLES `bons_sortie` WRITE;
/*!40000 ALTER TABLE `bons_sortie` DISABLE KEYS */;
/*!40000 ALTER TABLE `bons_sortie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caisses`
--

DROP TABLE IF EXISTS `caisses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caisses` (
  `uid` int unsigned NOT NULL,
  `name` varchar(35) NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `idcaisses_UNIQUE` (`uid`),
  CONSTRAINT `fk_caisses_treso_uid` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caisses`
--

LOCK TABLES `caisses` WRITE;
/*!40000 ALTER TABLE `caisses` DISABLE KEYS */;
/*!40000 ALTER TABLE `caisses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `uid` int unsigned NOT NULL,
  `type_vente` tinyint unsigned NOT NULL,
  `encours` double(14,2) unsigned NOT NULL DEFAULT '0.00',
  `nb_jour` int unsigned NOT NULL DEFAULT '0',
  `evaluation` tinyint unsigned NOT NULL DEFAULT '0',
  `declarable` tinyint unsigned NOT NULL DEFAULT '1',
  `commissionable` tinyint unsigned NOT NULL DEFAULT '1',
  `active_client` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_clients_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (5,0,0.00,0,2,0,0,1),(6,1,55000000.00,0,2,1,0,1),(7,0,0.00,0,2,1,0,1),(11,1,5000000.00,1,2,1,1,1),(12,1,0.00,0,2,1,0,0),(13,1,1500000.00,0,2,1,0,1),(14,1,0.00,0,2,1,0,1),(15,0,0.00,0,2,1,0,1),(16,0,0.00,0,2,1,0,1),(17,1,1200000.00,0,2,1,0,1),(18,1,130000.00,0,2,1,0,1),(19,1,100000.00,0,2,1,0,1),(20,1,0.00,0,2,1,0,1),(21,1,0.00,0,2,1,0,1),(22,1,0.00,0,2,1,0,1),(23,1,0.00,0,2,1,0,1),(24,1,0.00,0,2,1,0,1),(25,1,0.00,0,2,1,0,1),(26,0,500000.00,0,2,1,0,1),(27,1,1500000.00,1,2,0,0,1),(28,0,0.00,0,2,1,1,1),(29,1,1.00,1,2,1,1,1),(30,0,0.00,0,2,1,1,1),(31,1,0.00,0,2,1,0,1),(32,1,0.00,0,2,1,0,1),(33,0,0.00,0,2,1,0,0),(34,0,0.00,0,2,1,0,0),(35,1,0.00,0,2,1,0,0),(36,1,1.00,1,2,1,0,0),(37,1,0.00,0,2,1,0,1),(38,1,0.00,0,2,1,0,1),(39,1,0.00,0,2,1,0,0),(40,0,0.00,0,2,1,0,1),(41,0,1.00,1,2,1,0,1),(42,1,1.00,1,2,1,0,0),(43,1,1.00,1,2,1,0,1),(44,0,0.00,0,2,1,0,1),(45,1,1.00,1,2,1,0,1),(46,1,1.00,1,2,1,0,1),(47,1,1.00,1,2,1,0,1),(48,0,0.00,0,2,1,0,1),(49,0,0.00,0,2,1,0,1),(50,0,0.00,0,2,1,0,1),(51,0,0.00,0,2,1,0,1),(52,0,0.00,0,2,1,0,1),(53,1,0.00,0,2,1,0,1),(54,0,0.00,0,2,1,0,1),(55,0,10000000.00,0,2,1,0,1),(56,0,0.00,0,2,1,0,1),(57,0,0.00,0,2,1,0,1),(58,0,0.00,0,2,1,0,1);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commandes`
--

DROP TABLE IF EXISTS `commandes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commandes` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `client_uid` int unsigned NOT NULL,
  `date` date NOT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `state` tinyint unsigned NOT NULL DEFAULT '1',
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `devis_uid` int unsigned DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_commandes_user_uid_idx` (`user_uid`),
  KEY `fk_commandes_devis_uid_idx` (`devis_uid`),
  CONSTRAINT `fk_commandes_devis_uid` FOREIGN KEY (`devis_uid`) REFERENCES `devis` (`uid`),
  CONSTRAINT `fk_commandes_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commandes`
--

LOCK TABLES `commandes` WRITE;
/*!40000 ALTER TABLE `commandes` DISABLE KEYS */;
/*!40000 ALTER TABLE `commandes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commandes_détails`
--

DROP TABLE IF EXISTS `commandes_détails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commandes_détails` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `commande_uid` int unsigned NOT NULL,
  `item_uid` int unsigned NOT NULL,
  `description_item` tinytext,
  `quantity` double(14,2) unsigned NOT NULL,
  `prix_unitaire` double(14,2) unsigned NOT NULL,
  `prix_total` double(14,2) unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_commandes_details_commande_uid_idx` (`commande_uid`),
  KEY `fk_commandes_details_item_uid_idx` (`item_uid`),
  CONSTRAINT `fk_commandes_details_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  CONSTRAINT `fk_commandes_details_item_uid` FOREIGN KEY (`item_uid`) REFERENCES `items` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commandes_détails`
--

LOCK TABLES `commandes_détails` WRITE;
/*!40000 ALTER TABLE `commandes_détails` DISABLE KEYS */;
/*!40000 ALTER TABLE `commandes_détails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `uid` int unsigned NOT NULL,
  `nom_commercial` varchar(45) NOT NULL,
  `raison_sociale` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_companies_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (11,'timi gsm','timi gsm sarl'),(13,'directimmo','directimmo sarl'),(14,'orange','orange madagascar'),(17,'AB','ab production'),(18,'','marvel'),(19,'','DC comics'),(20,'','qmm'),(21,'','sherit'),(22,'','pastry'),(23,'qsfd','dsfqqs'),(24,'gdfsq','sdfg'),(25,'fdh','xcb'),(26,'the company','the company'),(28,'IRS','entrepirse IRS'),(29,'tech tablet','tech tablet'),(30,'xyz','xyzsarlu'),(31,'trase','trase'),(32,'gege','gege'),(35,'disney','disney company'),(36,'espn','espn ltd'),(37,'netflix','netflix unlimited'),(38,'gdfsq 2','sdfg 2'),(39,'tartine et chocolat','compagnie des pains'),(40,'antares','antares sarl'),(43,'photoland','save'),(44,'IRMI','IRMI'),(45,'cgr','cgr'),(47,'facebook and cie','meta'),(48,'tiko','aaa'),(49,'biko','bbb'),(50,'ciko','ccc'),(53,'trix','trix sci'),(54,'drax','drax  ltd'),(55,'activision blizzard','activisition en vrai'),(56,'f4','ffff sarl'),(57,'tre','tre'),(58,'zte','zte'),(59,'abc','abc sa'),(60,'yyy','yyy'),(61,'borderland','borderland sa'),(62,'ideal','ideal sarl'),(63,'bad boys','bad boys company'),(64,'test','testtest'),(65,'tr','tre'),(66,'qsd','sdf'),(67,'oooo','oooo'),(68,'ty','tyty'),(69,'yuyu','yuyu'),(73,'harasaka','arasaka ltd');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credits`
--

DROP TABLE IF EXISTS `credits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credits` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_credits_tresos` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='0 credit_client\n0 credit_fournisseur';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credits`
--

LOCK TABLES `credits` WRITE;
/*!40000 ALTER TABLE `credits` DISABLE KEYS */;
/*!40000 ALTER TABLE `credits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devis`
--

DROP TABLE IF EXISTS `devis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devis` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `client_uid` int unsigned NOT NULL,
  `date` date NOT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `state` tinyint unsigned NOT NULL DEFAULT '0',
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `fk_devis_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_devis_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devis`
--

LOCK TABLES `devis` WRITE;
/*!40000 ALTER TABLE `devis` DISABLE KEYS */;
/*!40000 ALTER TABLE `devis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devis_détails`
--

DROP TABLE IF EXISTS `devis_détails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devis_détails` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `devis_uid` int unsigned NOT NULL,
  `item_uid` int unsigned NOT NULL,
  `description_item` tinytext,
  `quantity` double(14,2) unsigned NOT NULL,
  `prix_unitaire` double(14,2) unsigned NOT NULL,
  `prix_total` double(14,2) unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_devis_details_commande_uid_idx` (`devis_uid`),
  KEY `fk_devis_details_item_uid_idx` (`item_uid`),
  CONSTRAINT `fk_devis_details_commande_uid` FOREIGN KEY (`devis_uid`) REFERENCES `devis` (`uid`),
  CONSTRAINT `fk_devis_details_item_uid` FOREIGN KEY (`item_uid`) REFERENCES `items` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devis_détails`
--

LOCK TABLES `devis_détails` WRITE;
/*!40000 ALTER TABLE `devis_détails` DISABLE KEYS */;
/*!40000 ALTER TABLE `devis_détails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devises`
--

DROP TABLE IF EXISTS `devises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devises` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `sigle` varchar(10) NOT NULL,
  `iso` varchar(3) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `iso_UNIQUE` (`iso`),
  UNIQUE KEY `sigle_UNIQUE` (`sigle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devises`
--

LOCK TABLES `devises` WRITE;
/*!40000 ALTER TABLE `devises` DISABLE KEYS */;
/*!40000 ALTER TABLE `devises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `uid` int unsigned NOT NULL,
  `matricule` int(4) unsigned zerofill NOT NULL,
  `debut` date NOT NULL,
  `poste` varchar(45) NOT NULL,
  `categorie` varchar(45) NOT NULL,
  `principal_magasin_uid` int unsigned NOT NULL,
  `sal_base` double(14,2) unsigned NOT NULL,
  `sal_variable` tinyint unsigned NOT NULL DEFAULT '0',
  `smie_uid` int unsigned NOT NULL,
  `matrimonial` tinyint unsigned NOT NULL DEFAULT '0',
  `nb_enfants` tinyint unsigned NOT NULL DEFAULT '0',
  `fin` date DEFAULT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `matricule_UNIQUE` (`matricule`),
  KEY `fk_employees_magasin_uid_idx` (`principal_magasin_uid`),
  CONSTRAINT `fk_employees_magasin_uid` FOREIGN KEY (`principal_magasin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_employees_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees_avantages`
--

DROP TABLE IF EXISTS `employees_avantages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees_avantages` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_uid` int unsigned NOT NULL,
  `avantage_type` int unsigned NOT NULL,
  `montant` double(14,2) unsigned NOT NULL DEFAULT '0.00',
  `debut` date NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  KEY `fk_employees_avantages_employees_uid_idx` (`employee_uid`),
  KEY `fk_employees_avantages_types_uid_idx` (`avantage_type`),
  CONSTRAINT `fk_employees_avantages_employees_uid` FOREIGN KEY (`employee_uid`) REFERENCES `employees` (`uid`),
  CONSTRAINT `fk_employees_avantages_types_uid` FOREIGN KEY (`avantage_type`) REFERENCES `types_avantage` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees_avantages`
--

LOCK TABLES `employees_avantages` WRITE;
/*!40000 ALTER TABLE `employees_avantages` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees_avantages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entries`
--

DROP TABLE IF EXISTS `entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entries` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint unsigned NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `fk_entries_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_entries_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entries`
--

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factures_client`
--

DROP TABLE IF EXISTS `factures_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factures_client` (
  `num_facture` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `uid` int unsigned NOT NULL,
  `client_uid` int unsigned NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `commande_uid` int unsigned NOT NULL,
  `commercial_uid` int unsigned NOT NULL,
  PRIMARY KEY (`num_facture`),
  KEY `fk_factures_client_outside_uid_idx` (`uid`),
  KEY `fk_factures_client_client_uid_idx` (`client_uid`),
  KEY `fk_factures_client_commande_uid_idx` (`commande_uid`),
  KEY `fk_factures_client_commercial_uid_idx` (`commercial_uid`),
  CONSTRAINT `fk_factures_client_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  CONSTRAINT `fk_factures_client_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  CONSTRAINT `fk_factures_client_commercial_uid` FOREIGN KEY (`commercial_uid`) REFERENCES `employees` (`uid`),
  CONSTRAINT `fk_factures_client_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures_client`
--

LOCK TABLES `factures_client` WRITE;
/*!40000 ALTER TABLE `factures_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `factures_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factures_fournisseur`
--

DROP TABLE IF EXISTS `factures_fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factures_fournisseur` (
  `uid` int unsigned NOT NULL,
  `fournisseur_uid` int unsigned NOT NULL,
  `num_facture` varchar(45) NOT NULL,
  `commande_uid` int unsigned NOT NULL,
  `ND` tinyint unsigned NOT NULL DEFAULT '1',
  `magasin_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_factures_fournisseur_fournisseur_uid_idx` (`fournisseur_uid`),
  KEY `fk_factures_fournisseur_commande_uid_idx` (`commande_uid`),
  KEY `fk_factures_fournisseur_magasin_uid_idx` (`magasin_uid`),
  CONSTRAINT `fk_factures_fournisseur_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  CONSTRAINT `fk_factures_fournisseur_fournisseur_uid` FOREIGN KEY (`fournisseur_uid`) REFERENCES `fournisseurs` (`uid`),
  CONSTRAINT `fk_factures_fournisseur_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_factures_fournisseur_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factures_fournisseur`
--

LOCK TABLES `factures_fournisseur` WRITE;
/*!40000 ALTER TABLE `factures_fournisseur` DISABLE KEYS */;
/*!40000 ALTER TABLE `factures_fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familles`
--

DROP TABLE IF EXISTS `familles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familles` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familles`
--

LOCK TABLES `familles` WRITE;
/*!40000 ALTER TABLE `familles` DISABLE KEYS */;
/*!40000 ALTER TABLE `familles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fiche_de_paie`
--

DROP TABLE IF EXISTS `fiche_de_paie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fiche_de_paie` (
  `uid` int unsigned NOT NULL,
  `year` int unsigned NOT NULL,
  `month` tinyint unsigned NOT NULL,
  `employee_uid` int unsigned NOT NULL,
  `sal_base` double(14,2) unsigned NOT NULL,
  `temps` tinyint unsigned NOT NULL,
  `sal_base_prorata` double(14,2) unsigned NOT NULL,
  `prime` double(14,2) unsigned DEFAULT NULL,
  `avantages` double(14,2) unsigned DEFAULT NULL,
  `sal_brute` double(14,2) unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_fiche_de_paie_employee_uid_idx` (`employee_uid`),
  CONSTRAINT `fk_fiche_de_paie_employee_uid` FOREIGN KEY (`employee_uid`) REFERENCES `employees` (`uid`),
  CONSTRAINT `fk_fiche_de_paie_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fiche_de_paie`
--

LOCK TABLES `fiche_de_paie` WRITE;
/*!40000 ALTER TABLE `fiche_de_paie` DISABLE KEYS */;
/*!40000 ALTER TABLE `fiche_de_paie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fournisseurs`
--

DROP TABLE IF EXISTS `fournisseurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fournisseurs` (
  `uid` int unsigned NOT NULL,
  `encours` double(14,2) NOT NULL DEFAULT '0.00',
  `evaluation` tinyint unsigned NOT NULL DEFAULT '0',
  `nb_jour` int unsigned NOT NULL DEFAULT '0',
  `declarable` tinyint unsigned NOT NULL DEFAULT '1',
  `active_fournisseur` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_fournisseurs_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fournisseurs`
--

LOCK TABLES `fournisseurs` WRITE;
/*!40000 ALTER TABLE `fournisseurs` DISABLE KEYS */;
INSERT INTO `fournisseurs` VALUES (59,0.00,2,0,1,0),(60,0.00,2,0,1,1),(61,0.00,2,0,1,1),(62,0.00,2,0,1,1),(63,0.00,2,0,1,1),(64,0.00,2,0,1,1),(65,0.00,2,0,1,1),(66,0.00,2,0,1,1),(67,0.00,2,0,1,1),(68,0.00,2,0,1,1),(69,0.00,2,0,1,1),(70,0.00,2,0,1,1),(71,0.00,2,0,1,1),(72,0.00,2,0,1,1),(73,0.00,2,0,1,1);
/*!40000 ALTER TABLE `fournisseurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `humans`
--

DROP TABLE IF EXISTS `humans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `humans` (
  `uid` int unsigned NOT NULL,
  `noms` varchar(60) NOT NULL,
  `prenoms` varchar(60) NOT NULL,
  `cin` varchar(12) DEFAULT NULL,
  `cin_date` date DEFAULT NULL,
  `cin_lieu` varchar(45) DEFAULT NULL,
  `naissance_date` date NOT NULL,
  `naissance_lieu` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_humans_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `humans`
--

LOCK TABLES `humans` WRITE;
/*!40000 ALTER TABLE `humans` DISABLE KEYS */;
INSERT INTO `humans` VALUES (1,'test deux','jean','0123456789','2022-11-01','','2000-01-20',''),(2,'testeur','user1','101','2022-06-15','tnr','2000-05-26','madagascar'),(5,'rabemanantsoa','jean','0123456789','2022-11-01','','2000-01-20',''),(6,'elon','musk','5594','2022-11-01','sudaf','2022-11-01','sudaf'),(7,'ratata','bete','165','2022-11-01','bourg palette','2022-11-01','qsfd bourg'),(12,'raj','mickael','','2022-11-01','','2022-11-03',''),(15,'IARI','Maeva','','2022-11-02','','2022-09-06',''),(16,'IARI','Maeva','','2022-09-06','','2022-08-11',''),(27,'razaf','williamson','109','2022-09-02','fd','2022-03-16','fd'),(33,'leje','hernandez','0598','2022-09-01','','2022-08-04',''),(34,'captain','marvel','9954','1987-06-19','unk','1920-12-05','galacir'),(41,'rakotoson','sophie','101','2000-12-09','tnr 5','1991-02-08','tana'),(42,'bourdon','pierre','1015500','2022-08-01','','2022-11-17',''),(46,'aintsoa','mathéo','','2022-05-31','','2021-01-05',''),(51,'tsiyao','valerie','','2012-12-12','','1999-02-05',''),(52,'anonyme','sheshounet','','2018-02-06','','2000-05-01',''),(70,'KOYTCHA','Radj','','1999-02-06','','1981-02-02',''),(71,'KOYTCHA','Radjdfg','','1999-02-06','','1981-02-02',''),(72,'rembalaya',' ishin','12130','2022-03-30','','2009-01-05','');
/*!40000 ALTER TABLE `humans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identifiables`
--

DROP TABLE IF EXISTS `identifiables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `identifiables` (
  `num_serie` varchar(45) NOT NULL,
  `item_uid` int unsigned NOT NULL,
  `in_outside_uid` int unsigned NOT NULL,
  `out_outside_uid` int unsigned DEFAULT NULL,
  `in_stock` tinyint unsigned NOT NULL DEFAULT '1',
  `magasin_uid` int unsigned NOT NULL,
  PRIMARY KEY (`num_serie`,`item_uid`,`in_outside_uid`),
  KEY `fk_identifiables_item_uid_idx` (`item_uid`),
  KEY `fk_identifiables_in_outside_uid_idx` (`in_outside_uid`),
  KEY `fk_identifiables_out_outside_uid_idx` (`out_outside_uid`),
  KEY `fk_identifiables_magasin_uid_idx` (`magasin_uid`),
  CONSTRAINT `fk_identifiables_in_outside_uid` FOREIGN KEY (`in_outside_uid`) REFERENCES `outsides` (`uid`),
  CONSTRAINT `fk_identifiables_item_uid` FOREIGN KEY (`item_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_identifiables_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_identifiables_out_outside_uid` FOREIGN KEY (`out_outside_uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identifiables`
--

LOCK TABLES `identifiables` WRITE;
/*!40000 ALTER TABLE `identifiables` DISABLE KEYS */;
/*!40000 ALTER TABLE `identifiables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inside_details`
--

DROP TABLE IF EXISTS `inside_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inside_details` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `outside_uid` int unsigned NOT NULL,
  `inside_uid` int unsigned NOT NULL,
  `montant` double(14,2) NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_outsides_uid_idx` (`outside_uid`),
  KEY `fk_inside_uid_idx` (`inside_uid`),
  CONSTRAINT `fk_inside_uid` FOREIGN KEY (`inside_uid`) REFERENCES `insides` (`uid`),
  CONSTRAINT `fk_outside_uid` FOREIGN KEY (`outside_uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inside_details`
--

LOCK TABLES `inside_details` WRITE;
/*!40000 ALTER TABLE `inside_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `inside_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insides`
--

DROP TABLE IF EXISTS `insides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insides` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `ref_intern` varchar(45) DEFAULT NULL,
  `ref_extern` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `montant` double(14,2) NOT NULL,
  `locked` tinyint unsigned NOT NULL DEFAULT '0',
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `fk_insides_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_insides_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insides`
--

LOCK TABLES `insides` WRITE;
/*!40000 ALTER TABLE `insides` DISABLE KEYS */;
/*!40000 ALTER TABLE `insides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutions`
--

DROP TABLE IF EXISTS `institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutions` (
  `uid` int unsigned NOT NULL,
  `type_uid` int unsigned NOT NULL,
  `frequence_annuelle` double(4,2) unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_institutions_type_institution_uid_idx` (`type_uid`),
  CONSTRAINT `fk_institutions_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`),
  CONSTRAINT `fk_institutions_type_institution_uid` FOREIGN KEY (`type_uid`) REFERENCES `types_institutions` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutions`
--

LOCK TABLES `institutions` WRITE;
/*!40000 ALTER TABLE `institutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type_item` tinyint unsigned NOT NULL DEFAULT '1',
  `declarable` tinyint unsigned NOT NULL DEFAULT '1',
  `cateogry_uid` int unsigned NOT NULL,
  `family_uid` int unsigned NOT NULL,
  `prix_vente` double(14,2) unsigned NOT NULL,
  `prix_achat_mp` double(14,2) unsigned NOT NULL,
  `stockable` tinyint unsigned NOT NULL DEFAULT '1',
  `identifiable` tinyint unsigned NOT NULL DEFAULT '0',
  `unite_mesure_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_items_famille_uid_idx` (`family_uid`),
  KEY `fk_items_category_uid_idx` (`cateogry_uid`),
  KEY `fk_items_unite_mesure_uid_idx` (`unite_mesure_uid`),
  CONSTRAINT `fk_items_category_uid` FOREIGN KEY (`cateogry_uid`) REFERENCES `categories` (`uid`),
  CONSTRAINT `fk_items_famille_uid` FOREIGN KEY (`family_uid`) REFERENCES `familles` (`uid`),
  CONSTRAINT `fk_items_unite_mesure_uid` FOREIGN KEY (`unite_mesure_uid`) REFERENCES `unites_mesure` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magasins`
--

DROP TABLE IF EXISTS `magasins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `magasins` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `adresse` varchar(45) NOT NULL,
  `responsable_uid` int unsigned NOT NULL,
  `user_uid` int unsigned NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`),
  KEY `fk_magasins_employee_uid_idx` (`responsable_uid`),
  KEY `fk_magasins_user_uid_idx` (`user_uid`),
  CONSTRAINT `fk_magasins_employee_uid` FOREIGN KEY (`responsable_uid`) REFERENCES `employees` (`uid`),
  CONSTRAINT `fk_magasins_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='pre popolated with local banks';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magasins`
--

LOCK TABLES `magasins` WRITE;
/*!40000 ALTER TABLE `magasins` DISABLE KEYS */;
/*!40000 ALTER TABLE `magasins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mes_banques`
--

DROP TABLE IF EXISTS `mes_banques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mes_banques` (
  `uid` int unsigned NOT NULL,
  `banque_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_mes_banques_banques_uid_idx` (`banque_uid`),
  CONSTRAINT `fk_mes_banques_banques_uid` FOREIGN KEY (`banque_uid`) REFERENCES `banques` (`uid`),
  CONSTRAINT `fk_mes_banques_treso_uid` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mes_banques`
--

LOCK TABLES `mes_banques` WRITE;
/*!40000 ALTER TABLE `mes_banques` DISABLE KEYS */;
/*!40000 ALTER TABLE `mes_banques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mode_pmt_bank`
--

DROP TABLE IF EXISTS `mode_pmt_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mode_pmt_bank` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(35) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mode_pmt_bank`
--

LOCK TABLES `mode_pmt_bank` WRITE;
/*!40000 ALTER TABLE `mode_pmt_bank` DISABLE KEYS */;
/*!40000 ALTER TABLE `mode_pmt_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movements`
--

DROP TABLE IF EXISTS `movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movements` (
  `uid` int unsigned NOT NULL,
  `item_uid` int unsigned NOT NULL,
  `num_serie` varchar(45) DEFAULT NULL,
  `quantity` double(14,2) NOT NULL,
  `locked` tinyint unsigned NOT NULL DEFAULT '0',
  `in_out` tinyint unsigned NOT NULL DEFAULT '1',
  `stock_impacted` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  KEY `fk_movements_item_uid_idx` (`item_uid`),
  KEY `fk_movements_num_serie_idx` (`num_serie`),
  CONSTRAINT `fk_movements_item_uid` FOREIGN KEY (`item_uid`) REFERENCES `items` (`uid`),
  CONSTRAINT `fk_movements_num_serie` FOREIGN KEY (`num_serie`) REFERENCES `identifiables` (`num_serie`),
  CONSTRAINT `fk_movements_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movements`
--

LOCK TABLES `movements` WRITE;
/*!40000 ALTER TABLE `movements` DISABLE KEYS */;
/*!40000 ALTER TABLE `movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_bank`
--

DROP TABLE IF EXISTS `mvts_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_bank` (
  `uid` int unsigned NOT NULL,
  `ma_banque_uid` int unsigned NOT NULL,
  `mode_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_mvts_bank_mode_pmt_uid_idx` (`mode_uid`),
  KEY `fk_mvts_bank_ma_banque_uid_idx` (`ma_banque_uid`),
  CONSTRAINT `fk_mvts_bank_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  CONSTRAINT `fk_mvts_bank_ma_banque_uid` FOREIGN KEY (`ma_banque_uid`) REFERENCES `mes_banques` (`uid`),
  CONSTRAINT `fk_mvts_bank_mode_pmt_uid` FOREIGN KEY (`mode_uid`) REFERENCES `mode_pmt_bank` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_bank`
--

LOCK TABLES `mvts_bank` WRITE;
/*!40000 ALTER TABLE `mvts_bank` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_caisse`
--

DROP TABLE IF EXISTS `mvts_caisse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_caisse` (
  `uid` int unsigned NOT NULL,
  `caisse_uid` int unsigned NOT NULL,
  `porteur_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_mvt_caisse_uid_idx` (`caisse_uid`),
  KEY `fk_mvts_caisse_tier_uid_idx` (`porteur_uid`),
  CONSTRAINT `fk_mvts_caisse_caisse_uid` FOREIGN KEY (`caisse_uid`) REFERENCES `caisses` (`uid`),
  CONSTRAINT `fk_mvts_caisse_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  CONSTRAINT `fk_mvts_caisse_tier_uid` FOREIGN KEY (`porteur_uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_caisse`
--

LOCK TABLES `mvts_caisse` WRITE;
/*!40000 ALTER TABLE `mvts_caisse` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_caisse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_credit_client`
--

DROP TABLE IF EXISTS `mvts_credit_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_credit_client` (
  `uid` int unsigned NOT NULL,
  `treso_uid` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  KEY `fk_mvts_credit_client_credit_uid_idx` (`treso_uid`),
  CONSTRAINT `fk_mvts_credit_client_credit_uid` FOREIGN KEY (`treso_uid`) REFERENCES `credits` (`uid`),
  CONSTRAINT `fk_mvts_credit_client_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_credit_client`
--

LOCK TABLES `mvts_credit_client` WRITE;
/*!40000 ALTER TABLE `mvts_credit_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_credit_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_credit_fournisseur`
--

DROP TABLE IF EXISTS `mvts_credit_fournisseur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_credit_fournisseur` (
  `uid` int unsigned NOT NULL,
  `treso_uid` int unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  KEY `fk_mvts_credit_fournisseur_credit_uid_idx` (`treso_uid`),
  CONSTRAINT `fk_mvts_credit_fournisseur_credit_uid` FOREIGN KEY (`treso_uid`) REFERENCES `credits` (`uid`),
  CONSTRAINT `fk_mvts_credit_fournisseur_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_credit_fournisseur`
--

LOCK TABLES `mvts_credit_fournisseur` WRITE;
/*!40000 ALTER TABLE `mvts_credit_fournisseur` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_credit_fournisseur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_internes`
--

DROP TABLE IF EXISTS `mvts_internes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_internes` (
  `uid` int unsigned NOT NULL,
  `origin_uid` int unsigned NOT NULL,
  `destination_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_mvts_internes_origine_uid_idx` (`origin_uid`),
  KEY `fk_mvts_internes_destination_uid_idx` (`destination_uid`),
  CONSTRAINT `fk_mvts_internes_destination_uid` FOREIGN KEY (`destination_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_mvts_internes_origine_uid` FOREIGN KEY (`origin_uid`) REFERENCES `magasins` (`uid`),
  CONSTRAINT `fk_mvts_internes_outsides_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_internes`
--

LOCK TABLES `mvts_internes` WRITE;
/*!40000 ALTER TABLE `mvts_internes` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_internes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_mobile_money`
--

DROP TABLE IF EXISTS `mvts_mobile_money`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_mobile_money` (
  `uid` int unsigned NOT NULL,
  `operateur_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_mvts_mobile_money_operateur_uid_idx` (`operateur_uid`),
  CONSTRAINT `fk_mvts_mobile_money_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  CONSTRAINT `fk_mvts_mobile_money_operateur_uid` FOREIGN KEY (`operateur_uid`) REFERENCES `operateurs` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_mobile_money`
--

LOCK TABLES `mvts_mobile_money` WRITE;
/*!40000 ALTER TABLE `mvts_mobile_money` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_mobile_money` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mvts_wallet_electronic`
--

DROP TABLE IF EXISTS `mvts_wallet_electronic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mvts_wallet_electronic` (
  `uid` int unsigned NOT NULL,
  `wallet_electronic_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  KEY `fk_mvts_wallet_electronic_wallet_electronic_uid_idx` (`wallet_electronic_uid`),
  CONSTRAINT `fk_mvts_wallet_electronic_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  CONSTRAINT `fk_mvts_wallet_electronic_wallet_electronic_uid` FOREIGN KEY (`wallet_electronic_uid`) REFERENCES `wallets_electonic` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mvts_wallet_electronic`
--

LOCK TABLES `mvts_wallet_electronic` WRITE;
/*!40000 ALTER TABLE `mvts_wallet_electronic` DISABLE KEYS */;
/*!40000 ALTER TABLE `mvts_wallet_electronic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nd_client`
--

DROP TABLE IF EXISTS `nd_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nd_client` (
  `num_nd` int(4) unsigned zerofill NOT NULL,
  `outside_uid` int unsigned NOT NULL,
  `client_uid` int unsigned NOT NULL,
  `libelle` tinytext,
  `commercial_uid` int unsigned NOT NULL,
  PRIMARY KEY (`num_nd`),
  KEY `fk_nd_client_uid_idx` (`client_uid`),
  KEY `fk_nd_outside_uid_idx` (`outside_uid`),
  KEY `fk_nd_commercial_uid_idx` (`commercial_uid`),
  CONSTRAINT `fk_nd_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  CONSTRAINT `fk_nd_commercial_uid` FOREIGN KEY (`commercial_uid`) REFERENCES `employees` (`uid`),
  CONSTRAINT `fk_nd_outside_uid` FOREIGN KEY (`outside_uid`) REFERENCES `outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nd_client`
--

LOCK TABLES `nd_client` WRITE;
/*!40000 ALTER TABLE `nd_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `nd_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operateurs`
--

DROP TABLE IF EXISTS `operateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operateurs` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `tiers_uid` int unsigned NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `active` tinyint unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `phone_number_UNIQUE` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operateurs`
--

LOCK TABLES `operateurs` WRITE;
/*!40000 ALTER TABLE `operateurs` DISABLE KEYS */;
/*!40000 ALTER TABLE `operateurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outsides`
--

DROP TABLE IF EXISTS `outsides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outsides` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `type_uid` tinyint unsigned DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `montant` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `datetime` timestamp NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_outsides_types_idx` (`type_uid`),
  CONSTRAINT `fk_outsides_types` FOREIGN KEY (`type_uid`) REFERENCES `types_outsides` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outsides`
--

LOCK TABLES `outsides` WRITE;
/*!40000 ALTER TABLE `outsides` DISABLE KEYS */;
/*!40000 ALTER TABLE `outsides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `params`
--

DROP TABLE IF EXISTS `params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `params` (
  `uid` int unsigned NOT NULL,
  `tiers_uid` int unsigned NOT NULL,
  `tva` tinyint unsigned NOT NULL DEFAULT '0',
  `export` tinyint unsigned NOT NULL DEFAULT '0',
  `devise_int` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_params_tier_uid_idx` (`tiers_uid`),
  KEY `fk_params_devise_uid_idx` (`devise_int`),
  CONSTRAINT `fk_params_devise_uid` FOREIGN KEY (`devise_int`) REFERENCES `devises` (`uid`),
  CONSTRAINT `fk_params_tier_uid` FOREIGN KEY (`tiers_uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `params`
--

LOCK TABLES `params` WRITE;
/*!40000 ALTER TABLE `params` DISABLE KEYS */;
/*!40000 ALTER TABLE `params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sme`
--

DROP TABLE IF EXISTS `sme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sme` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `montant` double(14,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sme`
--

LOCK TABLES `sme` WRITE;
/*!40000 ALTER TABLE `sme` DISABLE KEYS */;
/*!40000 ALTER TABLE `sme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smie`
--

DROP TABLE IF EXISTS `smie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `smie` (
  `uid` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `rate_sal` double(4,3) unsigned NOT NULL,
  `rate_emp` double(4,3) unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_smie_institutions_uid` FOREIGN KEY (`uid`) REFERENCES `institutions` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smie`
--

LOCK TABLES `smie` WRITE;
/*!40000 ALTER TABLE `smie` DISABLE KEYS */;
/*!40000 ALTER TABLE `smie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (2,'tentative2');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiers`
--

DROP TABLE IF EXISTS `tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiers` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `type_personnality_uid` int unsigned NOT NULL,
  `adress` varchar(45) NOT NULL,
  `nif` varchar(45) DEFAULT NULL,
  `stat` varchar(45) DEFAULT NULL,
  `rcs` varchar(12) DEFAULT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) DEFAULT NULL,
  `mail1` varchar(45) NOT NULL,
  `mail2` varchar(45) DEFAULT NULL,
  `active_tiers` tinyint unsigned NOT NULL DEFAULT '1',
  `note` tinytext,
  PRIMARY KEY (`uid`),
  KEY `fk_tiers_type_personality_uid_idx` (`type_personnality_uid`),
  CONSTRAINT `fk_tiers_type_personality_uid` FOREIGN KEY (`type_personnality_uid`) REFERENCES `types_personality` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiers`
--

LOCK TABLES `tiers` WRITE;
/*!40000 ALTER TABLE `tiers` DISABLE KEYS */;
INSERT INTO `tiers` VALUES (1,1,'test2','','','','0341234567','0331234567','r.jean@gmail.com','',1,NULL),(2,1,'home',NULL,NULL,NULL,'033',NULL,'mail',NULL,1,NULL),(5,1,'ambonivohitra pokemon uk','','','','0341234567','0331234567','r.jean@gmail.com','',1,NULL),(6,1,'usa','','','','','','','',1,''),(7,1,'qsfd bourg pa','','','','365467','4654','sqfd','sqdf',1,''),(11,2,'ankorondrano','','','','034','034','contact@timigsm.com','',1,''),(12,1,'','','','','','','','',1,''),(13,2,'nowhere','','','','','','','',1,''),(14,2,'ankorondrano red island tower','','','','','','','',1,''),(15,1,'','','','','','','','',1,''),(16,1,'','','','','','','','',1,''),(17,2,'france','','','','','','','',1,''),(18,2,'','','','','','','','',1,''),(19,2,'','','','','','','','',1,''),(20,2,'','','','','','','','',1,''),(21,2,'','','','','','','','',1,''),(22,2,'','','','','','','','',1,''),(23,2,'','','','','','','','',1,''),(24,2,'','','','','','','','',1,''),(25,2,'','','','','','','','',1,''),(26,2,'','','','','','','','',1,''),(27,1,'manoir','','','','034','032','williamson@gmail.com','williamson@directimmo.mg',1,''),(28,2,'cité ampefiloha logement 267','','','','0349772868','032','stephane@gmail.com','',1,''),(29,2,'ampasamadinika','','','','0344','03888','comptabilite@techtablet.fr','',1,''),(30,2,'tana','','','','6798','4486','xyz@gmail.mg','',1,''),(31,2,'','','','','','','','',1,''),(32,2,'','','','','','','','',1,''),(33,1,'','','','','','','','',1,''),(34,1,'','','','','','','','',1,''),(35,2,'','','','','','','','',0,''),(36,2,'','','','','','','','',1,''),(37,2,'','','','','','','','',1,''),(38,2,'','','','','','','','',1,''),(39,2,'','','','','','','','',1,''),(40,2,'','','','','','','','',1,''),(41,1,'ammbohimanarina','','','','0320719911','','','',1,''),(42,1,'Ambatobe chez les riches lol','','','','032','0322','pierre.bourdon@gmail.com','',1,''),(43,2,'saint machin en france','','','','','','','',1,''),(44,2,'ampefiloha','','','','0349772868','','irmi@gmail.com','',1,''),(45,2,'tsimabazaza','','','','','','','',1,''),(46,1,'chez papa et maman','','','','','','','',1,''),(47,2,'usa','','','','','','','',1,'everybody hates them '),(48,2,'','','','','','','','',1,''),(49,2,'','','','','','','','',1,''),(50,2,'','','','','','','','',1,''),(51,1,'','','','','','','','',1,''),(52,1,'','','','','','','','',1,''),(53,2,'','','','','','','','',1,''),(54,2,'','','','','','','','',1,''),(55,2,'','','','','','','','',1,''),(56,2,'','','','','','','','',1,''),(57,2,'','','','','','','','',1,''),(58,2,'','','','','','','','',1,''),(59,2,'mada','','','','','','','',1,''),(60,2,'ss','','','','','','','',1,''),(61,2,'somewher only they know','','','','','','','',1,''),(62,2,'andresfan','','','','','','','',1,''),(63,2,'','','','','','','','',1,''),(64,2,'','','','','','','','',1,''),(65,2,'','','','','','','','',1,''),(66,2,'','','','','','','','',1,''),(67,2,'','','','','','','','',1,''),(68,2,'','','','','','','','',1,''),(69,2,'','','','','','','','',1,''),(70,1,'','','','','','','','',1,''),(71,1,'','','','','','','','',1,''),(72,1,'','','','','','','','',1,''),(73,2,'','','','','','','','',1,'');
/*!40000 ALTER TABLE `tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transferts_internes`
--

DROP TABLE IF EXISTS `transferts_internes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transferts_internes` (
  `uid` int unsigned NOT NULL,
  `source_uid` int unsigned NOT NULL,
  `destination_uid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `fk_transferts_internes_treso_source_uid_idx` (`source_uid`),
  KEY `fk_transferts_internes_treso_destination_uid_idx` (`destination_uid`),
  CONSTRAINT `fk_transferts_internes_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`),
  CONSTRAINT `fk_transferts_internes_treso_destination_uid` FOREIGN KEY (`destination_uid`) REFERENCES `tresos` (`uid`),
  CONSTRAINT `fk_transferts_internes_treso_source_uid` FOREIGN KEY (`source_uid`) REFERENCES `tresos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='pour treso';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transferts_internes`
--

LOCK TABLES `transferts_internes` WRITE;
/*!40000 ALTER TABLE `transferts_internes` DISABLE KEYS */;
/*!40000 ALTER TABLE `transferts_internes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tresos`
--

DROP TABLE IF EXISTS `tresos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tresos` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type_treso_uid` int unsigned NOT NULL,
  `devise_uid` int unsigned NOT NULL,
  `active` tinyint unsigned NOT NULL,
  `declarable` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fkt_tresos_type_treso_uid_idx` (`type_treso_uid`),
  KEY `fkt_tresos_type_devise_uid_idx` (`devise_uid`),
  CONSTRAINT `fkt_tresos_type_devise_uid` FOREIGN KEY (`devise_uid`) REFERENCES `devises` (`uid`),
  CONSTRAINT `fkt_tresos_type_treso_uid` FOREIGN KEY (`type_treso_uid`) REFERENCES `types_treso` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tresos`
--

LOCK TABLES `tresos` WRITE;
/*!40000 ALTER TABLE `tresos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tresos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_avantage`
--

DROP TABLE IF EXISTS `types_avantage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_avantage` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `note` tinytext,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_avantage`
--

LOCK TABLES `types_avantage` WRITE;
/*!40000 ALTER TABLE `types_avantage` DISABLE KEYS */;
/*!40000 ALTER TABLE `types_avantage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_institutions`
--

DROP TABLE IF EXISTS `types_institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_institutions` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `note` tinytext,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='fisc, douane, santé,retraite, formation,etc,...';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_institutions`
--

LOCK TABLES `types_institutions` WRITE;
/*!40000 ALTER TABLE `types_institutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `types_institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_obligations`
--

DROP TABLE IF EXISTS `types_obligations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_obligations` (
  `uid` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `note` tinytext,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_obligations`
--

LOCK TABLES `types_obligations` WRITE;
/*!40000 ALTER TABLE `types_obligations` DISABLE KEYS */;
/*!40000 ALTER TABLE `types_obligations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_outsides`
--

DROP TABLE IF EXISTS `types_outsides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_outsides` (
  `uid` tinyint unsigned NOT NULL,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `uid_UNIQUE` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_outsides`
--

LOCK TABLES `types_outsides` WRITE;
/*!40000 ALTER TABLE `types_outsides` DISABLE KEYS */;
/*!40000 ALTER TABLE `types_outsides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_personality`
--

DROP TABLE IF EXISTS `types_personality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_personality` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_personality`
--

LOCK TABLES `types_personality` WRITE;
/*!40000 ALTER TABLE `types_personality` DISABLE KEYS */;
INSERT INTO `types_personality` VALUES (2,'personne morale'),(1,'personne physique');
/*!40000 ALTER TABLE `types_personality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_tiers`
--

DROP TABLE IF EXISTS `types_tiers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_tiers` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_tiers`
--

LOCK TABLES `types_tiers` WRITE;
/*!40000 ALTER TABLE `types_tiers` DISABLE KEYS */;
/*!40000 ALTER TABLE `types_tiers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types_treso`
--

DROP TABLE IF EXISTS `types_treso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types_treso` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types_treso`
--

LOCK TABLES `types_treso` WRITE;
/*!40000 ALTER TABLE `types_treso` DISABLE KEYS */;
/*!40000 ALTER TABLE `types_treso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unites_mesure`
--

DROP TABLE IF EXISTS `unites_mesure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unites_mesure` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unites_mesure`
--

LOCK TABLES `unites_mesure` WRITE;
/*!40000 ALTER TABLE `unites_mesure` DISABLE KEYS */;
/*!40000 ALTER TABLE `unites_mesure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int unsigned NOT NULL,
  `login` varchar(45) NOT NULL,
  `mdp` varchar(45) NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  `client_create` tinyint unsigned NOT NULL DEFAULT '0',
  `client_read` tinyint unsigned NOT NULL DEFAULT '1',
  `client_update` tinyint unsigned NOT NULL DEFAULT '0',
  `client_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `fournisseur_create` tinyint unsigned NOT NULL DEFAULT '0',
  `fournisseur_read` tinyint unsigned NOT NULL DEFAULT '1',
  `fournisseur_update` tinyint unsigned NOT NULL DEFAULT '0',
  `fournisseur_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `facture_client_create` tinyint unsigned NOT NULL DEFAULT '0',
  `facture_client_read` tinyint unsigned NOT NULL DEFAULT '1',
  `facture_client_update` tinyint unsigned NOT NULL DEFAULT '0',
  `facture_client_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `facture_fournisseur_create` tinyint unsigned NOT NULL DEFAULT '0',
  `facture_fournisseur_read` tinyint unsigned NOT NULL DEFAULT '1',
  `facture_fournisseur_update` tinyint unsigned NOT NULL DEFAULT '0',
  `facture_fournisseur_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `tresorerie_create` tinyint unsigned NOT NULL DEFAULT '0',
  `tresorerie_read` tinyint unsigned NOT NULL DEFAULT '1',
  `tresorerie_update` tinyint unsigned NOT NULL DEFAULT '0',
  `tresorerie_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `stock_create` tinyint unsigned NOT NULL DEFAULT '0',
  `stock_read` tinyint unsigned NOT NULL DEFAULT '1',
  `stock_update` tinyint unsigned NOT NULL DEFAULT '0',
  `stock_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `famille_create` tinyint unsigned NOT NULL DEFAULT '0',
  `famille_read` tinyint unsigned NOT NULL DEFAULT '1',
  `famille_update` tinyint unsigned NOT NULL DEFAULT '0',
  `famille_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `categorie_create` tinyint unsigned NOT NULL DEFAULT '0',
  `categorie_read` tinyint unsigned NOT NULL DEFAULT '1',
  `categorie_update` tinyint unsigned NOT NULL DEFAULT '0',
  `categorie_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `item_create` tinyint unsigned NOT NULL DEFAULT '0',
  `item_read` tinyint unsigned NOT NULL DEFAULT '1',
  `item_update` tinyint unsigned NOT NULL DEFAULT '0',
  `item_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `employee_create` tinyint unsigned NOT NULL DEFAULT '0',
  `employee_read` tinyint unsigned NOT NULL DEFAULT '1',
  `employee_update` tinyint unsigned NOT NULL DEFAULT '0',
  `employee_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `authorization_create` tinyint unsigned NOT NULL DEFAULT '0',
  `authorization_read` tinyint unsigned NOT NULL DEFAULT '1',
  `authorization_update` tinyint unsigned NOT NULL DEFAULT '0',
  `authorization_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `affaire_create` tinyint unsigned NOT NULL DEFAULT '0',
  `affaire_read` tinyint unsigned NOT NULL DEFAULT '1',
  `affaire_update` tinyint unsigned NOT NULL DEFAULT '0',
  `affaire_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `devis_create` tinyint unsigned NOT NULL DEFAULT '0',
  `devis_read` tinyint unsigned NOT NULL DEFAULT '1',
  `devis_update` tinyint unsigned NOT NULL DEFAULT '0',
  `devis_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `avoir_client_create` tinyint unsigned NOT NULL DEFAULT '0',
  `avoir_client_read` tinyint unsigned NOT NULL DEFAULT '1',
  `avoir_client_update` tinyint unsigned NOT NULL DEFAULT '0',
  `avoir_client_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `mvt_treso_create` tinyint unsigned NOT NULL DEFAULT '0',
  `mvt_treso_read` tinyint unsigned NOT NULL DEFAULT '1',
  `mvt_treso_update` tinyint unsigned NOT NULL DEFAULT '0',
  `mvts_treso_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `nd_client_create` tinyint unsigned NOT NULL DEFAULT '0',
  `nd_client_read` tinyint unsigned NOT NULL DEFAULT '1',
  `nd_client_update` tinyint unsigned NOT NULL DEFAULT '0',
  `nd_client_delete` tinyint unsigned NOT NULL DEFAULT '0',
  `mvt_interne_create` tinyint unsigned NOT NULL DEFAULT '0',
  `mvt_interne_read` tinyint unsigned NOT NULL DEFAULT '1',
  `mvt_interne_update` tinyint unsigned NOT NULL DEFAULT '0',
  `mvt_interne_delete` tinyint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`uid`),
  CONSTRAINT `fk_users_tiers_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mampi','123456',1,1,1,1,1,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0),(2,'user1','123456',1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_all_clients`
--

DROP TABLE IF EXISTS `view_all_clients`;
/*!50001 DROP VIEW IF EXISTS `view_all_clients`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_all_clients` AS SELECT 
 1 AS `uid`,
 1 AS `type_personnality_uid`,
 1 AS `adress`,
 1 AS `nif`,
 1 AS `stat`,
 1 AS `rcs`,
 1 AS `phone1`,
 1 AS `phone2`,
 1 AS `mail1`,
 1 AS `mail2`,
 1 AS `active_tiers`,
 1 AS `note`,
 1 AS `type_vente`,
 1 AS `encours`,
 1 AS `nb_jour`,
 1 AS `evaluation`,
 1 AS `declarable`,
 1 AS `commissionable`,
 1 AS `noms`,
 1 AS `prenoms`,
 1 AS `cin`,
 1 AS `cin_date`,
 1 AS `cin_lieu`,
 1 AS `naissance_date`,
 1 AS `naissance_lieu`,
 1 AS `nom_commercial`,
 1 AS `raison_sociale`,
 1 AS `active_client`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_all_fournisseurs`
--

DROP TABLE IF EXISTS `view_all_fournisseurs`;
/*!50001 DROP VIEW IF EXISTS `view_all_fournisseurs`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_all_fournisseurs` AS SELECT 
 1 AS `uid`,
 1 AS `type_personnality_uid`,
 1 AS `adress`,
 1 AS `nif`,
 1 AS `stat`,
 1 AS `rcs`,
 1 AS `phone1`,
 1 AS `phone2`,
 1 AS `mail1`,
 1 AS `mail2`,
 1 AS `active_tiers`,
 1 AS `note`,
 1 AS `encours`,
 1 AS `nb_jour`,
 1 AS `evaluation`,
 1 AS `declarable`,
 1 AS `noms`,
 1 AS `prenoms`,
 1 AS `cin`,
 1 AS `cin_date`,
 1 AS `cin_lieu`,
 1 AS `naissance_date`,
 1 AS `naissance_lieu`,
 1 AS `nom_commercial`,
 1 AS `raison_sociale`,
 1 AS `active_fournisseur`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `wallets_electonic`
--

DROP TABLE IF EXISTS `wallets_electonic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets_electonic` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `mail` varchar(45) NOT NULL,
  `url` varchar(45) NOT NULL,
  `account_id` varchar(45) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `url_UNIQUE` (`url`),
  CONSTRAINT `tk_wallets_electronic_treso_uid` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets_electonic`
--

LOCK TABLES `wallets_electonic` WRITE;
/*!40000 ALTER TABLE `wallets_electonic` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallets_electonic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'erpv2'
--

--
-- Dumping routines for database 'erpv2'
--
/*!50003 DROP FUNCTION IF EXISTS `new_client` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `new_client`(
 type_personnality_uid int,
 adress varchar(45) , 
 nif varchar(45) ,
 stat varchar(45) ,
 rcs varchar(12) ,
 phone1 varchar(15) ,
 phone2 varchar(15) ,
 mail1 varchar(45) ,
 mail2 varchar(45) ,
 active_client tinyint,
 note tinytext,
 nom_commercial varchar(45),
 raison_social varchar(45),
 noms varchar(45),
 prenoms varchar(45),
 cin varchar(12),
 cin_date date,
 cin_lieu varchar(45),
 naissance_date date,
 naissance_lieu varchar(45),
 type_vente tinyint,
 encours double(14,2),
 nb_jour int,
 evaluation tinyint,
 declarable tinyint,
 commissionable tinyint
) RETURNS int
    DETERMINISTIC
BEGIN
    declare newid int default 0;
	insert into `tiers` values(null,type_personnality_uid,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,active_client,note);
    select last_insert_id() into newid;
    #select @final;
    case type_personnality_uid
    when 1 then
    insert into `humans` values( newid,noms,prenoms,cin,cin_date,cin_lieu,naissance_date,naissance_lieu);
    when 2 then
    insert into `companies` values(newid,nom_commercial,raison_social);
    end case;
    insert into `clients` values(newid,type_vente,encours,nb_jour,evaluation,declarable,commissionable,active_client);

RETURN newid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `new_fournisseur` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `new_fournisseur`(
 type_personnality_uid int,
 adress varchar(45) , 
 nif varchar(45) ,
 stat varchar(45) ,
 rcs varchar(12) ,
 phone1 varchar(15) ,
 phone2 varchar(15) ,
 mail1 varchar(45) ,
 mail2 varchar(45) ,
 active_fournisseur tinyint,
 note tinytext,
 nom_commercial varchar(45),
 raison_social varchar(45),
 noms varchar(45),
 prenoms varchar(45),
 cin varchar(12),
 cin_date date,
 cin_lieu varchar(45),
 naissance_date date,
 naissance_lieu varchar(45),
 encours double(14,2),
 nb_jour int,
 evaluation tinyint,
 declarable tinyint
) RETURNS int
    DETERMINISTIC
BEGIN
    declare newid int default 0;
	insert into `tiers` values(null,type_personnality_uid,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,active_fournisseur,note);
    select last_insert_id() into newid;
    #select @final;
    case type_personnality_uid
    when 1 then
    insert into `humans` values( newid,noms,prenoms,cin,cin_date,cin_lieu,naissance_date,naissance_lieu);
    when 2 then
    insert into `companies` values(newid,nom_commercial,raison_social);
    end case;
    insert into `fournisseurs` values(newid,encours,evaluation,nb_jour,declarable,active_fournisseur);

RETURN newid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `testeur` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `testeur`(
 name_ varchar(45)
) RETURNS int
    DETERMINISTIC
BEGIN
    declare newid int default 0;
	insert into `test` values(null,name_);
    select last_insert_id() into newid;

RETURN newid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `update_client` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `update_client`(my_uid int ,
 my_type_personnality_uid int,
 my_adress varchar(45) , 
 my_nif varchar(45) ,
 my_stat varchar(45) ,
 my_rcs varchar(12) ,
 my_phone1 varchar(15) ,
 my_phone2 varchar(15) ,
 my_mail1 varchar(45) ,
 my_mail2 varchar(45) ,
 my_active_ tinyint,
 my_note tinytext,
 my_nom_commercial varchar(45),
 my_raison_sociale varchar(45),
 my_noms varchar(45),
 my_prenoms varchar(45),
 my_cin varchar(12),
 my_cin_date date,
 my_cin_lieu varchar(45),
 my_naissance_date date,
 my_naissance_lieu varchar(45),
 my_type_vente tinyint,
 my_encours double(14,2),
 my_nb_jour int,
 my_evaluation tinyint,
 my_declarable tinyint,
 my_commissionable tinyint
) RETURNS int
    DETERMINISTIC
BEGIN
    declare affected_tiers int default 0;
	declare affected_humans int default 0;
    declare affected_companies int default 0;
    declare affected_clients int default 0;
    declare affected_total int default 0;
update tiers set 
    type_personnality_uid=my_type_personnality_uid,
    adress=my_adress,
    nif=my_nif,
    stat=my_stat,
    rcs=my_rcs,
    phone1=my_phone1,
    phone2=my_phone2,
    mail1=my_mail1,
	mail2=my_mail2
    where uid=my_uid
    ;
    set affected_tiers = row_count();
    case my_type_personnality_uid
    when 1 then
    update humans set
    noms=my_noms,
    prenoms=my_prenoms,
    cin=my_cin,
    cin_date=my_cin_date,
    cin_lieu=my_cin_lieu,
    naissance_date=my_naissance_date,
    naissance_lieu=my_naissance_lieu
    where uid=my_uid
    ;
	set affected_humans = row_count();

    when 2 then
    update companies set
    nom_commercial=my_nom_commercial,
    raison_sociale=my_raison_sociale
    where uid=my_uid
    ;
        set affected_companies = row_count();

    end case;
    update clients set
    type_vente=my_type_vente,
    encours=my_encours,
    nb_jour=nb_jour,
    evaluation=my_evaluation,
    declarable=my_declarable,
    commissionable=my_commissionable,
    active_client=my_active_
    where
    uid=my_uid;
    set affected_clients = row_count();
    set affected_total=affected_tiers+affected_humans+affected_companies+affected_clients;
RETURN affected_total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `update_fournisseur` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `update_fournisseur`(my_uid int ,
 my_type_personnality_uid int,
 my_adress varchar(45) , 
 my_nif varchar(45) ,
 my_stat varchar(45) ,
 my_rcs varchar(12) ,
 my_phone1 varchar(15) ,
 my_phone2 varchar(15) ,
 my_mail1 varchar(45) ,
 my_mail2 varchar(45) ,
 my_active_ tinyint,
 my_note tinytext,
 my_nom_commercial varchar(45),
 my_raison_sociale varchar(45),
 my_noms varchar(45),
 my_prenoms varchar(45),
 my_cin varchar(12),
 my_cin_date date,
 my_cin_lieu varchar(45),
 my_naissance_date date,
 my_naissance_lieu varchar(45),
 my_encours double(14,2),
 my_nb_jour int,
 my_evaluation tinyint,
 my_declarable tinyint
) RETURNS int
    DETERMINISTIC
BEGIN
    declare affected_tiers int default 0;
	declare affected_humans int default 0;
    declare affected_companies int default 0;
    declare affected_fournisseurs int default 0;
    declare affected_total int default 0;
update tiers set 
    type_personnality_uid=my_type_personnality_uid,
    adress=my_adress,
    nif=my_nif,
    stat=my_stat,
    rcs=my_rcs,
    phone1=my_phone1,
    phone2=my_phone2,
    mail1=my_mail1,
	mail2=my_mail2
    where uid=my_uid
    ;
    set affected_tiers = row_count();
    case my_type_personnality_uid
    when 1 then
    update humans set
    noms=my_noms,
    prenoms=my_prenoms,
    cin=my_cin,
    cin_date=my_cin_date,
    cin_lieu=my_cin_lieu,
    naissance_date=my_naissance_date,
    naissance_lieu=my_naissance_lieu
    where uid=my_uid
    ;
	set affected_humans = row_count();

    when 2 then
    update companies set
    nom_commercial=my_nom_commercial,
    raison_sociale=my_raison_sociale
    where uid=my_uid
    ;
        set affected_companies = row_count();

    end case;
    update fournisseurs set
    encours=my_encours,
    nb_jour=nb_jour,
    evaluation=my_evaluation,
    declarable=my_declarable,
    active_fournisseur=my_active_
    where
    uid=my_uid;
    set affected_fournisseurs = row_count();
    set affected_total=affected_tiers+affected_humans+affected_companies+affected_fournisseurs;
RETURN affected_total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `all_clients` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_clients`()
BEGIN
select* from (
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
type_vente,encours,nb_jour,evaluation,declarable,commissionable,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,cin as cin,cin_date as cin_date,cin_lieu as cin_lieu,naissance_date as naissance_date,naissance_lieu as naissance_lieu,
"" as nom_commercial, "" as raison_sociale,
active_client 
from tiers
join humans on `tiers`.`uid`= `humans`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid` 
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
type_vente,encours,nb_jour,evaluation,declarable,commissionable,
"" as noms,"" as prenoms,"" as cin,"" as cin_date,"" as cin_lieu,"" as naissance_date,"" as naissance_lieu,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale,
active_client 
 from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid` ) sub
order by uid asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `all_clients_active_only` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_clients_active_only`()
BEGIN
select* from (
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
type_vente,encours,nb_jour,evaluation,declarable,commissionable,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,cin as cin,cin_date as cin_date,cin_lieu as cin_lieu,naissance_date as naissance_date,naissance_lieu as naissance_lieu,
"" as nom_commercial, "" as raison_sociale,
active_client 
from tiers
join humans on `tiers`.`uid`= `humans`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid` where clients.active_client=1 and tiers.active_tiers=1
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
type_vente,encours,nb_jour,evaluation,declarable,commissionable,
"" as noms,"" as prenoms,"" as cin,"" as cin_date,"" as cin_lieu,"" as naissance_date,"" as naissance_lieu,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale,
active_client 
 from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid` where clients.active_client=1 and tiers.active_tiers=1) sub
order by uid asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `all_clients_name` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_clients_name`()
BEGIN
select* from (
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,`active_tiers`,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,
"" as nom_commercial, "" as raison_sociale 
from tiers 
join humans on `tiers`.`uid`= `humans`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid` where clients.active_client=1 and tiers.active_tiers=1
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,`active_tiers`,

"" as noms,"" as prenoms,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale 
from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid` where clients.active_client=1 and tiers.active_tiers=1) sub
order by uid asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `all_fournisseurs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_fournisseurs`()
BEGIN
select* from (
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
encours,nb_jour,evaluation,declarable,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,cin as cin,cin_date as cin_date,cin_lieu as cin_lieu,naissance_date as naissance_date,naissance_lieu as naissance_lieu,
"" as nom_commercial, "" as raison_sociale,
active_fournisseur
from tiers
join humans on `tiers`.`uid`= `humans`.`uid`
join fournisseurs on `tiers`.`uid`= `fournisseurs`.`uid` 
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
encours,nb_jour,evaluation,declarable,
"" as noms,"" as prenoms,"" as cin,"" as cin_date,"" as cin_lieu,"" as naissance_date,"" as naissance_lieu,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale,
active_fournisseur 
 from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join fournisseurs on `tiers`.`uid`= `fournisseurs`.`uid` ) sub
order by uid asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `all_fournisseurs_name` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_fournisseurs_name`()
BEGIN
select* from (
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,`active_tiers`,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,
"" as nom_commercial, "" as raison_sociale 
from tiers 
join humans on `tiers`.`uid`= `humans`.`uid`
join fournisseurs on `tiers`.`uid`= `fournisseurs`.`uid` where fournisseurs.active_fournisseur=1 and tiers.active_tiers=1
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,`active_tiers`,

"" as noms,"" as prenoms,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale 
from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join fournisseurs on `tiers`.`uid`= `fournisseurs`.`uid` where fournisseurs.active_fournisseur=1 and tiers.active_tiers=1) sub
order by uid asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_client` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_client`(out myuid int ,
in type_personnality_uid int,
in adress varchar(45) , 
in nif varchar(45) ,
in stat varchar(45) ,
in rcs varchar(12) ,
in phone1 varchar(15) ,
in phone2 varchar(15) ,
in mail1 varchar(45) ,
in mail2 varchar(45) ,
in active_ tinyint,
in note tinytext,
in nom_commercial varchar(45),
in raison_social varchar(45),
in noms varchar(45),
in prenoms varchar(45),
in cin varchar(12),
in cin_date date,
in cin_lieu varchar(45),
in naissance_date date,
in naissance_lieu varchar(45),
in type_vente tinyint,
in encours double(14,2),
in nb_jour int,
in evaluation tinyint,
in declarable tinyint,
in commissionable tinyint
)
BEGIN

	insert into `tiers` values(null,type_personnality_uid,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,active_,note);
    set @myuid=last_insert_id();
    #select @final;
    case type_personnality_uid
    when 1 then
    insert into `humans` values( myuid,noms,prenoms,cin,cin_date,cin_lieu,naissance_date,naissance_lieu);
    when 2 then
    insert into `companies` values(myuid,nom_commercial,raison_social);
    end case;
    insert into `clients` values(myuid,type_vente,encours,nb_jour,evaluation,declarable,commissionable);
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `new_tiers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `new_tiers`(out myuid int ,
in type_personnality_uid int,
in adress varchar(45) , 
in nif varchar(45) ,
in stat varchar(45) ,
in rcs varchar(12) ,
in phone1 varchar(15) ,
in phone2 varchar(15) ,
in mail1 varchar(45) ,
in mail2 varchar(45) ,
in active_ tinyint,
in note tinytext,
in nom_commercial varchar(45),
in raison_social varchar(45),
in noms varchar(45),
in prenoms varchar(45),
in cin varchar(12),
in cin_date date,
in cin_lieu varchar(45),
in naissance_date date,
in naissance_lieu varchar(45)
)
BEGIN
	insert into `tiers` values(null,type_personnality_uid,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,active_,note);
    set @myuid=last_insert_id();
    #select @final;
    case type_personnality_uid
    when 1 then
    insert into `humans` values( myuid,noms,prenoms,cin,cin_date,cin_lieu,naissance_date,naissance_lieu);
    when 2 then
    insert into `companies` values(myuid,nom_commercial,raison_social);
    end case;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `one_client_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `one_client_details`(in myuid int)
BEGIN
select * from (select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
type_vente,encours,nb_jour,evaluation,declarable,commissionable,`active_client`,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,cin as cin,cin_date as cin_date,cin_lieu as cin_lieu,naissance_date as naissance_date,naissance_lieu as naissance_lieu,
"" as nom_commercial, "" as raison_sociale 
from tiers
join humans on `tiers`.`uid`= `humans`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid`
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
type_vente,encours,nb_jour,evaluation,declarable,commissionable,`active_client`,
"" as noms,"" as prenoms,"" as cin,"" as cin_date,"" as cin_lieu,"" as naissance_date,"" as naissance_lieu,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale 
from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join clients on `tiers`.`uid`= `clients`.`uid`) as sub_select where sub_select.uid=myuid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `one_fournisseur_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `one_fournisseur_details`(in myuid int)
BEGIN
select * from (select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
encours,nb_jour,evaluation,declarable,`active_fournisseur`,
`humans`.`noms` as noms,`humans`.`prenoms` as prenoms,cin as cin,cin_date as cin_date,cin_lieu as cin_lieu,naissance_date as naissance_date,naissance_lieu as naissance_lieu,
"" as nom_commercial, "" as raison_sociale 
from tiers
join humans on `tiers`.`uid`= `humans`.`uid`
join fournisseurs on `tiers`.`uid`= `fournisseurs`.`uid`
UNION
select `tiers`.`uid`, `tiers`.`type_personnality_uid`,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,`active_tiers`,note,
encours,nb_jour,evaluation,declarable,`active_fournisseur`,
"" as noms,"" as prenoms,"" as cin,"" as cin_date,"" as cin_lieu,"" as naissance_date,"" as naissance_lieu,
`companies`.nom_commercial as nom_commercial, `companies`.raison_sociale as raison_sociale 
from tiers
join companies on `tiers`.`uid`= `companies`.`uid`
join fournisseurs on `tiers`.`uid`= `fournisseurs`.`uid`) as sub_select where sub_select.uid=myuid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `testclient1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `testclient1`(in my_uid int ,
in my_type_personnality_uid int,
in my_adress varchar(45) , 
in my_nif varchar(45) ,
in my_stat varchar(45) ,
in my_rcs varchar(12) ,
in my_phone1 varchar(15) ,
in my_phone2 varchar(15) ,
in my_mail1 varchar(45) ,
in my_mail2 varchar(45) ,
in my_active_ tinyint,
in my_note tinytext,
in my_nom_commercial varchar(45),
in my_raison_sociale varchar(45),
in my_noms varchar(45),
in my_prenoms varchar(45),
in my_cin varchar(12),
in my_cin_date date,
in my_cin_lieu varchar(45),
in my_naissance_date date,
in my_naissance_lieu varchar(45),
in my_type_vente tinyint,
in my_encours double(14,2),
in my_nb_jour int,
in my_evaluation tinyint,
in my_declarable tinyint,
in my_commissionable tinyint
)
BEGIN
update tiers set 
    type_personnality_uid=my_type_personnality_uid,
    adress=my_adress,
    nif=my_nif,
    stat=my_stat,
    rcs=my_rcs,
    phone1=my_phone1,
    phone2=my_phone2,
    mail1=my_mail1,
	mail2=my_mail2
    where uid=my_uid
    ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `testclient2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `testclient2`(in my_uid int ,
in my_type_personnality_uid int,
in my_adress varchar(45) , 
in my_nif varchar(45) ,
in my_stat varchar(45) ,
in my_rcs varchar(12) ,
in my_phone1 varchar(15) ,
in my_phone2 varchar(15) ,
in my_mail1 varchar(45) ,
in my_mail2 varchar(45) ,
in my_active_ tinyint,
in my_note tinytext,
in my_nom_commercial varchar(45),
in my_raison_sociale varchar(45),
in my_noms varchar(45),
in my_prenoms varchar(45),
in my_cin varchar(12),
in my_cin_date date,
in my_cin_lieu varchar(45),
in my_naissance_date date,
in my_naissance_lieu varchar(45),
in my_type_vente tinyint,
in my_encours double(14,2),
in my_nb_jour int,
in my_evaluation tinyint,
in my_declarable tinyint,
in my_commissionable tinyint
)
BEGIN
update tiers set 
    type_personnality_uid=my_type_personnality_uid,
    adress=my_adress,
    nif=my_nif,
    stat=my_stat,
    rcs=my_rcs,
    phone1=my_phone1,
    phone2=my_phone2,
    mail1=my_mail1,
	mail2=my_mail2
    where uid=my_uid
    ;
update humans set
    noms=my_noms,
    prenoms=my_prenoms,
    cin=my_cin,
    cin_date=my_cin_date,
    cin_lieu=my_cin_lieu,
    naissance_date=my_naissance_date,
    naissance_lieu=my_naissance_lieu
    where uid=my_uid
    ;    
    
    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `view_all_clients`
--

/*!50001 DROP VIEW IF EXISTS `view_all_clients`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_all_clients` AS select `sub`.`uid` AS `uid`,`sub`.`type_personnality_uid` AS `type_personnality_uid`,`sub`.`adress` AS `adress`,`sub`.`nif` AS `nif`,`sub`.`stat` AS `stat`,`sub`.`rcs` AS `rcs`,`sub`.`phone1` AS `phone1`,`sub`.`phone2` AS `phone2`,`sub`.`mail1` AS `mail1`,`sub`.`mail2` AS `mail2`,`sub`.`active_tiers` AS `active_tiers`,`sub`.`note` AS `note`,`sub`.`type_vente` AS `type_vente`,`sub`.`encours` AS `encours`,`sub`.`nb_jour` AS `nb_jour`,`sub`.`evaluation` AS `evaluation`,`sub`.`declarable` AS `declarable`,`sub`.`commissionable` AS `commissionable`,`sub`.`noms` AS `noms`,`sub`.`prenoms` AS `prenoms`,`sub`.`cin` AS `cin`,`sub`.`cin_date` AS `cin_date`,`sub`.`cin_lieu` AS `cin_lieu`,`sub`.`naissance_date` AS `naissance_date`,`sub`.`naissance_lieu` AS `naissance_lieu`,`sub`.`nom_commercial` AS `nom_commercial`,`sub`.`raison_sociale` AS `raison_sociale`,`sub`.`active_client` AS `active_client` from (select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`clients`.`type_vente` AS `type_vente`,`clients`.`encours` AS `encours`,`clients`.`nb_jour` AS `nb_jour`,`clients`.`evaluation` AS `evaluation`,`clients`.`declarable` AS `declarable`,`clients`.`commissionable` AS `commissionable`,`humans`.`noms` AS `noms`,`humans`.`prenoms` AS `prenoms`,`humans`.`cin` AS `cin`,`humans`.`cin_date` AS `cin_date`,`humans`.`cin_lieu` AS `cin_lieu`,`humans`.`naissance_date` AS `naissance_date`,`humans`.`naissance_lieu` AS `naissance_lieu`,'' AS `nom_commercial`,'' AS `raison_sociale`,`clients`.`active_client` AS `active_client` from ((`tiers` join `humans` on((`tiers`.`uid` = `humans`.`uid`))) join `clients` on((`tiers`.`uid` = `clients`.`uid`))) union select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`clients`.`type_vente` AS `type_vente`,`clients`.`encours` AS `encours`,`clients`.`nb_jour` AS `nb_jour`,`clients`.`evaluation` AS `evaluation`,`clients`.`declarable` AS `declarable`,`clients`.`commissionable` AS `commissionable`,'' AS `noms`,'' AS `prenoms`,'' AS `cin`,'' AS `cin_date`,'' AS `cin_lieu`,'' AS `naissance_date`,'' AS `naissance_lieu`,`companies`.`nom_commercial` AS `nom_commercial`,`companies`.`raison_sociale` AS `raison_sociale`,`clients`.`active_client` AS `active_client` from ((`tiers` join `companies` on((`tiers`.`uid` = `companies`.`uid`))) join `clients` on((`tiers`.`uid` = `clients`.`uid`)))) `sub` order by `sub`.`uid` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_all_fournisseurs`
--

/*!50001 DROP VIEW IF EXISTS `view_all_fournisseurs`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_all_fournisseurs` AS select `sub`.`uid` AS `uid`,`sub`.`type_personnality_uid` AS `type_personnality_uid`,`sub`.`adress` AS `adress`,`sub`.`nif` AS `nif`,`sub`.`stat` AS `stat`,`sub`.`rcs` AS `rcs`,`sub`.`phone1` AS `phone1`,`sub`.`phone2` AS `phone2`,`sub`.`mail1` AS `mail1`,`sub`.`mail2` AS `mail2`,`sub`.`active_tiers` AS `active_tiers`,`sub`.`note` AS `note`,`sub`.`encours` AS `encours`,`sub`.`nb_jour` AS `nb_jour`,`sub`.`evaluation` AS `evaluation`,`sub`.`declarable` AS `declarable`,`sub`.`noms` AS `noms`,`sub`.`prenoms` AS `prenoms`,`sub`.`cin` AS `cin`,`sub`.`cin_date` AS `cin_date`,`sub`.`cin_lieu` AS `cin_lieu`,`sub`.`naissance_date` AS `naissance_date`,`sub`.`naissance_lieu` AS `naissance_lieu`,`sub`.`nom_commercial` AS `nom_commercial`,`sub`.`raison_sociale` AS `raison_sociale`,`sub`.`active_fournisseur` AS `active_fournisseur` from (select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`fournisseurs`.`encours` AS `encours`,`fournisseurs`.`nb_jour` AS `nb_jour`,`fournisseurs`.`evaluation` AS `evaluation`,`fournisseurs`.`declarable` AS `declarable`,`humans`.`noms` AS `noms`,`humans`.`prenoms` AS `prenoms`,`humans`.`cin` AS `cin`,`humans`.`cin_date` AS `cin_date`,`humans`.`cin_lieu` AS `cin_lieu`,`humans`.`naissance_date` AS `naissance_date`,`humans`.`naissance_lieu` AS `naissance_lieu`,'' AS `nom_commercial`,'' AS `raison_sociale`,`fournisseurs`.`active_fournisseur` AS `active_fournisseur` from ((`tiers` join `humans` on((`tiers`.`uid` = `humans`.`uid`))) join `fournisseurs` on((`tiers`.`uid` = `fournisseurs`.`uid`))) union select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`fournisseurs`.`encours` AS `encours`,`fournisseurs`.`nb_jour` AS `nb_jour`,`fournisseurs`.`evaluation` AS `evaluation`,`fournisseurs`.`declarable` AS `declarable`,'' AS `noms`,'' AS `prenoms`,'' AS `cin`,'' AS `cin_date`,'' AS `cin_lieu`,'' AS `naissance_date`,'' AS `naissance_lieu`,`companies`.`nom_commercial` AS `nom_commercial`,`companies`.`raison_sociale` AS `raison_sociale`,`fournisseurs`.`active_fournisseur` AS `active_fournisseur` from ((`tiers` join `companies` on((`tiers`.`uid` = `companies`.`uid`))) join `fournisseurs` on((`tiers`.`uid` = `fournisseurs`.`uid`)))) `sub` order by `sub`.`uid` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-01 21:36:47
