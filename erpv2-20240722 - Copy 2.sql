-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 22 juil. 2024 à 19:32
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

DELIMITER $$
--
-- Fonctions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `new_avoir_client` (`mycommandeuid` INT UNSIGNED, `myfactorigin` INT UNSIGNED, `mytype` TINYINT UNSIGNED, `myuseruid` INT UNSIGNED) RETURNS INT(11)  BEGIN
    declare newid int default 0;
	insert into `avoirs_client` values(null,mycommandeuid,myfactorigin,mytype,null,myuseruid);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_categorie` (`myname` VARCHAR(50) CHARSET utf8mb4, `myactif` TINYINT UNSIGNED) RETURNS INT(11)  BEGIN
    declare newid int default 0;
	insert into `categories` values(null,myname,myactif);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_client` (`type_personnality_uid` INT, `adress` VARCHAR(45), `nif` VARCHAR(45), `stat` VARCHAR(45), `rcs` VARCHAR(12), `phone1` VARCHAR(15), `phone2` VARCHAR(15), `mail1` VARCHAR(45), `mail2` VARCHAR(45), `active_client` TINYINT, `note` TINYTEXT, `nom_commercial` VARCHAR(45), `raison_social` VARCHAR(45), `noms` VARCHAR(45), `prenoms` VARCHAR(45), `cin` VARCHAR(12), `cin_date` DATE, `cin_lieu` VARCHAR(45), `naissance_date` DATE, `naissance_lieu` VARCHAR(45), `type_vente` TINYINT, `encours` DOUBLE(14,2), `nb_jour` INT, `evaluation` TINYINT, `declarable` TINYINT, `commissionable` TINYINT) RETURNS INT(11)  BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_commande` (`myclientuid` INT, `mydate` DATE, `mymagasin_uid` INT, `mylibelle` VARCHAR(45), `mystate` TINYINT UNSIGNED, `myuser_uid` INT, `mytotalhtavantremise` DOUBLE(14,2), `mytotalttcavantremise` DOUBLE(14,2), `myremisetaux` DOUBLE(14,2), `myremisemontant` DOUBLE(14,2), `mytotalhtapresremise` DOUBLE(14,2), `mytotalttcapresremise` DOUBLE(14,2)) RETURNS INT(11) DETERMINISTIC BEGIN
    declare newid int default 0;
	insert into `commandes` values(null,
myclientuid,
mydate,
mymagasin_uid,
mylibelle,
mystate,
myuser_uid,
null,
mytotalhtavantremise,
mytotalttcavantremise,
myremisetaux,
myremisemontant,
mytotalhtapresremise,
mytotalttcapresremise
);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_facture_client` (`mycommandeuid` INT UNSIGNED, `myuseruid` INT UNSIGNED) RETURNS INT(11)  BEGIN
    declare newid int default 0;
	insert into `factures_client` values(null,mycommandeuid,null,myuseruid,0);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_facture_fournisseur` (`myfounisseuruid` INT UNSIGNED, `mynumfacture` VARCHAR(50), `mydate` DATE, `mylibelle` VARCHAR(150), `mystate` TINYINT UNSIGNED, `mymagasinuid` INT UNSIGNED, `myuseruid` INT UNSIGNED, `mytvaflag` TINYINT UNSIGNED, `mytotalhtavantremise` DOUBLE(14,2), `mytotalttcavantremise` DOUBLE(14,2), `myremisetaux` DOUBLE(14,2), `myremisemontant` DOUBLE(14,2), `mytotalhtapresremise` DOUBLE(14,2), `mytvaapresremise` DOUBLE(14,2), `mytotalttcapresremise` DOUBLE(14,2)) RETURNS INT(11) UNSIGNED DETERMINISTIC BEGIN
    declare newid int default 0;
	insert into `factures_fournisseur` values(null,
myfounisseuruid,
mynumfacture,
mydate,
mylibelle,
mystate,
mymagasinuid,
myuseruid,
mytvaflag,
null,
mytotalhtavantremise,
mytotalttcavantremise,
myremisetaux,
myremisemontant,
mytotalhtapresremise,
mytvaapresremise,
mytotalttcapresremise
);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_famille` (`myname` VARCHAR(50) CHARSET utf8mb4, `myactif` TINYINT UNSIGNED) RETURNS INT(11) DETERMINISTIC BEGIN
    declare newid int default 0;
	insert into `familles` values(null,myname,myactif);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_fournisseur` (`type_personnality_uid` INT, `adress` VARCHAR(45), `nif` VARCHAR(45), `stat` VARCHAR(45), `rcs` VARCHAR(12), `phone1` VARCHAR(15), `phone2` VARCHAR(15), `mail1` VARCHAR(45), `mail2` VARCHAR(45), `active_fournisseur` TINYINT, `note` TINYTEXT, `nom_commercial` VARCHAR(45), `raison_social` VARCHAR(45), `noms` VARCHAR(45), `prenoms` VARCHAR(45), `cin` VARCHAR(12), `cin_date` DATE, `cin_lieu` VARCHAR(45), `naissance_date` DATE, `naissance_lieu` VARCHAR(45), `encours` DOUBLE(14,2), `nb_jour` INT, `evaluation` TINYINT, `declarable` TINYINT) RETURNS INT(11)  BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_item` (`myuid` INT UNSIGNED, `mycode` VARCHAR(20) CHARSET utf8mb4, `myname` VARCHAR(45) CHARSET utf8mb4, `mytype` TINYINT UNSIGNED, `mydeclarable` TINYINT UNSIGNED, `mycategoryuid` TINYINT UNSIGNED, `myfamilyuid` TINYINT UNSIGNED, `mypv` DOUBLE(14,2) UNSIGNED, `mypamp` DOUBLE(14,2), `mystockable` TINYINT UNSIGNED, `myidentifiable` TINYINT UNSIGNED, `myuniteuid` INT UNSIGNED, `myactive` TINYINT UNSIGNED, `mynote` TINYTEXT CHARSET utf8mb4, `myprixvariable` TINYINT UNSIGNED, `mypourachat` TINYINT UNSIGNED, `mypourvente` TINYINT UNSIGNED) RETURNS INT(10) UNSIGNED DETERMINISTIC BEGIN
    declare newid int default 0;
	insert into `items` values(
            null,
            mycode,
            myname,
mytype,
mydeclarable,
mycategoryuid,
myfamilyuid,
mypv,
mypamp,
mystockable,
myidentifiable,
myuniteuid,
myactive,
mynote,
myprixvariable,
0,
mypourachat,
mypourvente
);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `new_magasin` (`myname` VARCHAR(50) CHARSET utf8mb4, `myadresse` VARCHAR(45) CHARSET utf8mb4, `myphone` VARCHAR(20) CHARSET utf8mb4, `myactive` TINYINT UNSIGNED, `mynote` TINYTEXT CHARSET utf8mb4, `myuseruid` INT UNSIGNED) RETURNS INT(11) DETERMINISTIC BEGIN
    declare newid int default 0;
	insert into `magasins` values(null,myname,myadresse,myphone,myactive,mynote,myuseruid,null);
    select last_insert_id() into newid;
RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `testeur` (`name_` VARCHAR(45)) RETURNS INT(11)  BEGIN
    declare newid int default 0;
	insert into `test` values(null,name_);
    select last_insert_id() into newid;

RETURN newid;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_client` (`my_uid` INT, `my_type_personnality_uid` INT, `my_adress` VARCHAR(45), `my_nif` VARCHAR(45), `my_stat` VARCHAR(45), `my_rcs` VARCHAR(12), `my_phone1` VARCHAR(15), `my_phone2` VARCHAR(15), `my_mail1` VARCHAR(45), `my_mail2` VARCHAR(45), `my_active_` TINYINT, `my_note` TINYTEXT, `my_nom_commercial` VARCHAR(45), `my_raison_sociale` VARCHAR(45), `my_noms` VARCHAR(45), `my_prenoms` VARCHAR(45), `my_cin` VARCHAR(12), `my_cin_date` DATE, `my_cin_lieu` VARCHAR(45), `my_naissance_date` DATE, `my_naissance_lieu` VARCHAR(45), `my_type_vente` TINYINT, `my_encours` DOUBLE(14,2), `my_nb_jour` INT, `my_evaluation` TINYINT, `my_declarable` TINYINT, `my_commissionable` TINYINT) RETURNS INT(11)  BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `update_fournisseur` (`my_uid` INT, `my_type_personnality_uid` INT, `my_adress` VARCHAR(45), `my_nif` VARCHAR(45), `my_stat` VARCHAR(45), `my_rcs` VARCHAR(12), `my_phone1` VARCHAR(15), `my_phone2` VARCHAR(15), `my_mail1` VARCHAR(45), `my_mail2` VARCHAR(45), `my_active_` TINYINT, `my_note` TINYTEXT, `my_nom_commercial` VARCHAR(45), `my_raison_sociale` VARCHAR(45), `my_noms` VARCHAR(45), `my_prenoms` VARCHAR(45), `my_cin` VARCHAR(12), `my_cin_date` DATE, `my_cin_lieu` VARCHAR(45), `my_naissance_date` DATE, `my_naissance_lieu` VARCHAR(45), `my_encours` DOUBLE(14,2), `my_nb_jour` INT, `my_evaluation` TINYINT, `my_declarable` TINYINT) RETURNS INT(11)  BEGIN
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
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `affectations_achat`
--

CREATE TABLE `affectations_achat` (
  `uid` int(10) UNSIGNED NOT NULL,
  `facture_fournisseur_uid` int(10) UNSIGNED NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `arretes_banque`
--

CREATE TABLE `arretes_banque` (
  `uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `banque_uid` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `arretes_caisse`
--

CREATE TABLE `arretes_caisse` (
  `uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `caisse_uid` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `arretes_mobile_money`
--

CREATE TABLE `arretes_mobile_money` (
  `uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `operateur_uid` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `arretes_stock`
--

CREATE TABLE `arretes_stock` (
  `uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `item_uid` int(10) UNSIGNED NOT NULL,
  `magasin_uid` int(10) UNSIGNED NOT NULL,
  `quantity` double(14,2) NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `arretes_wallet_electronic`
--

CREATE TABLE `arretes_wallet_electronic` (
  `uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `wallet_electronic_uid` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `avoirs_client`
--

CREATE TABLE `avoirs_client` (
  `num_avoir` int(4) UNSIGNED ZEROFILL NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `facture_client_uid` int(10) UNSIGNED DEFAULT NULL,
  `type` tinyint(3) UNSIGNED DEFAULT 0 COMMENT '0 sans retour\r\n1 avec retour',
  `datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_uid` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avoirs_client`
--

INSERT INTO `avoirs_client` (`num_avoir`, `commande_uid`, `facture_client_uid`, `type`, `datetime`, `user_uid`) VALUES
(0004, 95, 4, 1, '2023-11-11 16:36:15', 1),
(0005, 96, 4, 1, '2023-11-11 16:36:15', 1),
(0006, 106, 8, 1, '2023-11-16 16:51:36', 1),
(0007, 107, 8, 1, '2023-11-16 16:59:39', 1),
(0008, 109, 8, 1, '2023-11-16 17:15:08', 1),
(0009, 110, 8, 1, '2023-11-16 17:22:05', 1),
(0010, 112, 8, 1, '2023-11-16 17:44:02', 1),
(0011, 113, 11, 1, '2023-11-19 09:58:12', 1),
(0012, 114, 11, 1, '2023-11-19 09:59:07', 1),
(0013, 115, 11, 1, '2023-11-19 10:00:43', 1),
(0014, 116, 11, 1, '2023-11-19 10:29:21', 1),
(0015, 117, 11, 1, '2023-11-19 10:52:01', 1),
(0016, 118, 5, 1, '2023-11-19 10:56:36', 1),
(0017, 119, 3, 1, '2023-11-19 13:09:01', 1),
(0018, 120, 8, 1, '2023-11-19 13:10:43', 1),
(0019, 121, 8, 1, '2023-11-19 14:01:16', 1),
(0020, 122, 8, 0, '2023-11-19 15:40:39', 1),
(0021, 123, 8, 0, '2023-11-19 15:45:10', 1),
(0022, 124, 11, 0, '2023-11-19 15:48:19', 1),
(0023, 0, NULL, 0, '2023-12-10 16:58:38', 1),
(0024, 127, NULL, 0, '2023-12-10 17:00:49', 1),
(0025, 128, NULL, 0, '2023-12-10 17:01:43', 1),
(0026, 129, 11, 1, '2023-12-10 17:03:08', 1),
(0027, 130, NULL, 0, '2023-12-10 17:04:18', 1),
(0028, 132, NULL, 0, '2023-12-10 17:10:38', 1),
(0029, 133, 4, 0, '2023-12-10 17:15:50', 1),
(0030, 136, 1, 0, '2023-12-10 17:32:31', 1),
(0031, 137, NULL, 0, '2023-12-10 17:33:02', 1),
(0032, 139, NULL, 0, '2023-12-10 17:41:19', 1),
(0033, 140, NULL, 0, '2023-12-10 17:43:45', 1),
(0034, 141, NULL, 0, '2023-12-10 17:44:40', 1),
(0035, 142, NULL, 0, '2023-12-10 17:45:12', 1),
(0036, 143, 5, 0, '2023-12-13 19:25:31', 1),
(0037, 195, 8, 0, '2024-02-03 17:17:39', 1),
(0038, 196, 8, 0, '2024-02-03 17:39:18', 1),
(0039, 197, 8, 0, '2024-02-03 18:35:45', 1),
(0040, 198, NULL, 0, '2024-02-04 12:37:40', 1),
(0041, 201, 8, 0, '2024-02-10 19:18:42', 1),
(0042, 204, 8, 0, '2024-02-10 19:21:37', 1),
(0043, 205, 8, 1, '2024-02-10 19:22:05', 1),
(0044, 206, 15, 1, '2024-02-10 19:24:43', 1),
(0045, 207, 20, 0, '2024-02-11 15:47:07', 1),
(0046, 209, 20, 1, '2024-02-11 15:51:09', 1),
(0047, 211, 21, 1, '2024-02-11 16:01:28', 1),
(0048, 216, 22, 1, '2024-02-11 16:18:33', 1),
(0051, 219, 22, 1, '2024-02-11 16:30:26', 1),
(0052, 220, 22, 1, '2024-02-11 16:31:19', 1),
(0053, 221, 22, 1, '2024-02-11 16:34:08', 1),
(0054, 223, 23, 1, '2024-02-14 19:10:20', 1),
(0055, 226, 23, 0, '2024-02-14 19:23:28', 1),
(0056, 230, 26, 0, '2024-05-03 18:52:50', 1),
(0057, 231, 19, 1, '2024-05-04 11:43:21', 1);

-- --------------------------------------------------------

--
-- Structure de la table `avoirs_client_details`
--

CREATE TABLE `avoirs_client_details` (
  `uid` int(10) UNSIGNED NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `item_uid` varchar(20) NOT NULL,
  `description_item` tinytext DEFAULT NULL,
  `quantity` double(14,2) UNSIGNED NOT NULL,
  `prix_unitaire` double(14,2) UNSIGNED NOT NULL,
  `prix_total` double(14,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `banques`
--

CREATE TABLE `banques` (
  `uid` int(10) UNSIGNED NOT NULL,
  `rib` varchar(45) NOT NULL,
  `agence` varchar(45) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `devise_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bons_entree`
--

CREATE TABLE `bons_entree` (
  `uid` int(10) UNSIGNED NOT NULL,
  `sender_uid` int(10) UNSIGNED NOT NULL,
  `magasin_uid` int(10) UNSIGNED NOT NULL,
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bons_sortie`
--

CREATE TABLE `bons_sortie` (
  `uid` int(10) UNSIGNED NOT NULL,
  `receiver_uid` int(10) UNSIGNED NOT NULL,
  `magasin_uid` int(10) UNSIGNED NOT NULL,
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `caisses`
--

CREATE TABLE `caisses` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(35) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`uid`, `name`, `active`) VALUES
(1, 'biscuit', 1),
(2, 'gateau', 1),
(3, 'testé', 1),
(4, 'produit laitier', 1),
(5, 'boission hygiènique', 1),
(6, 'chocolat', 1),
(7, 'patisserie', 1),
(8, 'da001', 1),
(9, 'test 002', 1),
(11, 'durable', 1),
(12, 'reusable', 1),
(13, 'sur mesure', 1);

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `uid` int(10) UNSIGNED NOT NULL,
  `type_vente` tinyint(3) UNSIGNED NOT NULL,
  `encours` double(14,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `nb_jour` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `evaluation` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `declarable` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `commissionable` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `active_client` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`uid`, `type_vente`, `encours`, `nb_jour`, `evaluation`, `declarable`, `commissionable`, `active_client`) VALUES
(5, 0, 0.00, 0, 2, 0, 0, 1),
(6, 1, 55000000.00, 0, 2, 1, 0, 1),
(7, 0, 0.00, 0, 2, 1, 0, 1),
(11, 1, 5000000.00, 1, 2, 1, 1, 1),
(12, 1, 0.00, 0, 2, 1, 0, 0),
(13, 1, 1500000.00, 0, 2, 1, 0, 1),
(14, 1, 0.00, 0, 2, 1, 0, 1),
(15, 0, 0.00, 0, 2, 1, 0, 1),
(16, 0, 0.00, 0, 2, 1, 0, 1),
(17, 1, 1200000.00, 0, 2, 1, 0, 1),
(18, 1, 130000.00, 0, 2, 1, 0, 1),
(19, 1, 100000.00, 0, 2, 1, 0, 1),
(20, 1, 0.00, 0, 2, 1, 0, 1),
(21, 1, 0.00, 0, 2, 1, 0, 1),
(22, 1, 0.00, 0, 2, 1, 0, 1),
(23, 1, 0.00, 0, 2, 1, 0, 1),
(24, 1, 0.00, 0, 2, 1, 0, 1),
(25, 1, 0.00, 0, 2, 1, 0, 1),
(26, 0, 500000.00, 0, 2, 1, 0, 1),
(27, 1, 1500000.00, 1, 2, 0, 0, 1),
(28, 0, 0.00, 0, 2, 1, 1, 1),
(29, 1, 1.00, 1, 2, 1, 1, 1),
(30, 0, 0.00, 0, 2, 1, 1, 1),
(31, 1, 0.00, 0, 2, 1, 0, 1),
(32, 1, 0.00, 0, 2, 1, 0, 1),
(33, 0, 0.00, 0, 2, 1, 0, 0),
(34, 0, 0.00, 0, 2, 1, 0, 0),
(35, 1, 0.00, 0, 2, 1, 0, 0),
(36, 1, 1.00, 1, 2, 1, 0, 0),
(37, 1, 0.00, 0, 2, 1, 0, 1),
(38, 1, 0.00, 0, 2, 1, 0, 1),
(39, 1, 0.00, 0, 2, 1, 0, 0),
(40, 0, 0.00, 0, 2, 1, 0, 1),
(41, 0, 1.00, 1, 2, 1, 0, 1),
(42, 1, 1.00, 1, 2, 1, 0, 0),
(43, 1, 1.00, 1, 2, 1, 0, 1),
(44, 0, 0.00, 0, 2, 1, 0, 1),
(45, 1, 1.00, 1, 2, 1, 0, 1),
(46, 1, 1.00, 1, 2, 1, 0, 1),
(47, 1, 1.00, 1, 2, 1, 0, 1),
(48, 0, 0.00, 0, 2, 1, 0, 1),
(49, 0, 0.00, 0, 2, 1, 0, 1),
(50, 0, 0.00, 0, 2, 1, 0, 1),
(51, 0, 0.00, 0, 2, 1, 0, 1),
(52, 0, 0.00, 0, 2, 1, 0, 1),
(53, 1, 0.00, 0, 2, 1, 0, 1),
(54, 0, 0.00, 0, 2, 1, 0, 1),
(55, 0, 10000000.00, 0, 2, 1, 0, 1),
(56, 0, 0.00, 0, 2, 1, 0, 1),
(57, 0, 0.00, 0, 2, 1, 0, 1),
(58, 0, 0.00, 0, 2, 1, 0, 1),
(78, 0, 0.00, 0, 2, 1, 0, 1),
(79, 0, 0.00, 0, 0, 1, 0, 1),
(80, 0, 0.00, 0, 0, 1, 0, 1),
(81, 0, 0.00, 0, 0, 1, 0, 1),
(82, 0, 0.00, 0, 0, 1, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `uid` int(10) UNSIGNED NOT NULL,
  `client_uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `magasin_uid` int(10) UNSIGNED NOT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `state` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '0:canceled client;1:en cours client;2:valide client;3:avoir client;4 facture fournisseur;5 avoir fournisseur',
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_ht_avant_remise` double(14,2) NOT NULL,
  `total_ttc_avant_remise` double(14,2) NOT NULL,
  `remise_taux` double(14,2) NOT NULL,
  `remise_montant` double(14,2) NOT NULL,
  `total_ht_apres_remise` double(14,2) NOT NULL,
  `total_ttc_apres_remise` double(14,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`uid`, `client_uid`, `date`, `magasin_uid`, `libelle`, `state`, `user_uid`, `datetime`, `total_ht_avant_remise`, `total_ttc_avant_remise`, `remise_taux`, `remise_montant`, `total_ht_apres_remise`, `total_ttc_apres_remise`) VALUES
(16, 13, '2023-04-23', 1, 'test 103 all', 2, 1, '2023-04-23 18:39:38', 297000.00, 356400.00, 5.00, 17820.00, 282150.00, 338580.00),
(20, 13, '2023-04-23', 1, 'test 106 all', 2, 1, '2023-04-23 18:56:21', 99500.00, 119400.00, 5.00, 5970.00, 94525.00, 113430.00),
(21, 17, '2023-04-24', 1, 'test update', 2, 1, '2023-04-24 18:53:31', 50000.00, 60000.00, 10.00, 6000.00, 45000.00, 54000.00),
(22, 17, '2023-04-24', 1, 'update 2', 1, 1, '2023-04-24 18:55:00', 124000.00, 148800.00, 12.00, 17856.00, 109120.00, 130944.00),
(23, 55, '2023-04-24', 1, 'rerere', 1, 1, '2023-04-24 19:04:38', 25000.00, 30000.00, 0.00, 0.00, 25000.00, 30000.00),
(24, 31, '2023-04-24', 1, 'update up', 1, 1, '2023-04-24 19:14:42', 99000.00, 118800.00, 5.00, 5940.00, 94050.00, 112860.00),
(25, 41, '2023-04-24', 1, 'soso', 1, 1, '2023-04-24 19:20:29', 25000.00, 30000.00, 10.00, 3000.00, 22500.00, 27000.00),
(26, 41, '2023-04-24', 1, 'so2', 2, 1, '2023-04-24 19:22:34', 25000.00, 30000.00, 0.00, 0.00, 25000.00, 30000.00),
(27, 40, '2023-05-01', 1, 're', 2, 1, '2023-05-01 11:33:08', 99000.00, 118800.00, 15.82, 18794.16, 83338.20, 100005.84),
(28, 40, '2023-05-01', 1, 'rere', 2, 1, '2023-05-01 11:33:48', 273000.00, 327600.00, 0.00, 0.00, 273000.00, 327600.00),
(29, 41, '2023-05-01', 1, 'tree', 2, 1, '2023-05-01 11:34:33', 99000.00, 118800.00, 0.00, 0.00, 99000.00, 118800.00),
(30, 11, '2023-05-01', 1, 'yy', 2, 1, '2023-05-01 11:36:46', 124000.00, 148800.00, 0.00, 0.00, 124000.00, 148800.00),
(31, 11, '2023-05-01', 1, 'reer', 2, 1, '2023-05-01 11:38:07', 25000.00, 30000.00, 0.00, 0.00, 25000.00, 30000.00),
(32, 40, '2023-05-01', 1, 'sdf', 2, 1, '2023-05-01 11:39:55', 99000.00, 118800.00, 0.00, 0.00, 99000.00, 118800.00),
(33, 41, '2023-05-17', 1, 'test 500k', 1, 1, '2023-05-17 18:55:40', 25000.00, 30000.00, 1.96, 588.00, 24510.00, 29412.00),
(34, 15, '2023-05-17', 1, 'test 100k', 2, 1, '2023-05-17 19:00:15', 25000.00, 30000.00, 16.67, 5001.00, 20832.50, 24999.00),
(35, 27, '2023-05-17', 1, 'test 1485', 1, 1, '2023-05-17 19:18:41', 124000.00, 148800.00, 0.00, 0.00, 124000.00, 148800.00),
(36, 11, '2023-05-17', 1, 'test 511', 1, 1, '2023-05-17 19:26:25', 426000.00, 511200.00, 0.04, 200.00, 425833.33, 511000.00),
(37, 11, '2023-05-17', 1, 'test items', 2, 1, '2023-05-17 19:29:45', 130000.00, 156000.00, 0.00, 0.00, 130000.00, 156000.00),
(38, 5, '2023-05-17', 1, NULL, 2, 1, '2023-05-17 19:35:34', 2500.00, 3000.00, 0.00, 0.00, 2500.00, 3000.00),
(39, 43, '2023-05-17', 1, 'test 12.5', 2, 1, '2023-05-17 19:36:25', 12500.00, 15000.00, 0.00, 0.00, 12500.00, 15000.00),
(42, 40, '2023-05-21', 1, 'ant', 1, 1, '2023-05-21 16:10:01', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 600000.00),
(43, 11, '2023-05-27', 1, 'test validation 01', 2, 1, '2023-05-27 12:02:34', 625000.00, 750000.00, 6.67, 50000.00, 583333.33, 700000.00),
(44, 11, '2023-05-27', 1, 'validation test 02', 1, 1, '2023-05-27 12:05:25', 1000000.00, 1200000.00, 10.00, 120000.00, 900000.00, 1080000.00),
(45, 11, '2023-05-27', 1, 'validation test 03', 1, 1, '2023-05-27 12:07:05', 1500000.00, 1800000.00, 10.00, 180000.00, 1350000.00, 1620000.00),
(46, 11, '2023-05-27', 1, 'valid test 04', 1, 1, '2023-05-27 12:09:10', 1000000.00, 1200000.00, 5.00, 60000.00, 950000.00, 1140000.00),
(47, 11, '2023-05-27', 1, 'valid 06', 2, 1, '2023-05-27 12:10:34', 575000.00, 690000.00, 5.00, 34500.00, 546250.00, 655500.00),
(48, 13, '2023-05-27', 1, 're test', 2, 1, '2023-05-27 12:12:01', 7500.00, 9000.00, 0.00, 0.00, 7500.00, 9000.00),
(49, 7, '2023-05-27', 1, 'be', 2, 1, '2023-05-27 12:14:47', 5000.00, 6000.00, 0.00, 0.00, 5000.00, 6000.00),
(50, 7, '2023-05-27', 1, 'get', 1, 1, '2023-05-27 12:17:18', 4500.00, 5400.00, 0.00, 0.00, 4500.00, 5400.00),
(51, 43, '2023-05-27', 1, 're', 2, 1, '2023-05-27 12:19:24', 2500.00, 3000.00, 0.00, 0.00, 2500.00, 3000.00),
(61, 41, '2023-06-17', 1, 't2', 1, 1, '2023-06-17 17:20:40', 125000.00, 150000.00, 16.67, 25000.00, 104166.67, 125000.00),
(62, 41, '2023-06-17', 1, 't52', 1, 1, '2023-06-17 17:21:14', 100000.00, 120000.00, 16.67, 20000.00, 83333.33, 100000.00),
(63, 11, '2023-06-17', 1, 't53', 2, 1, '2023-06-17 17:22:27', 990000.00, 1188000.00, 10.00, 118800.00, 891000.00, 1069200.00),
(64, 37, '2023-08-20', 1, 'fact', 1, 1, '2023-08-20 13:52:46', 176500.00, 211800.00, 0.85, 1800.00, 175000.00, 210000.00),
(65, 37, '2023-08-20', 1, 'fact', 1, 1, '2023-08-20 13:57:29', 75000.00, 90000.00, 0.00, 0.00, 75000.00, 90000.00),
(66, 37, '2023-08-20', 1, 'test new', 2, 1, '2023-08-20 15:23:13', 1000.00, 1200.00, 0.00, 0.00, 1000.00, 1200.00),
(69, 82, '2023-08-20', 1, 'test new 100', 2, 1, '2023-08-20 15:28:30', 275000.00, 330000.00, 50.00, 165000.00, 137500.00, 165000.00),
(70, 40, '2023-08-20', 1, 'new 5650', 2, 1, '2023-08-20 15:34:09', 1500.00, 1800.00, 0.00, 0.00, 1500.00, 1800.00),
(72, 13, '2023-08-20', 1, 'retest new', 2, 1, '2023-08-20 15:41:45', 99000.00, 118800.00, 0.67, 800.00, 98333.33, 118000.00),
(73, 18, '2023-08-20', 1, 'restest2', 2, 1, '2023-08-20 15:43:36', 1980000.00, 2376000.00, 5.00, 118800.00, 1881000.00, 2257200.00),
(74, 40, '2023-08-20', 1, 'fact new', 2, 1, '2023-08-20 15:48:29', 2000.00, 2400.00, 0.00, 0.00, 2000.00, 2400.00),
(75, 15, '2023-08-20', 1, 'fs', 2, 1, '2023-08-20 16:00:04', 500.00, 600.00, 0.00, 0.00, 500.00, 600.00),
(76, 15, '2023-08-20', 1, 'zeropad', 2, 1, '2023-08-20 16:09:04', 6000.00, 7200.00, 0.00, 0.00, 6000.00, 7200.00),
(81, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 15:07:53', 0.00, 25500.00, 0.00, 0.00, 25500.00, 25500.00),
(83, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 15:09:21', 0.00, 25500.00, 0.00, 0.00, 25500.00, 25500.00),
(91, 11, '2023-11-11', 1, NULL, 1, 1, '2023-11-11 15:29:22', 0.00, 25500.00, 0.00, 0.00, 25500.00, 25500.00),
(95, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 15:37:03', 0.00, 25500.00, 0.00, 0.00, 25500.00, 25500.00),
(96, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 15:38:03', 0.00, 25500.00, 0.00, 0.00, 25500.00, 25500.00),
(100, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 16:10:02', 0.00, 500.00, 0.00, 0.00, 500.00, 500.00),
(104, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 16:28:14', 0.00, 500.00, 0.00, 0.00, 500.00, 500.00),
(105, 11, '2023-11-11', 1, NULL, 3, 1, '2023-11-11 16:29:58', 0.00, 500.00, 0.00, 0.00, 500.00, 500.00),
(106, 18, '2023-11-16', 1, NULL, 3, 1, '2023-11-16 16:51:36', 0.00, 198000.00, 5.00, 11880.00, 198000.00, 198000.00),
(107, 18, '2023-11-16', 1, NULL, 3, 1, '2023-11-16 16:59:39', 0.00, 0.00, 5.00, 11880.00, 0.00, 0.00),
(109, 18, '2023-11-16', 1, NULL, 3, 1, '2023-11-16 17:15:08', 0.00, 0.00, 5.00, 5940.00, 0.00, 0.00),
(110, 18, '2023-11-16', 1, NULL, 3, 1, '2023-11-16 17:22:05', 99000.00, 118800.00, 5.00, 5940.00, 94050.00, 112860.00),
(112, 18, '2023-11-16', 1, NULL, 3, 1, '2023-11-16 17:44:02', -198000.00, -237600.00, 5.00, 11880.00, -188100.00, -225720.00),
(113, 15, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 09:58:12', -500.00, -600.00, 0.00, 0.00, -500.00, -600.00),
(114, 15, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 09:59:07', -1000.00, -1200.00, 0.00, 0.00, -1000.00, -1200.00),
(115, 15, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 10:00:43', -500.00, -600.00, 0.00, 0.00, -500.00, -600.00),
(116, 15, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 10:29:21', -500.00, -600.00, 0.00, 0.00, -500.00, -600.00),
(117, 15, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 10:52:01', -500.00, -600.00, 0.00, 0.00, -500.00, -600.00),
(118, 7, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 10:56:36', -500.00, -600.00, 0.00, 0.00, -500.00, -600.00),
(119, 40, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 13:09:01', -25000.00, -30000.00, 0.00, 0.00, -25000.00, -30000.00),
(120, 18, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 13:10:43', -99000.00, -118800.00, 5.00, 5940.00, -94050.00, -112860.00),
(121, 18, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 14:01:16', -99000.00, -118800.00, 5.00, 5940.00, -94050.00, -112860.00),
(122, 18, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 15:40:39', -198000.00, -237600.00, 5.00, -11880.00, -188100.00, -225720.00),
(123, 18, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 15:45:10', -99000.00, -118800.00, 5.00, -5940.00, -94050.00, -112860.00),
(124, 15, '2023-11-19', 1, NULL, 3, 1, '2023-11-19 15:48:19', -1000.00, -1200.00, 0.00, 0.00, -1000.00, -1200.00),
(136, 11, '2023-12-10', 1, NULL, 3, 1, '2023-12-10 17:32:31', -50000.00, -60000.00, 6.67, -4002.00, -46665.00, -55998.00),
(139, 11, '2023-12-10', 1, NULL, 3, 1, '2023-12-10 17:41:19', -56000.00, -67200.00, 0.00, 0.00, -56000.00, -67200.00),
(140, 13, '2023-12-10', 1, NULL, 3, 1, '2023-12-10 17:43:45', -1000.00, -1200.00, 0.00, 0.00, -1000.00, -1200.00),
(141, 11, '2023-12-10', 1, NULL, 3, 1, '2023-12-10 17:44:40', -2000.00, -2400.00, 0.00, 0.00, -2000.00, -2400.00),
(142, 11, '2023-12-10', 1, NULL, 3, 1, '2023-12-10 17:45:12', -1000.00, -1200.00, 0.00, 0.00, -1000.00, -1200.00),
(143, 7, '2023-12-13', 1, NULL, 3, 1, '2023-12-13 19:25:31', -500.00, -600.00, 0.00, 0.00, -500.00, -600.00),
(144, 21, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 17:40:09', 1099000.00, 1318800.00, 0.00, 0.00, 1099000.00, 1318800.00),
(145, 46, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 17:43:53', 1500000.00, 1800000.00, 0.00, 0.00, 1500000.00, 1800000.00),
(147, 22, '2023-12-19', 1, 'test new', 0, 1, '2023-12-19 17:56:33', 1500000.00, 1800000.00, 0.00, 0.00, 1500000.00, 1800000.00),
(148, 7, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 17:58:59', 396000.00, 475200.00, 0.00, 0.00, 396000.00, 475200.00),
(149, 11, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 17:59:20', 198000.00, 237600.00, 0.00, 0.00, 198000.00, 237600.00),
(150, 58, '2023-12-19', 1, 'test new', 0, 1, '2023-12-19 18:03:12', 3000000.00, 3600000.00, 0.00, 0.00, 3000000.00, 3600000.00),
(151, 78, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 18:07:12', 9000.00, 10800.00, 0.00, 0.00, 9000.00, 10800.00),
(152, 37, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 18:08:25', 594000.00, 712800.00, 0.00, 0.00, 594000.00, 712800.00),
(153, 40, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 18:09:14', 1500000.00, 1800000.00, 0.00, 0.00, 1500000.00, 1800000.00),
(154, 78, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 18:10:38', 3000000.00, 3600000.00, 0.00, 0.00, 3000000.00, 3600000.00),
(155, 55, '2023-12-19', 1, NULL, 0, 1, '2023-12-19 18:12:14', 2000000.00, 2400000.00, 0.00, 0.00, 2000000.00, 2400000.00),
(156, 14, '2023-12-20', 1, 'test variable prix', 0, 1, '2023-12-20 17:00:10', 1325000.00, 1590000.00, 0.00, 0.00, 1325000.00, 1590000.00),
(157, 5, '2023-12-20', 1, NULL, 0, 1, '2023-12-20 17:35:16', 333000.00, 399600.00, 0.00, 0.00, 333000.00, 399600.00),
(158, 5, '2023-12-20', 1, NULL, 0, 1, '2023-12-20 18:24:56', 800000.00, 960000.00, 0.00, 0.00, 800000.00, 960000.00),
(159, 37, '2023-12-20', 1, NULL, 0, 1, '2023-12-20 18:33:09', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 600000.00),
(160, 11, '2023-12-20', 1, 'test variable big state proble', 1, 1, '2023-12-20 18:59:10', 6066004.00, 7279204.80, 0.00, 0.00, 6066004.00, 7279204.80),
(178, 5, '2024-01-26', 1, NULL, 1, 1, '2024-01-26 19:02:10', 4500000.00, 5400000.00, 0.00, 0.00, 4500000.00, 5400000.00),
(179, 37, '2024-01-26', 1, NULL, 1, 1, '2024-01-26 19:55:17', 198000.00, 237600.00, 0.00, 0.00, 198000.00, 237600.00),
(180, 28, '2024-01-26', 1, NULL, 1, 1, '2024-01-26 19:56:17', 4500.00, 5400.00, 0.00, 0.00, 4500.00, 5400.00),
(181, 5, '2024-01-27', 1, NULL, 1, 1, '2024-01-27 11:34:57', 560000.00, 672000.00, 0.00, 0.00, 560000.00, 672000.00),
(182, 5, '2024-01-27', 1, NULL, 1, 1, '2024-01-27 11:42:15', 560000.00, 672000.00, 0.00, 0.00, 560000.00, 672000.00),
(183, 27, '2024-01-27', 1, NULL, 1, 1, '2024-01-27 11:43:42', 1120000.00, 1344000.00, 0.00, 0.00, 1120000.00, 1344000.00),
(184, 14, '2024-01-27', 1, NULL, 1, 1, '2024-01-27 11:49:38', 1120000.00, 1344000.00, 0.00, 0.00, 1120000.00, 1344000.00),
(185, 13, '2024-01-27', 1, NULL, 1, 1, '2024-01-27 12:50:07', 1121500.00, 1345800.00, 0.00, 0.00, 1121500.00, 1345800.00),
(187, 14, '2024-01-28', 1, NULL, 2, 1, '2024-01-28 13:08:15', 50000.00, 60000.00, 0.00, 0.00, 50000.00, 60000.00),
(189, 56, '2024-01-28', 1, NULL, 2, 1, '2024-01-28 13:16:24', 50000.00, 60000.00, 0.00, 0.00, 50000.00, 60000.00),
(191, 31, '2024-01-28', 1, NULL, 1, 1, '2024-01-28 13:32:25', 50000.00, 60000.00, 0.00, 0.00, 50000.00, 60000.00),
(192, 47, '2024-01-28', 1, 'test qty update', 2, 1, '2024-01-28 13:36:22', 51000.00, 61200.00, 0.00, 0.00, 51000.00, 61200.00),
(193, 14, '2024-01-30', 1, NULL, 1, 1, '2024-01-30 17:26:43', 1120000.00, 1344000.00, 0.00, 0.00, 1120000.00, 1344000.00),
(194, 14, '2024-01-30', 1, NULL, 2, 1, '2024-01-30 17:58:08', 1120000.00, 1344000.00, 0.00, 0.00, 1120000.00, 1344000.00),
(197, 18, '2024-02-03', 1, NULL, 3, 1, '2024-02-03 18:35:45', -99000.00, -118800.00, 5.00, -5940.00, -94050.00, -112860.00),
(198, 11, '2024-02-04', 1, NULL, 3, 1, '2024-02-04 12:37:40', -50000.00, -60000.00, 0.00, 0.00, -50000.00, -60000.00),
(201, 18, '2024-02-10', 1, NULL, 3, 1, '2024-02-10 19:18:22', -198.00, -237.00, 5.00, -11.00, -188.00, -225.00),
(204, 18, '2024-02-10', 1, NULL, 3, 1, '2024-02-10 19:21:37', -198.00, -237.00, 5.00, -11.00, -188.00, -225.00),
(205, 18, '2024-02-10', 1, NULL, 3, 1, '2024-02-10 19:22:05', -198.00, -237.00, 5.00, -11.00, -188.00, -225.00),
(206, 14, '2024-02-10', 1, NULL, 3, 1, '2024-02-10 19:24:43', -50.00, -60.00, 0.00, 0.00, -50.00, -60.00),
(207, 14, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 15:47:07', -560.00, -672.00, 0.00, 0.00, -560.00, -672.00),
(209, 14, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 15:51:09', -560.00, -672.00, 0.00, 0.00, -560.00, -672.00),
(210, 14, '2024-02-11', 1, 'guinea pig for avoir return active', 2, 1, '2024-02-11 15:53:56', 1680000.00, 2016000.00, 5.00, 100800.00, 1596000.00, 1915200.00),
(211, 14, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:01:28', -1.00, -1.00, 5.00, -67.00, -1.00, -1.00),
(215, 55, '2024-02-11', 1, NULL, 2, 1, '2024-02-11 16:16:57', 1680000.00, 2016000.00, 10.00, 201600.00, 1512000.00, 1814400.00),
(216, 55, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:18:33', -560.00, -672.00, 10.00, -67.00, -504.00, -604.00),
(217, 55, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:20:22', -1.00, -1.00, 10.00, -134.00, -1.00, -1.00),
(218, 55, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:24:13', -1.00, -1.00, 10.00, -134.00, -1.00, -1.00),
(219, 55, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:30:26', -1.00, -1.00, 10.00, -134.00, -1.00, -1.00),
(220, 55, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:31:19', -1.00, -1.00, 10.00, -134.00, -1.00, -1.00),
(221, 55, '2024-02-11', 1, NULL, 3, 1, '2024-02-11 16:34:08', -1.00, -1.00, 10.00, -134.00, -1.00, -1.00),
(222, 19, '2024-02-14', 1, NULL, 2, 1, '2024-02-14 19:09:40', 2500000.00, 3000000.00, 0.00, 0.00, 2500000.00, 3000000.00),
(223, 19, '2024-02-14', 1, NULL, 3, 1, '2024-02-14 19:10:20', -1.00, -1.00, 0.00, 0.00, -1.00, -1.00),
(226, 19, '2024-02-14', 1, NULL, 3, 1, '2024-02-14 19:23:16', -500000.00, -600000.00, 0.00, 0.00, -500000.00, -600000.00),
(227, 5, '2024-05-01', 2, NULL, 2, 1, '2024-05-01 11:51:20', 175000.00, 210000.00, 5.00, 10500.00, 166250.00, 199500.00),
(228, 78, '2024-05-01', 2, 'test 2024', 2, 1, '2024-05-01 11:58:56', 3000.00, 3600.00, 0.00, 0.00, 3000.00, 3600.00),
(229, 14, '2024-05-03', 1, NULL, 2, 1, '2024-05-03 18:34:29', 560000.00, 672000.00, 0.00, 0.00, 560000.00, 672000.00),
(230, 14, '2024-05-03', 1, NULL, 3, 1, '2024-05-03 18:52:50', -560000.00, -672000.00, 0.00, 0.00, -560000.00, -672000.00),
(231, 47, '2024-05-04', 1, NULL, 3, 1, '2024-05-04 11:43:21', -25500.00, -30600.00, 0.00, 0.00, -25500.00, -30600.00),
(233, 55, '2024-05-07', 1, NULL, 1, 1, '2024-05-07 19:54:02', 7000.00, 8400.00, 0.00, 0.00, 7000.00, 8400.00),
(234, 21, '2024-05-07', 1, NULL, 1, 1, '2024-05-07 19:57:50', 76000.00, 91200.00, 0.00, 0.00, 76000.00, 91200.00),
(235, 47, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 14:33:22', 25000000.00, 30000000.00, 0.00, 0.00, 25000000.00, 30000000.00),
(236, 47, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 14:42:02', 30000000.00, 36000000.00, 0.00, 0.00, 30000000.00, 36000000.00),
(237, 47, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 14:44:25', 30000000.00, 36000000.00, 0.00, 0.00, 30000000.00, 36000000.00),
(238, 14, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:08:43', 2250000.00, 2700000.00, 0.00, 0.00, 2250000.00, 2700000.00),
(239, 37, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:09:44', 5000000.00, 6000000.00, 0.00, 0.00, 5000000.00, 6000000.00),
(240, 37, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:10:33', 15000000.00, 18000000.00, 0.00, 0.00, 15000000.00, 18000000.00),
(241, 52, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:13:13', 15000000.00, 18000000.00, 0.00, 0.00, 15000000.00, 18000000.00),
(242, 52, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:14:43', 20000000.00, 24000000.00, 0.00, 0.00, 20000000.00, 24000000.00),
(243, 7, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:18:48', 350000.00, 420000.00, 0.00, 0.00, 350000.00, 420000.00),
(244, 49, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:23:13', 22500000.00, 27000000.00, 0.00, 0.00, 22500000.00, 27000000.00),
(245, 49, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:25:59', 55000.00, 66000.00, 0.00, 0.00, 55000.00, 66000.00),
(246, 50, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:27:38', 90000.00, 108000.00, 0.00, 0.00, 90000.00, 108000.00),
(247, 50, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:30:47', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 600000.00),
(248, 48, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:32:54', 100000.00, 120000.00, 0.00, 0.00, 100000.00, 120000.00),
(249, 5, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:37:26', 300000.00, 360000.00, 0.00, 0.00, 300000.00, 360000.00),
(250, 48, '2024-05-08', 1, NULL, 1, 1, '2024-05-08 16:41:09', 196020.00, 235224.00, 0.00, 0.00, 196020.00, 235224.00),
(251, 48, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:41:09', 196020.00, 235224.00, 0.00, 0.00, 196020.00, 235224.00),
(252, 48, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:41:09', 196020.00, 235224.00, 0.00, 0.00, 196020.00, 235224.00),
(253, 48, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:44:06', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 600000.00),
(254, 48, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:45:09', 750000.00, 900000.00, 0.00, 0.00, 750000.00, 900000.00),
(255, 49, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:46:01', 54350.00, 65220.00, 0.00, 0.00, 54350.00, 65220.00),
(256, 49, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:48:54', 175000.00, 210000.00, 0.00, 0.00, 175000.00, 210000.00),
(257, 5, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:51:13', 500000000.00, 600000000.00, 0.00, 0.00, 500000000.00, 600000000.00),
(258, 41, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:51:52', 30000.00, 36000.00, 0.00, 0.00, 30000.00, 36000.00),
(259, 17, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:54:09', 750000.00, 900000.00, 0.00, 0.00, 750000.00, 900000.00),
(260, 13, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:54:43', 26565.00, 31878.00, 0.00, 0.00, 26565.00, 31878.00),
(261, 21, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:56:00', 20000.00, 24000.00, 0.00, 0.00, 20000.00, 24000.00),
(262, 5, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:57:31', 581770.00, 698124.00, 0.00, 0.00, 581770.00, 698124.00),
(263, 51, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 16:58:14', 234550.00, 281460.00, 0.00, 0.00, 234550.00, 281460.00),
(264, 7, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 17:00:36', 150000000.00, 180000000.00, 0.00, 0.00, 150000000.00, 180000000.00),
(265, 41, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 17:08:27', 30000.00, 36000.00, 0.00, 0.00, 30000.00, 36000.00),
(266, 40, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 17:09:30', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 600000.00),
(267, 41, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 17:11:37', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 600000.00),
(268, 41, '2024-05-08', 1, NULL, 2, 1, '2024-05-08 17:15:42', 50000.00, 60000.00, 0.00, 0.00, 50000.00, 60000.00),
(269, 6, '2024-05-09', 1, NULL, 1, 1, '2024-05-09 10:31:02', 50000.00, 60000.00, 0.00, 0.00, 50000.00, 60000.00),
(270, 41, '2024-05-09', 1, NULL, 2, 1, '2024-05-09 10:31:43', 60000.00, 72000.00, 0.00, 0.00, 60000.00, 72000.00);

-- --------------------------------------------------------

--
-- Structure de la table `commandes_details`
--

CREATE TABLE `commandes_details` (
  `uid` int(10) UNSIGNED NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `item_uid` varchar(20) NOT NULL,
  `description_item` tinytext DEFAULT NULL,
  `quantity` double(14,2) NOT NULL,
  `prix_unitaire` double(14,2) UNSIGNED NOT NULL,
  `prix_total` double(14,2) NOT NULL,
  `commande_initial_uid` int(10) UNSIGNED DEFAULT NULL,
  `num_serie` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes_details`
--

INSERT INTO `commandes_details` (`uid`, `commande_uid`, `item_uid`, `description_item`, `quantity`, `prix_unitaire`, `prix_total`, `commande_initial_uid`, `num_serie`) VALUES
(9, 16, 'vet056', '', 3.00, 99000.00, 297000.00, NULL, NULL),
(11, 20, 'vet056', 'test 106 all', 1.00, 99000.00, 99000.00, NULL, NULL),
(12, 20, 'styetisth459', 'test 106 all', 1.00, 500.00, 500.00, NULL, NULL),
(13, 21, '0654ste8', '', 2.00, 25000.00, 50000.00, NULL, NULL),
(14, 22, 'vet056', '', 1.00, 99000.00, 99000.00, NULL, NULL),
(15, 23, '0654ste8', 'reste', 1.00, 25000.00, 25000.00, NULL, NULL),
(16, 24, 'vet056', 'upup', 1.00, 99000.00, 99000.00, NULL, NULL),
(17, 25, '0654ste8', 'sophie', 1.00, 25000.00, 25000.00, NULL, NULL),
(18, 26, '0654ste8', 'soso', 1.00, 25000.00, 25000.00, NULL, NULL),
(19, 27, 'vet056', '', 1.00, 99000.00, 99000.00, NULL, NULL),
(20, 28, 'vet056', 'reer', 2.00, 99000.00, 198000.00, NULL, NULL),
(21, 29, 'vet056', 'tree', 1.00, 99000.00, 99000.00, NULL, NULL),
(22, 30, '0654ste8', 'yy', 1.00, 25000.00, 25000.00, NULL, NULL),
(23, 30, 'vet056', 'yyy', 1.00, 99000.00, 99000.00, NULL, NULL),
(24, 31, '0654ste8', 'gzertt', 1.00, 25000.00, 25000.00, NULL, NULL),
(25, 32, 'vet056', 'sdf', 1.00, 99000.00, 99000.00, NULL, NULL),
(26, 33, '0654ste8', '', 17.00, 25000.00, 425000.00, NULL, NULL),
(27, 34, '0654ste8', '', 1.00, 25000.00, 25000.00, NULL, NULL),
(28, 35, '0654ste8', '', 1.00, 25000.00, 25.00, NULL, NULL),
(29, 35, 'vet056', '', 1.00, 99000.00, 99.00, NULL, NULL),
(30, 36, 'vet056', '', 4.00, 99000.00, 396.00, NULL, NULL),
(31, 36, '0654ste8', '', 1.00, 25000.00, 25.00, NULL, NULL),
(32, 36, 'styetisth459', '', 10.00, 500.00, 5.00, NULL, NULL),
(33, 37, '0654ste8', '', 5.00, 25000.00, 125000.00, NULL, NULL),
(34, 37, 'styetisth459', '', 10.00, 500.00, 5000.00, NULL, NULL),
(35, 38, 'styetisth459', '', 5.00, 500.00, 2500.00, NULL, NULL),
(36, 39, 'styetisth459', '', 25.00, 500.00, 12500.00, NULL, NULL),
(38, 42, 'toy015648', '', 1.00, 500000.00, 500000.00, NULL, NULL),
(39, 43, '0654ste8', '', 25.00, 25000.00, 625000.00, NULL, NULL),
(40, 44, 'toy015648', '', 2.00, 500000.00, 1000000.00, NULL, NULL),
(41, 45, 'toy015648', '', 3.00, 500000.00, 1500000.00, NULL, NULL),
(42, 46, 'toy015648', '', 2.00, 500000.00, 1000000.00, NULL, NULL),
(43, 47, '0654ste8', '', 3.00, 25000.00, 75000.00, NULL, NULL),
(44, 47, 'toy015648', '', 1.00, 500000.00, 500000.00, NULL, NULL),
(45, 48, 'styetisth459', '', 15.00, 500.00, 7500.00, NULL, NULL),
(46, 49, 'styetisth459', '', 10.00, 500.00, 5000.00, NULL, NULL),
(47, 50, 'styetisth459', '', 9.00, 500.00, 4500.00, NULL, NULL),
(48, 51, 'styetisth459', '', 5.00, 500.00, 2500.00, NULL, NULL),
(58, 61, '0654ste8', '', 654.00, 654.00, 427716.00, NULL, NULL),
(59, 62, '0654ste8', '', 654.00, 654.00, 427716.00, NULL, NULL),
(60, 63, 'vet056', '', 0.00, 0.00, 0.00, NULL, NULL),
(61, 22, '0654ste8', '', 1.00, 25000.00, 25000.00, NULL, NULL),
(62, 28, '0654ste8', 'ter', 3.00, 25000.00, 75000.00, NULL, NULL),
(64, 64, '0654ste8', '', 7.00, 25000.00, 175000.00, NULL, NULL),
(65, 64, 'styetisth459', '', 3.00, 500.00, 1500.00, NULL, NULL),
(66, 65, '0654ste8', 'f', 3.00, 25000.00, 75000.00, NULL, NULL),
(67, 66, 'styetisth459', '', 2.00, 500.00, 1000.00, NULL, NULL),
(70, 69, '0654ste8', '', 11.00, 25000.00, 275000.00, NULL, NULL),
(71, 70, 'styetisth459', '', 3.00, 500.00, 1500.00, NULL, NULL),
(73, 72, 'vet056', 'retest', 1.00, 99000.00, 99000.00, NULL, NULL),
(74, 73, 'vet056', 'restest2', 20.00, 99000.00, 1980000.00, NULL, NULL),
(75, 74, 'styetisth459', 'factnew', 4.00, 500.00, 2000.00, NULL, NULL),
(76, 75, 'styetisth459', 'fs', 1.00, 500.00, 500.00, NULL, NULL),
(77, 76, 'styetisth459', '12', 12.00, 500.00, 6000.00, NULL, NULL),
(78, 81, '0654ste8', '', -1.00, 25000.00, -25000.00, 37, NULL),
(79, 81, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(82, 83, '0654ste8', '', -1.00, 25000.00, -25000.00, 37, NULL),
(83, 83, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(98, 91, '0654ste8', '', -1.00, 25000.00, -25000.00, 37, NULL),
(99, 91, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(106, 95, '0654ste8', '', -1.00, 25000.00, -25000.00, 37, NULL),
(107, 95, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(108, 96, '0654ste8', '', -1.00, 25000.00, -25000.00, 37, NULL),
(109, 96, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(116, 100, '0654ste8', '', 0.00, 25000.00, 0.00, 37, NULL),
(117, 100, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(123, 104, '0654ste8', '', 0.00, 25000.00, 0.00, 37, NULL),
(124, 104, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(125, 105, '0654ste8', '', 0.00, 25000.00, 0.00, 37, NULL),
(126, 105, 'styetisth459', '', -1.00, 500.00, -500.00, 37, NULL),
(127, 106, 'vet056', 'restest2', -2.00, 99000.00, -198000.00, 73, NULL),
(128, 107, 'vet056', 'restest2', -2.00, 99000.00, -198000.00, 73, NULL),
(129, 109, 'vet056', 'restest2', -1.00, 99000.00, -99000.00, 73, NULL),
(130, 110, 'vet056', 'restest2', -1.00, 99000.00, -99000.00, 73, NULL),
(131, 112, 'vet056', 'restest2', -2.00, 99000.00, -198000.00, 73, NULL),
(132, 113, 'styetisth459', '12', -1.00, 500.00, -500.00, 76, NULL),
(133, 114, 'styetisth459', '12', -2.00, 500.00, -1000.00, 76, NULL),
(134, 115, 'styetisth459', '12', -1.00, 500.00, -500.00, 76, NULL),
(135, 116, 'styetisth459', '12', -1.00, 500.00, -500.00, 76, NULL),
(136, 117, 'styetisth459', '12', -1.00, 500.00, -500.00, 76, NULL),
(137, 118, 'styetisth459', '', -1.00, 500.00, -500.00, 49, NULL),
(138, 119, '0654ste8', 'ter', -1.00, 25000.00, -25000.00, 28, NULL),
(139, 119, 'vet056', 'reer', 0.00, 99000.00, 0.00, 28, NULL),
(140, 120, 'vet056', 'restest2', -1.00, 99000.00, -99000.00, 73, NULL),
(141, 121, 'vet056', 'restest2', -1.00, 99000.00, -99000.00, 73, NULL),
(142, 122, 'vet056', 'restest2', -2.00, 99000.00, -198000.00, 73, NULL),
(143, 123, 'vet056', 'restest2', 1.00, 99000.00, 99000.00, 73, NULL),
(144, 124, 'styetisth459', '12', -2.00, 500.00, -1000.00, 76, NULL),
(148, 136, '0654ste8', '', -2.00, 25000.00, -50000.00, 43, ''),
(150, 139, 'cstm_avr', '', -1.00, 56000.00, -56000.00, NULL, 'test56'),
(151, 140, 'cstm_avr', '', -1.00, 1000.00, -1000.00, NULL, 'test1k'),
(152, 141, 'cstm_avr', '', -1.00, 2000.00, -2000.00, NULL, 'test2k'),
(153, 142, 'cstm_avr', '', -1.00, 1000.00, -1000.00, NULL, 'test1k'),
(154, 143, 'styetisth459', '', -1.00, 500.00, -500.00, 49, ''),
(155, 144, 'toy015648', '', 2.00, 500000.00, 1000000.00, NULL, ''),
(156, 144, 'vet056', '', 1.00, 99000.00, 99000.00, NULL, ''),
(157, 145, 'toy015648', '', 3.00, 500000.00, 1500000.00, NULL, ''),
(158, 147, 'toy015648', '', 3.00, 500000.00, 1500000.00, NULL, ''),
(159, 148, 'vet056', '', 4.00, 99000.00, 396000.00, NULL, ''),
(160, 149, 'vet056', '', 2.00, 99000.00, 198000.00, NULL, ''),
(161, 150, 'toy015648', '', 6.00, 500000.00, 3000000.00, NULL, ''),
(162, 151, 'styetisth459', '', 18.00, 500.00, 9000.00, NULL, ''),
(163, 152, 'vet056', '', 6.00, 99000.00, 594000.00, NULL, ''),
(164, 153, 'toy015648', '', 3.00, 500000.00, 1500000.00, NULL, ''),
(165, 154, 'toy015648', '', 6.00, 500000.00, 3000000.00, NULL, ''),
(166, 155, 'toy015648', '', 4.00, 500000.00, 2000000.00, NULL, ''),
(167, 156, 'cstm_avr', 'bande roll xxxx', 1.00, 1325000.00, 1325000.00, NULL, ''),
(168, 157, 'divers', '', 1.00, 333000.00, 333000.00, NULL, ''),
(170, 158, 'divers', '', 1.00, 800000.00, 800000.00, NULL, ''),
(171, 159, 'cstm_avr', '', 1.00, 500000.00, 500000.00, NULL, ''),
(172, 160, 'divers', 'ma grosse b', 1.00, 6066004.00, 6066004.00, NULL, ''),
(201, 178, 'toy015648', '', 9.00, 500000.00, 4500000.00, NULL, ''),
(202, 179, 'vet056', '', 2.00, 99000.00, 198000.00, NULL, ''),
(203, 180, 'styetisth459', '', 9.00, 500.00, 4500.00, NULL, ''),
(204, 181, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(205, 182, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(206, 183, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(207, 183, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '123455670123'),
(208, 184, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(209, 184, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(210, 185, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '2378945870197'),
(211, 185, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(212, 185, 'styetisth459', '', 3.00, 500.00, 1500.00, NULL, ''),
(214, 187, '0654ste8', '', 2.00, 25000.00, 50000.00, NULL, ''),
(216, 189, '0654ste8', '', 2.00, 25000.00, 50000.00, NULL, ''),
(218, 191, '0654ste8', '', 2.00, 25000.00, 50000.00, NULL, ''),
(219, 192, '0654ste8', '', 2.00, 25000.00, 50000.00, NULL, ''),
(220, 192, 'styetisth459', '', 2.00, 500.00, 1000.00, NULL, ''),
(221, 193, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '123455670123'),
(222, 193, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '123455670123'),
(223, 194, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '001928939404'),
(224, 194, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, 'ahdb123798634'),
(227, 197, 'vet056', 'restest2', -1.00, 99000.00, -99000.00, 73, ''),
(228, 198, 'cstm_avr', 'some test to get it right=', -1.00, 50000.00, -50000.00, NULL, ''),
(231, 201, 'vet056', 'restest2', -2.00, 99.00, -198.00, 73, ''),
(234, 204, 'vet056', 'restest2', -2.00, 99.00, -198.00, 73, ''),
(235, 205, 'vet056', 'restest2', -2.00, 99.00, -198.00, 73, ''),
(236, 206, '0654ste8', '', -2.00, 25.00, -50.00, 187, ''),
(237, 207, 'phone_itel', '', -1.00, 560.00, -560.00, 194, 'ahdb123798634'),
(238, 207, 'phone_itel', '', 0.00, 560.00, 0.00, 194, '001928939404'),
(240, 209, 'phone_itel', '', 0.00, 560.00, 0.00, 194, 'ahdb123798634'),
(241, 209, 'phone_itel', '', -1.00, 560.00, -560.00, 194, '001928939404'),
(242, 210, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, 'fhafi4090'),
(243, 210, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, 'ahdb123798634'),
(244, 210, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '123455670123'),
(245, 211, 'phone_itel', '', 0.00, 560.00, 0.00, 210, '123455670123'),
(246, 211, 'phone_itel', '', -1.00, 560.00, -560.00, 210, 'ahdb123798634'),
(247, 211, 'phone_itel', '', -1.00, 560.00, -560.00, 210, 'fhafi4090'),
(252, 215, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, 'ahdb123798634'),
(253, 215, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '890304754892'),
(254, 215, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, '2378945870197'),
(255, 216, 'phone_itel', '', -1.00, 560.00, -560.00, 215, '2378945870197'),
(256, 221, 'phone_itel', '', -1.00, 560.00, -560.00, 215, '890304754892'),
(257, 221, 'phone_itel', '', -1.00, 560.00, -560.00, 215, 'ahdb123798634'),
(258, 222, 'toy015648', '', 5.00, 500000.00, 2500000.00, NULL, ''),
(259, 223, 'toy015648', '', -2.00, 500.00, -1000.00, 222, ''),
(260, 226, 'toy015648', '', -1.00, 500000.00, -500000.00, 222, ''),
(261, 227, '0654ste8', 'ship1', 5.00, 25000.00, 125000.00, NULL, ''),
(262, 227, '0654ste8', 'ship2', 2.00, 25000.00, 50000.00, NULL, ''),
(263, 228, 'styetisth459', '', 6.00, 500.00, 3000.00, NULL, ''),
(264, 229, 'phone_itel', '', 1.00, 560000.00, 560000.00, NULL, 'fhafi4090'),
(265, 230, 'phone_itel', '', -1.00, 560000.00, -560000.00, 229, 'fhafi4090'),
(266, 231, '0654ste8', '', -1.00, 25000.00, -25000.00, 192, ''),
(267, 231, 'styetisth459', '', -1.00, 500.00, -500.00, 192, ''),
(269, 233, 'styetisth459', '', 4.00, 500.00, 2000.00, NULL, ''),
(270, 233, 'divers', 'custom bag', 1.00, 5000.00, 5000.00, NULL, ''),
(271, 234, 'styetisth459', '', 2.00, 500.00, 1000.00, NULL, ''),
(272, 234, 'divers', 'custom bags quadri', 5.00, 15000.00, 75000.00, NULL, ''),
(273, 235, 'divers', '', 10.00, 2500000.00, 25000000.00, NULL, ''),
(274, 236, 'divers', '', 10.00, 3000000.00, 30000000.00, NULL, ''),
(275, 237, 'divers', '', 10.00, 3000000.00, 30000000.00, NULL, ''),
(276, 238, 'divers', 'another custom thing', 1500.00, 1500.00, 2250000.00, NULL, ''),
(277, 239, 'divers', 'props', 20.00, 250000.00, 5000000.00, NULL, ''),
(278, 240, 'divers', 'props encore', 50.00, 300000.00, 15000000.00, NULL, ''),
(279, 241, 'divers', 't shirt custom', 1000.00, 15000.00, 15000000.00, NULL, ''),
(280, 242, 'divers', 't shirt personnalisé', 1000.00, 20000.00, 20000000.00, NULL, ''),
(281, 243, 'divers', 'ouvrage metallique', 1.00, 350000.00, 350000.00, NULL, ''),
(282, 244, 'divers', 'n\'importe quoi', 150.00, 150000.00, 22500000.00, NULL, ''),
(283, 245, 'divers', 'testons', 1100.00, 50.00, 55000.00, NULL, ''),
(284, 246, 'divers', 'test', 200.00, 450.00, 90000.00, NULL, ''),
(285, 247, 'divers', 'testons encore', 100.00, 5000.00, 500000.00, NULL, ''),
(286, 248, 'test_variable_6', 'testonf inal', 250.00, 400.00, 100000.00, NULL, ''),
(287, 249, 'divers', 'decoupage metallique personnalisé', 2.00, 150000.00, 300000.00, NULL, ''),
(288, 250, 'divers', 'saving custom test', 45.00, 4356.00, 196020.00, NULL, ''),
(289, 251, 'divers', 'saving custom test', 45.00, 4356.00, 196020.00, NULL, ''),
(290, 252, 'divers', 'saving custom test', 45.00, 4356.00, 196020.00, NULL, ''),
(291, 253, 'divers', 'final test', 5.00, 100000.00, 500000.00, NULL, ''),
(292, 254, 'divers', 'encore', 150.00, 5000.00, 750000.00, NULL, ''),
(293, 255, 'divers', 'retert', 10.00, 5435.00, 54350.00, NULL, ''),
(294, 256, 'divers', 'testencore caaa', 35.00, 5000.00, 175000.00, NULL, ''),
(295, 257, 'divers', 'voila je pense que c\'est bon', 50000.00, 10000.00, 500000000.00, NULL, ''),
(296, 258, 'divers', 'dtf', 2.00, 15000.00, 30000.00, NULL, ''),
(297, 259, 'divers', 'impressions bache 4m x 25m', 5.00, 150000.00, 750000.00, NULL, ''),
(298, 260, 'divers', '2314', 23.00, 1155.00, 26565.00, NULL, ''),
(299, 261, 'divers', 're', 2000.00, 10.00, 20000.00, NULL, ''),
(300, 262, 'divers', 'testr', 14.00, 41555.00, 581770.00, NULL, ''),
(301, 263, 'divers', 'final test??', 10.00, 23455.00, 234550.00, NULL, ''),
(302, 264, 'divers', 'custom merch', 15000.00, 10000.00, 150000000.00, NULL, ''),
(303, 265, 'divers', 'impression custom merch taylor swift recto verso', 2.00, 15000.00, 30000.00, NULL, ''),
(304, 266, 'divers', 'de la merde', 10.00, 50000.00, 500000.00, NULL, ''),
(305, 267, 'divers', 'eras tours', 50.00, 10000.00, 500000.00, NULL, ''),
(306, 268, 'divers', 'tete', 50.00, 1000.00, 50000.00, NULL, ''),
(307, 269, 'divers', 'custom', 1.00, 50000.00, 50000.00, NULL, ''),
(308, 270, 'divers', 'custom fashion for dogs', 3.00, 20000.00, 60000.00, NULL, '');

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `uid` int(10) UNSIGNED NOT NULL,
  `nom_commercial` varchar(45) DEFAULT NULL,
  `raison_sociale` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `companies`
--

INSERT INTO `companies` (`uid`, `nom_commercial`, `raison_sociale`) VALUES
(11, 'timi gsm', 'timi gsm sarl'),
(13, 'directimmo', 'directimmo sarl'),
(14, 'orange', 'orange madagascar'),
(17, 'AB', 'ab production'),
(18, '', 'marvel'),
(19, '', 'DC comics'),
(20, '', 'qmm'),
(21, '', 'sherit'),
(22, '', 'pastry'),
(23, 'qsfd', 'dsfqqs'),
(24, 'gdfsq', 'sdfg'),
(25, 'fdh', 'xcb'),
(26, 'the company', 'the company'),
(28, 'IRS', 'entrepirse IRS'),
(29, 'tech tablet', 'tech tablet'),
(30, 'xyz', 'xyzsarlu'),
(31, 'trase', 'trase'),
(32, 'gege', 'gege'),
(35, 'disney', 'disney company'),
(36, 'espn', 'espn ltd'),
(37, 'netflix', 'netflix unlimited'),
(38, 'gdfsq 2', 'sdfg 2'),
(39, 'tartine et chocolat', 'compagnie des pains'),
(40, 'antares', 'antares sarl'),
(43, 'photoland', 'save'),
(44, 'IRMI', 'IRMI'),
(45, 'cgr', 'cgr'),
(47, 'facebook and cie', 'meta'),
(48, 'tiko', 'aaa'),
(49, 'biko', 'bbb'),
(50, 'ciko', 'ccc'),
(53, 'trix', 'trix sci'),
(54, 'drax', 'drax  ltd'),
(55, 'activision blizzard', 'activisition en vrai'),
(56, 'f4', 'ffff sarl'),
(57, 'tre', 'tre'),
(58, 'zte', 'zte'),
(59, 'abc', 'abc sa'),
(60, 'yyy', 'yyy'),
(61, 'borderland', 'borderland sa'),
(62, 'ideal', 'ideal sarl'),
(63, 'bad boys', 'bad boys company'),
(64, 'test', 'testtest'),
(65, 'tr', 'tre'),
(66, 'qsd', 'sdf'),
(67, 'oooo', 'oooo'),
(68, 'ty', 'tyty'),
(69, 'yuyu', 'yuyu'),
(73, 'harasaka', 'arasaka ltd'),
(78, 'sucker punch', 'unlimited suck'),
(79, 'bagera', 'bamgera sarlu'),
(82, 'tres', 'tres'),
(86, 'ESSCA', 'ESSCA LTD'),
(88, 'test', 'test'),
(89, 'ttte', 'tet'),
(92, '', ''),
(94, 'sanifer', 'sanifer'),
(95, 'jirama', 'jiro sy rano malagasy');

-- --------------------------------------------------------

--
-- Structure de la table `credits`
--

CREATE TABLE `credits` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='0 credit_client\n0 credit_fournisseur';

-- --------------------------------------------------------

--
-- Structure de la table `devis`
--

CREATE TABLE `devis` (
  `uid` int(10) UNSIGNED NOT NULL,
  `client_uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `state` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `devises`
--

CREATE TABLE `devises` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `sigle` varchar(10) NOT NULL,
  `iso` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `devis_détails`
--

CREATE TABLE `devis_détails` (
  `uid` int(10) UNSIGNED NOT NULL,
  `devis_uid` int(10) UNSIGNED NOT NULL,
  `item_uid` int(10) UNSIGNED NOT NULL,
  `description_item` tinytext DEFAULT NULL,
  `quantity` double(14,2) UNSIGNED NOT NULL,
  `prix_unitaire` double(14,2) UNSIGNED NOT NULL,
  `prix_total` double(14,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `employees`
--

CREATE TABLE `employees` (
  `uid` int(10) UNSIGNED NOT NULL,
  `matricule` int(4) UNSIGNED ZEROFILL NOT NULL,
  `debut` date NOT NULL,
  `poste` varchar(45) NOT NULL,
  `categorie` varchar(45) NOT NULL,
  `principal_magasin_uid` int(10) UNSIGNED NOT NULL,
  `sal_base` double(14,2) UNSIGNED NOT NULL,
  `sal_variable` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `smie_uid` int(10) UNSIGNED NOT NULL,
  `matrimonial` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `nb_enfants` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fin` date DEFAULT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `employees_avantages`
--

CREATE TABLE `employees_avantages` (
  `uid` int(10) UNSIGNED NOT NULL,
  `employee_uid` int(10) UNSIGNED NOT NULL,
  `avantage_type` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `debut` date NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `entries`
--

CREATE TABLE `entries` (
  `uid` int(10) UNSIGNED NOT NULL,
  `type` tinyint(3) UNSIGNED NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `factures_client`
--

CREATE TABLE `factures_client` (
  `num_facture` int(5) UNSIGNED ZEROFILL NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_uid` int(10) UNSIGNED NOT NULL,
  `payment` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0:impayé;1:partiel;2:payé'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `factures_client`
--

INSERT INTO `factures_client` (`num_facture`, `commande_uid`, `datetime`, `user_uid`, `payment`) VALUES
(00001, 43, '2023-08-12 14:27:51', 1, 0),
(00002, 51, '2023-08-12 14:29:41', 1, 0),
(00003, 28, '2023-08-12 14:43:57', 1, 0),
(00004, 37, '2023-08-12 14:44:15', 1, 0),
(00005, 49, '2023-08-12 14:58:28', 1, 0),
(00007, 72, '2023-08-20 15:41:45', 1, 0),
(00008, 73, '2023-08-20 15:43:36', 1, 0),
(00009, 74, '2023-08-20 15:48:29', 1, 0),
(00010, 75, '2023-08-20 16:00:04', 1, 0),
(00011, 76, '2023-08-20 16:09:04', 1, 0),
(00014, 187, '2024-01-28 13:08:15', 1, 0),
(00015, 187, '2024-01-28 13:08:15', 1, 0),
(00017, 189, '2024-01-28 13:16:24', 1, 0),
(00018, 189, '2024-01-28 13:16:32', 1, 0),
(00019, 192, '2024-01-28 13:36:22', 1, 0),
(00020, 194, '2024-01-30 17:58:08', 1, 0),
(00021, 210, '2024-02-11 15:53:56', 1, 0),
(00022, 215, '2024-02-11 16:16:57', 1, 0),
(00023, 222, '2024-02-14 19:09:40', 1, 0),
(00024, 227, '2024-05-01 11:51:20', 1, 0),
(00025, 228, '2024-05-01 11:58:56', 1, 0),
(00026, 229, '2024-05-03 18:34:29', 1, 0),
(00027, 249, '2024-05-08 16:37:26', 1, 0),
(00028, 251, '2024-05-08 16:41:09', 1, 0),
(00029, 252, '2024-05-08 16:41:09', 1, 0),
(00030, 253, '2024-05-08 16:44:07', 1, 0),
(00031, 254, '2024-05-08 16:45:09', 1, 0),
(00032, 255, '2024-05-08 16:46:01', 1, 0),
(00033, 256, '2024-05-08 16:48:54', 1, 0),
(00034, 257, '2024-05-08 16:51:13', 1, 0),
(00035, 258, '2024-05-08 16:51:52', 1, 0),
(00036, 259, '2024-05-08 16:54:09', 1, 0),
(00037, 260, '2024-05-08 16:54:43', 1, 0),
(00038, 261, '2024-05-08 16:56:00', 1, 0),
(00039, 262, '2024-05-08 16:57:31', 1, 0),
(00040, 263, '2024-05-08 16:58:14', 1, 0),
(00041, 264, '2024-05-08 17:00:36', 1, 0),
(00042, 265, '2024-05-08 17:08:27', 1, 0),
(00043, 266, '2024-05-08 17:09:30', 1, 0),
(00044, 267, '2024-05-08 17:11:37', 1, 0),
(00045, 268, '2024-05-08 17:15:42', 1, 0),
(00046, 270, '2024-05-09 10:31:43', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `factures_fournisseur`
--

CREATE TABLE `factures_fournisseur` (
  `uid` int(10) UNSIGNED NOT NULL,
  `fournisseur_uid` int(10) UNSIGNED NOT NULL,
  `num_facture` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `state` tinyint(3) UNSIGNED NOT NULL DEFAULT 1 COMMENT '0 declarable; 1 nd ',
  `magasin_uid` int(10) UNSIGNED NOT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `tva_flag` tinyint(1) NOT NULL DEFAULT 1,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_ht_avant_remise` double(14,2) NOT NULL,
  `total_ttc_avant_remise` double(14,2) NOT NULL,
  `remise_taux` double(14,2) NOT NULL,
  `remise_montant` double(14,2) NOT NULL,
  `total_ht_apres_remise` double(14,2) NOT NULL,
  `tva_apres_remise` double(14,2) NOT NULL,
  `total_ttc_apres_remise` double(14,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `factures_fournisseur`
--

INSERT INTO `factures_fournisseur` (`uid`, `fournisseur_uid`, `num_facture`, `date`, `libelle`, `state`, `magasin_uid`, `user_uid`, `tva_flag`, `datetime`, `total_ht_avant_remise`, `total_ttc_avant_remise`, `remise_taux`, `remise_montant`, `total_ht_apres_remise`, `tva_apres_remise`, `total_ttc_apres_remise`) VALUES
(7, 94, 'sonyblack', '2024-07-04', NULL, 0, 1, 1, 1, '2024-07-13 06:48:04', 54000.00, 64800.00, 0.00, 0.00, 54000.00, 0.00, 64800.00),
(12, 88, '5431q', '2024-07-18', 'x6', 0, 1, 1, 1, '2024-07-18 18:04:32', 500000.00, 600000.00, 0.00, 0.00, 500000.00, 0.00, 600000.00),
(13, 89, 'where55', '2024-07-16', NULL, 0, 1, 1, 1, '2024-07-18 18:20:17', 560000.00, 672000.00, 0.00, 0.00, 560000.00, 0.00, 672000.00),
(14, 89, 'where56', '2024-07-16', 'tre', 0, 1, 1, 0, '2024-07-18 18:34:44', 1120000.00, 1120000.00, 0.00, 0.00, 1120000.00, 0.00, 1120000.00);

-- --------------------------------------------------------

--
-- Structure de la table `factures_fournisseur_details`
--

CREATE TABLE `factures_fournisseur_details` (
  `uid` int(10) UNSIGNED NOT NULL,
  `facture_uid` int(10) UNSIGNED NOT NULL,
  `item_uid` varchar(20) NOT NULL,
  `description_item` tinytext DEFAULT NULL,
  `quantity` double(14,2) NOT NULL,
  `prix_unitaire` double(14,2) UNSIGNED NOT NULL,
  `prix_total` double(14,2) NOT NULL,
  `num_serie` varchar(100) DEFAULT NULL,
  `return_item` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `factures_fournisseur_details`
--

INSERT INTO `factures_fournisseur_details` (`uid`, `facture_uid`, `item_uid`, `description_item`, `quantity`, `prix_unitaire`, `prix_total`, `num_serie`, `return_item`) VALUES
(2, 7, 'carburant', '', 12.00, 4500.00, 54000.00, '', NULL),
(7, 12, 'phone_itel', '', 1.00, 500000.00, 500000.00, '0123456abtt', NULL),
(8, 13, 'phone_itel', '', 1.00, 560000.00, 560000.00, '22287658hgh', NULL),
(9, 14, 'phone_itel', '', 1.00, 560000.00, 560000.00, 'hgjeiu01', NULL),
(10, 14, 'phone_itel', '', 1.00, 560000.00, 560000.00, 'hgjeiu02', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `factures_fournisseur_old`
--

CREATE TABLE `factures_fournisseur_old` (
  `uid` int(10) UNSIGNED NOT NULL,
  `fournisseur_uid` int(10) UNSIGNED NOT NULL,
  `num_facture` varchar(45) NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `ND` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `magasin_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `familles`
--

CREATE TABLE `familles` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `familles`
--

INSERT INTO `familles` (`uid`, `name`, `active`) VALUES
(1, 'Outillage', 1),
(2, 'Nourriture', 1),
(3, 'hifi', 1),
(4, 'boisson', 1),
(5, 'vetement', 1),
(7, 'matiere premiere', 1),
(8, 'jouets', 1),
(10, 'produit d entretien', 1),
(11, 'meubles', 1),
(12, 'arme', 1),
(13, 'vhs', 1),
(14, 'sur mesure', 1),
(15, 'dépenses générales', 1);

-- --------------------------------------------------------

--
-- Structure de la table `fiche_de_paie`
--

CREATE TABLE `fiche_de_paie` (
  `uid` int(10) UNSIGNED NOT NULL,
  `year` int(10) UNSIGNED NOT NULL,
  `month` tinyint(3) UNSIGNED NOT NULL,
  `employee_uid` int(10) UNSIGNED NOT NULL,
  `sal_base` double(14,2) UNSIGNED NOT NULL,
  `temps` tinyint(3) UNSIGNED NOT NULL,
  `sal_base_prorata` double(14,2) UNSIGNED NOT NULL,
  `prime` double(14,2) UNSIGNED DEFAULT NULL,
  `avantages` double(14,2) UNSIGNED DEFAULT NULL,
  `sal_brute` double(14,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `uid` int(10) UNSIGNED NOT NULL,
  `encours` double(14,2) NOT NULL DEFAULT 0.00,
  `evaluation` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `nb_jour` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `declarable` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `active_fournisseur` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `fournisseurs`
--

INSERT INTO `fournisseurs` (`uid`, `encours`, `evaluation`, `nb_jour`, `declarable`, `active_fournisseur`) VALUES
(59, 0.00, 2, 0, 1, 0),
(60, 0.00, 2, 0, 1, 1),
(61, 0.00, 2, 0, 1, 1),
(62, 0.00, 2, 0, 1, 1),
(63, 0.00, 2, 0, 1, 1),
(64, 0.00, 2, 0, 1, 0),
(65, 0.00, 2, 0, 1, 1),
(66, 0.00, 2, 0, 1, 1),
(67, 0.00, 2, 0, 1, 1),
(68, 0.00, 2, 0, 1, 1),
(69, 0.00, 2, 0, 1, 0),
(70, 0.00, 2, 0, 1, 1),
(71, 0.00, 2, 0, 1, 1),
(72, 0.00, 2, 0, 1, 1),
(73, 0.00, 2, 0, 1, 1),
(86, 0.00, 2, 0, 1, 1),
(88, 0.00, 2, 0, 1, 1),
(89, 0.00, 2, 0, 1, 1),
(92, 0.00, 2, 0, 1, 1),
(93, 0.00, 2, 0, 1, 1),
(94, 0.00, 2, 0, 1, 1),
(95, 0.00, 2, 0, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `humans`
--

CREATE TABLE `humans` (
  `uid` int(10) UNSIGNED NOT NULL,
  `noms` varchar(60) NOT NULL,
  `prenoms` varchar(60) NOT NULL,
  `cin` varchar(12) DEFAULT NULL,
  `cin_date` date DEFAULT NULL,
  `cin_lieu` varchar(45) DEFAULT NULL,
  `naissance_date` date NOT NULL,
  `naissance_lieu` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `humans`
--

INSERT INTO `humans` (`uid`, `noms`, `prenoms`, `cin`, `cin_date`, `cin_lieu`, `naissance_date`, `naissance_lieu`) VALUES
(1, 'test deux', 'jean', '0123456789', '2022-11-01', '', '2000-01-20', ''),
(2, 'testeur', 'user1', '101', '2022-06-15', 'tnr', '2000-05-26', 'madagascar'),
(5, 'rabemanantsoa', 'jean', '0123456789', '2022-11-01', '', '2000-01-20', ''),
(6, 'elon', 'musk', '5594', '2022-11-01', 'sudaf', '2022-11-01', 'sudaf'),
(7, 'ratata', 'bete', '165', '2022-11-01', 'bourg palette', '2022-11-01', 'qsfd bourg'),
(12, 'raj', 'mickael', '', '2022-11-01', '', '2022-11-03', ''),
(15, 'IARI', 'Maeva', '', '2022-11-02', '', '2022-09-06', ''),
(16, 'IARI', 'Maeva', '', '2022-09-06', '', '2022-08-11', ''),
(27, 'razaf', 'williamson', '109', '2022-09-02', 'fd', '2022-03-16', 'fd'),
(33, 'leje', 'hernandez', '0598', '2022-09-01', '', '2022-08-04', ''),
(34, 'captain', 'marvel', '9954', '1987-06-19', 'unk', '1920-12-05', 'galacir'),
(41, 'rakotoson', 'sophie', '101', '2000-12-09', 'tnr 5', '1991-02-08', 'tana'),
(42, 'bourdon', 'pierre', '1015500', '2022-08-01', '', '2022-11-17', ''),
(46, 'aintsoa', 'mathéo', '', '2022-05-31', '', '2021-01-05', ''),
(51, 'tsiyao', 'valerie', '', '2012-12-12', '', '1999-02-05', ''),
(52, 'anonyme', 'sheshounet', '', '2018-02-06', '', '2000-05-01', ''),
(70, 'KOYTCHA', 'Radj', '', '1999-02-06', '', '1981-02-02', ''),
(71, 'KOYTCHA', 'Radjdfg', '', '1999-02-06', '', '1981-02-02', ''),
(72, 'rembalaya', ' ishin', '12130', '2022-03-30', '', '2009-01-05', ''),
(80, 'gontrand', 'gon', 'sqdf', '2023-05-18', 'sdf', '2023-05-26', 'qsf'),
(81, 'phileas', 'fog', 'qsdf', '2023-05-04', 'qsdf', '2023-05-01', 'qsdf'),
(93, 'jean', 'hetg', 'er', '2023-05-11', 'esqr', '2023-05-02', 'qesr');

-- --------------------------------------------------------

--
-- Structure de la table `identifiables`
--

CREATE TABLE `identifiables` (
  `item_code` varchar(25) NOT NULL,
  `num_serie` varchar(25) NOT NULL,
  `actif` tinyint(4) NOT NULL,
  `magasin_uid` int(4) UNSIGNED NOT NULL,
  `ref_in` varchar(50) DEFAULT NULL,
  `ref_out` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `identifiables`
--

INSERT INTO `identifiables` (`item_code`, `num_serie`, `actif`, `magasin_uid`, `ref_in`, `ref_out`) VALUES
('phone_itel', '001928939404', 1, 1, NULL, NULL),
('phone_itel', '0123456abtt', 1, 1, NULL, NULL),
('phone_itel', '123455670123', 1, 1, NULL, NULL),
('phone_itel', '22287658hgh', 1, 1, NULL, NULL),
('phone_itel', '2378945870197', 1, 1, NULL, NULL),
('phone_itel', '267819038', 1, 1, NULL, NULL),
('phone_itel', '890304754892', 1, 1, NULL, NULL),
('phone_itel', 'ahdb123798634', 1, 1, NULL, NULL),
('phone_itel', 'fhafi4090', 0, 1, NULL, NULL),
('phone_itel', 'hgjeiu01', 1, 1, NULL, NULL),
('phone_itel', 'hgjeiu02', 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `insides`
--

CREATE TABLE `insides` (
  `uid` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `ref_intern` varchar(45) DEFAULT NULL,
  `ref_extern` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `montant` double(14,2) NOT NULL,
  `locked` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inside_details`
--

CREATE TABLE `inside_details` (
  `uid` int(10) UNSIGNED NOT NULL,
  `outside_uid` int(10) UNSIGNED NOT NULL,
  `inside_uid` int(10) UNSIGNED NOT NULL,
  `montant` double(14,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `institutions`
--

CREATE TABLE `institutions` (
  `uid` int(10) UNSIGNED NOT NULL,
  `type_uid` int(10) UNSIGNED NOT NULL,
  `frequence_annuelle` double(4,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `items`
--

CREATE TABLE `items` (
  `uid` int(10) UNSIGNED NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  `type_item` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `declarable` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `category_uid` int(10) UNSIGNED NOT NULL,
  `family_uid` int(10) UNSIGNED NOT NULL,
  `prix_vente` double(14,2) UNSIGNED NOT NULL,
  `prix_achat_mp` double(14,2) UNSIGNED NOT NULL,
  `stockable` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `identifiable` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `unite_mesure_uid` int(10) UNSIGNED NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `note` tinytext DEFAULT NULL,
  `prix_variable` tinyint(4) NOT NULL DEFAULT 0,
  `stock` double(14,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `pour_achat` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `pour_vente` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `items`
--

INSERT INTO `items` (`uid`, `code`, `name`, `type_item`, `declarable`, `category_uid`, `family_uid`, `prix_vente`, `prix_achat_mp`, `stockable`, `identifiable`, `unite_mesure_uid`, `active`, `note`, `prix_variable`, `stock`, `pour_achat`, `pour_vente`) VALUES
(3, '0654ste8', 'jean lacoste', 1, 1, 3, 5, 25000.00, 0.00, 1, 0, 1, 1, NULL, 0, 19.00, 1, 1),
(10, 'carburant', 'carburant divers but', 1, 1, 3, 7, 0.00, 0.00, 1, 0, 1, 1, NULL, 0, 0.00, 1, 0),
(7, 'cstm_avr', 'custom_avoir', 0, 1, 13, 14, 0.00, 0.00, 0, 0, 1, 1, 'default item for simple avoir', 1, 0.00, 0, 1),
(9, 'divers', 'divers_2', 1, 1, 13, 14, 0.00, 0.00, 0, 0, 1, 1, NULL, 1, 0.00, 1, 1),
(11, 'internet', 'internet', 1, 1, 12, 15, 0.00, 0.00, 0, 0, 1, 1, NULL, 0, 0.00, 1, 0),
(13, 'jirama_eau', 'eau jirama', 0, 1, 3, 15, 0.00, 0.00, 0, 0, 1, 1, NULL, 0, 0.00, 1, 0),
(12, 'jirama_elec', 'electricite jirama', 0, 1, 3, 15, 0.00, 0.00, 0, 0, 1, 1, NULL, 0, 0.00, 1, 0),
(8, 'phone_itel', 'itel xxt 35 2023', 1, 1, 3, 8, 560000.00, 0.00, 1, 1, 1, 1, NULL, 0, 10.00, 1, 1),
(2, 'styetisth459', 'yaourt 50g', 1, 1, 3, 2, 500.00, 0.00, 1, 0, 1, 1, 'le prix est monté', 0, 18.00, 1, 1),
(6, 'test_variable_6', 'test prix variable 6', 1, 1, 13, 14, 0.00, 0.00, 0, 0, 1, 1, NULL, 1, 0.00, 0, 1),
(5, 'toy015648', 'figurine articulé power ranger rouge', 1, 1, 11, 8, 500000.00, 0.00, 1, 0, 1, 1, NULL, 0, 7.00, 1, 1),
(4, 'vet056', 'chocolat ferrero rocher 250g', 1, 1, 6, 2, 99000.00, 0.00, 1, 0, 1, 1, 'cher pour rien', 0, 5.00, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `magasins`
--

CREATE TABLE `magasins` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `adresse` varchar(45) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `note` tinytext DEFAULT NULL,
  `user_uid` int(10) UNSIGNED NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='pre popolated with local banks';

--
-- Déchargement des données de la table `magasins`
--

INSERT INTO `magasins` (`uid`, `name`, `adresse`, `phone`, `active`, `note`, `user_uid`, `datetime`) VALUES
(1, 'ankorondrano', 'galerie zoom', '222222', 1, NULL, 1, '2023-04-22 10:45:29'),
(2, 'antaninarenina', 'somewhere in antaninarenina', '26545', 1, NULL, 1, '2023-04-22 10:48:37'),
(3, 'the dark web', 'on the internet where light do not reach', '456', 1, 'lol', 1, '2023-05-21 13:07:26');

-- --------------------------------------------------------

--
-- Structure de la table `mes_banques`
--

CREATE TABLE `mes_banques` (
  `uid` int(10) UNSIGNED NOT NULL,
  `banque_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mode_pmt_bank`
--

CREATE TABLE `mode_pmt_bank` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `movements`
--

CREATE TABLE `movements` (
  `uid` int(10) UNSIGNED NOT NULL,
  `item_uid` int(10) UNSIGNED NOT NULL,
  `num_serie` varchar(45) DEFAULT NULL,
  `quantity` double(14,2) NOT NULL,
  `locked` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `in_out` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `stock_impacted` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_bank`
--

CREATE TABLE `mvts_bank` (
  `uid` int(10) UNSIGNED NOT NULL,
  `ma_banque_uid` int(10) UNSIGNED NOT NULL,
  `mode_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_caisse`
--

CREATE TABLE `mvts_caisse` (
  `uid` int(10) UNSIGNED NOT NULL,
  `caisse_uid` int(10) UNSIGNED NOT NULL,
  `porteur_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_credit_client`
--

CREATE TABLE `mvts_credit_client` (
  `uid` int(10) UNSIGNED NOT NULL,
  `treso_uid` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_credit_fournisseur`
--

CREATE TABLE `mvts_credit_fournisseur` (
  `uid` int(10) UNSIGNED NOT NULL,
  `treso_uid` int(10) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_internes`
--

CREATE TABLE `mvts_internes` (
  `uid` int(10) UNSIGNED NOT NULL,
  `origin_uid` int(10) UNSIGNED NOT NULL,
  `destination_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_mobile_money`
--

CREATE TABLE `mvts_mobile_money` (
  `uid` int(10) UNSIGNED NOT NULL,
  `operateur_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mvts_wallet_electronic`
--

CREATE TABLE `mvts_wallet_electronic` (
  `uid` int(10) UNSIGNED NOT NULL,
  `wallet_electronic_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `nd_client`
--

CREATE TABLE `nd_client` (
  `num_nd` int(4) UNSIGNED ZEROFILL NOT NULL,
  `outside_uid` int(10) UNSIGNED NOT NULL,
  `client_uid` int(10) UNSIGNED NOT NULL,
  `libelle` tinytext DEFAULT NULL,
  `commercial_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `operateurs`
--

CREATE TABLE `operateurs` (
  `uid` int(10) UNSIGNED NOT NULL,
  `tiers_uid` int(10) UNSIGNED NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `outsides`
--

CREATE TABLE `outsides` (
  `uid` int(10) UNSIGNED NOT NULL,
  `type_uid` tinyint(3) UNSIGNED DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `montant` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `params`
--

CREATE TABLE `params` (
  `uid` int(10) UNSIGNED NOT NULL,
  `tiers_uid` int(10) UNSIGNED NOT NULL,
  `tva` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `export` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `devise_int` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sme`
--

CREATE TABLE `sme` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `montant` double(14,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `smie`
--

CREATE TABLE `smie` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `rate_sal` double(4,3) UNSIGNED NOT NULL,
  `rate_emp` double(4,3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`uid`, `name`) VALUES
(2, 'tentative2');

-- --------------------------------------------------------

--
-- Structure de la table `the_compamy`
--

CREATE TABLE `the_compamy` (
  `raison_sociale` varchar(100) NOT NULL,
  `nom_commercial` varchar(150) NOT NULL,
  `nif` int(40) NOT NULL,
  `stat` int(40) NOT NULL,
  `tva_flag` tinyint(2) NOT NULL,
  `adresse_siege` int(11) NOT NULL,
  `phone1` int(11) NOT NULL,
  `phone2` int(11) DEFAULT NULL,
  `email1` int(11) NOT NULL,
  `email2` int(11) DEFAULT NULL,
  `rcs` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tiers`
--

CREATE TABLE `tiers` (
  `uid` int(10) UNSIGNED NOT NULL,
  `type_personnality_uid` int(10) UNSIGNED NOT NULL,
  `adress` varchar(45) NOT NULL,
  `nif` varchar(45) DEFAULT NULL,
  `stat` varchar(45) DEFAULT NULL,
  `rcs` varchar(12) DEFAULT NULL,
  `phone1` varchar(15) NOT NULL,
  `phone2` varchar(15) DEFAULT NULL,
  `mail1` varchar(45) NOT NULL,
  `mail2` varchar(45) DEFAULT NULL,
  `active_tiers` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tiers`
--

INSERT INTO `tiers` (`uid`, `type_personnality_uid`, `adress`, `nif`, `stat`, `rcs`, `phone1`, `phone2`, `mail1`, `mail2`, `active_tiers`, `note`) VALUES
(1, 1, 'test2', '', '', '', '0341234567', '0331234567', 'r.jean@gmail.com', '', 1, NULL),
(2, 1, 'home', NULL, NULL, NULL, '033', NULL, 'mail', NULL, 1, NULL),
(5, 1, 'ambonivohitra pokemon uk', '', '', '', '0341234567', '0331234567', 'r.jean@gmail.com', '', 1, NULL),
(6, 1, 'usa', '', '', '', '', '', '', '', 1, ''),
(7, 1, 'qsfd bourg pa', '', '', '', '365467', '4654', 'sqfd', 'sqdf', 1, ''),
(11, 2, 'ankorondrano', '', '', '', '034', '034', 'contact@timigsm.com', '', 1, ''),
(12, 1, '', '', '', '', '', '', '', '', 1, ''),
(13, 2, 'nowhere', '', '', '', '', '', '', '', 1, ''),
(14, 2, 'ankorondrano red island tower', '', '', '', '', '', '', '', 1, ''),
(15, 1, '', '', '', '', '', '', '', '', 1, ''),
(16, 1, '', '', '', '', '', '', '', '', 1, ''),
(17, 2, 'france', '', '', '', '', '', '', '', 1, ''),
(18, 2, '', '', '', '', '', '', '', '', 1, ''),
(19, 2, '', '', '', '', '', '', '', '', 1, ''),
(20, 2, '', '', '', '', '', '', '', '', 1, ''),
(21, 2, '', '', '', '', '', '', '', '', 1, ''),
(22, 2, '', '', '', '', '', '', '', '', 1, ''),
(23, 2, '', '', '', '', '', '', '', '', 1, ''),
(24, 2, '', '', '', '', '', '', '', '', 1, ''),
(25, 2, '', '', '', '', '', '', '', '', 1, ''),
(26, 2, '', '', '', '', '', '', '', '', 1, ''),
(27, 1, 'manoir', '', '', '', '034', '032', 'williamson@gmail.com', 'williamson@directimmo.mg', 1, ''),
(28, 2, 'cité ampefiloha logement 267', '', '', '', '0349772868', '032', 'stephane@gmail.com', '', 1, ''),
(29, 2, 'ampasamadinika', '', '', '', '0344', '03888', 'comptabilite@techtablet.fr', '', 1, ''),
(30, 2, 'tana', '', '', '', '6798', '4486', 'xyz@gmail.mg', '', 1, ''),
(31, 2, '', '', '', '', '', '', '', '', 1, ''),
(32, 2, '', '', '', '', '', '', '', '', 1, ''),
(33, 1, '', '', '', '', '', '', '', '', 1, ''),
(34, 1, '', '', '', '', '', '', '', '', 1, ''),
(35, 2, '', '', '', '', '', '', '', '', 0, ''),
(36, 2, '', '', '', '', '', '', '', '', 1, ''),
(37, 2, '', '', '', '', '', '', '', '', 1, ''),
(38, 2, '', '', '', '', '', '', '', '', 1, ''),
(39, 2, '', '', '', '', '', '', '', '', 1, ''),
(40, 2, '', '', '', '', '', '', '', '', 1, ''),
(41, 1, 'ammbohimanarina', '', '', '', '0320719911', '', '', '', 1, ''),
(42, 1, 'Ambatobe chez les riches lol', '', '', '', '032', '0322', 'pierre.bourdon@gmail.com', '', 1, ''),
(43, 2, 'saint machin en france', '', '', '', '', '', '', '', 1, ''),
(44, 2, 'ampefiloha', '', '', '', '0349772868', '', 'irmi@gmail.com', '', 1, ''),
(45, 2, 'tsimabazaza', '', '', '', '', '', '', '', 1, ''),
(46, 1, 'chez papa et maman', '', '', '', '', '', '', '', 1, ''),
(47, 2, 'usa', '', '', '', '', '', '', '', 1, 'everybody hates them '),
(48, 2, '', '', '', '', '', '', '', '', 1, ''),
(49, 2, '', '', '', '', '', '', '', '', 1, ''),
(50, 2, '', '', '', '', '', '', '', '', 1, ''),
(51, 1, '', '', '', '', '', '', '', '', 1, ''),
(52, 1, '', '', '', '', '', '', '', '', 1, ''),
(53, 2, '', '', '', '', '', '', '', '', 1, ''),
(54, 2, '', '', '', '', '', '', '', '', 1, ''),
(55, 2, '', '', '', '', '', '', '', '', 1, ''),
(56, 2, 'qsf', NULL, NULL, NULL, 'qsdf', 'qsfd', 'qsdf', 'qsdf', 1, ''),
(57, 2, '', '', '', '', '', '', '', '', 1, ''),
(58, 2, '', '', '', '', '', '', '', '', 1, ''),
(59, 2, 'mada', '', '', '', '', '', '', '', 1, ''),
(60, 2, 'ss', '', '', '', '', '', '', '', 1, ''),
(61, 2, 'somewher only they know', '', '', '', '', '', '', '', 1, ''),
(62, 2, 'andresfan', '', '', '', '', '', '', '', 1, ''),
(63, 2, '', '', '', '', '', '', '', '', 1, ''),
(64, 2, 'beta', NULL, NULL, NULL, '', NULL, '', NULL, 1, ''),
(65, 2, '', '', '', '', '', '', '', '', 1, ''),
(66, 2, '', '', '', '', '', '', '', '', 1, ''),
(67, 2, '', '', '', '', '', '', '', '', 1, ''),
(68, 2, 'grogro', NULL, NULL, NULL, '', NULL, '', NULL, 1, ''),
(69, 2, 'qsdf2555', NULL, NULL, NULL, '', NULL, '', NULL, 1, ''),
(70, 1, '', '', '', '', '', '', '', '', 1, ''),
(71, 1, '', '', '', '', '', '', '', '', 1, ''),
(72, 1, '', '', '', '', '', '', '', '', 1, ''),
(73, 2, '', '', '', '', '', '', '', '', 1, ''),
(78, 2, 'suck down', NULL, NULL, NULL, '5798', '801', 'lsmqdio', 'wotv', 1, 'sdfgmm ko'),
(79, 2, 'fr', NULL, NULL, NULL, '65567', '3498', 'dsm', 'll', 1, NULL),
(80, 1, 'qsdf', NULL, NULL, NULL, 'qsfd', 'fhsd', 'vd', 'ht', 1, NULL),
(81, 1, 'monde imaginaire', NULL, NULL, NULL, 'qsdff', 'qsdf', 'qsdf', 'qsdf', 1, NULL),
(82, 2, 'sdfs', NULL, NULL, NULL, 'shfh', 'sdf', 'sg', 'sdfgsd', 1, NULL),
(86, 2, 'antanimena haut amb', NULL, NULL, NULL, '65431', '32654', 'qsdf', 'qsf', 1, NULL),
(88, 2, 'tes', NULL, NULL, NULL, 'tes', 'set', 'set', 'set', 1, NULL),
(89, 2, 'rre', NULL, NULL, NULL, 'chsd', 'g', 'sdf', 'dg', 1, NULL),
(92, 2, 'gfhjzf', NULL, NULL, NULL, 'fghj', 'ghj', 'fghj', 'fghj', 1, NULL),
(93, 1, 'qqer', NULL, NULL, NULL, 'qsr', 'qser', 'qser', 'qser', 1, 'qser'),
(94, 2, 'ankazomanga', NULL, NULL, NULL, '340930490', NULL, 'contact@sanifer.mg', NULL, 1, NULL),
(95, 2, 'xxx', '342523', '652346325', NULL, '098', '0987', 'lsdfj@jirama.mg', 'contact@jirama.mg', 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `transferts_internes`
--

CREATE TABLE `transferts_internes` (
  `uid` int(10) UNSIGNED NOT NULL,
  `source_uid` int(10) UNSIGNED NOT NULL,
  `destination_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='pour treso';

-- --------------------------------------------------------

--
-- Structure de la table `tresos`
--

CREATE TABLE `tresos` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `type_treso_uid` int(10) UNSIGNED NOT NULL,
  `devise_uid` int(10) UNSIGNED NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL,
  `declarable` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types_avantage`
--

CREATE TABLE `types_avantage` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types_institutions`
--

CREATE TABLE `types_institutions` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='fisc, douane, santé,retraite, formation,etc,...';

-- --------------------------------------------------------

--
-- Structure de la table `types_obligations`
--

CREATE TABLE `types_obligations` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types_outsides`
--

CREATE TABLE `types_outsides` (
  `uid` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types_personality`
--

CREATE TABLE `types_personality` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `types_personality`
--

INSERT INTO `types_personality` (`uid`, `name`) VALUES
(2, 'personne morale'),
(1, 'personne physique');

-- --------------------------------------------------------

--
-- Structure de la table `types_tiers`
--

CREATE TABLE `types_tiers` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types_treso`
--

CREATE TABLE `types_treso` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `active` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `unites_mesure`
--

CREATE TABLE `unites_mesure` (
  `uid` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `unites_mesure`
--

INSERT INTO `unites_mesure` (`uid`, `name`, `active`) VALUES
(1, 'unité', 1),
(2, 'surface', 1),
(3, 'longueur', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `uid` int(10) UNSIGNED NOT NULL,
  `login` varchar(45) NOT NULL,
  `mdp` varchar(45) NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `client_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `client_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `client_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `client_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fournisseur_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fournisseur_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `fournisseur_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `fournisseur_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `facture_client_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `facture_client_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `facture_client_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `facture_client_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `facture_fournisseur_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `facture_fournisseur_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `facture_fournisseur_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `facture_fournisseur_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `tresorerie_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `tresorerie_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `tresorerie_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `tresorerie_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `stock_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `stock_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `stock_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `stock_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `famille_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `famille_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `famille_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `famille_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `categorie_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `categorie_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `categorie_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `categorie_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `item_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `item_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `item_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `item_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `employee_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `employee_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `employee_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `employee_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `authorization_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `authorization_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `authorization_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `authorization_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `affaire_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `affaire_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `affaire_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `affaire_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `devis_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `devis_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `devis_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `devis_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `avoir_client_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `avoir_client_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `avoir_client_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `avoir_client_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mvt_treso_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mvt_treso_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `mvt_treso_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mvts_treso_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `nd_client_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `nd_client_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `nd_client_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `nd_client_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mvt_interne_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mvt_interne_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `mvt_interne_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `mvt_interne_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `magasin_create` tinyint(4) NOT NULL DEFAULT 0,
  `magasin_read` tinyint(4) NOT NULL DEFAULT 0,
  `magasin_update` tinyint(4) NOT NULL DEFAULT 0,
  `magasin_delete` tinyint(4) NOT NULL DEFAULT 0,
  `commande_create` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `commande_read` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `commande_update` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `commande_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`uid`, `login`, `mdp`, `active`, `client_create`, `client_read`, `client_update`, `client_delete`, `fournisseur_create`, `fournisseur_read`, `fournisseur_update`, `fournisseur_delete`, `facture_client_create`, `facture_client_read`, `facture_client_update`, `facture_client_delete`, `facture_fournisseur_create`, `facture_fournisseur_read`, `facture_fournisseur_update`, `facture_fournisseur_delete`, `tresorerie_create`, `tresorerie_read`, `tresorerie_update`, `tresorerie_delete`, `stock_create`, `stock_read`, `stock_update`, `stock_delete`, `famille_create`, `famille_read`, `famille_update`, `famille_delete`, `categorie_create`, `categorie_read`, `categorie_update`, `categorie_delete`, `item_create`, `item_read`, `item_update`, `item_delete`, `employee_create`, `employee_read`, `employee_update`, `employee_delete`, `authorization_create`, `authorization_read`, `authorization_update`, `authorization_delete`, `affaire_create`, `affaire_read`, `affaire_update`, `affaire_delete`, `devis_create`, `devis_read`, `devis_update`, `devis_delete`, `avoir_client_create`, `avoir_client_read`, `avoir_client_update`, `avoir_client_delete`, `mvt_treso_create`, `mvt_treso_read`, `mvt_treso_update`, `mvts_treso_delete`, `nd_client_create`, `nd_client_read`, `nd_client_update`, `nd_client_delete`, `mvt_interne_create`, `mvt_interne_read`, `mvt_interne_update`, `mvt_interne_delete`, `magasin_create`, `magasin_read`, `magasin_update`, `magasin_delete`, `commande_create`, `commande_read`, `commande_update`, `commande_delete`) VALUES
(1, 'mampi', '123456', 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0),
(2, 'user1', '123456', 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_avoirs_client_headers`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_avoirs_client_headers` (
`num_avoir` int(4) unsigned zerofill
,`commande_uid` int(10) unsigned
,`datetime` timestamp
,`facture_client_uid` int(10) unsigned
,`type` tinyint(3) unsigned
,`user_uid` int(10) unsigned
,`user_name` varchar(45)
,`client_uid` int(10) unsigned
,`libelle` varchar(45)
,`state` tinyint(3) unsigned
,`total_ht_avant_remise` double(14,2)
,`total_ttc_avant_remise` double(14,2)
,`remise_taux` double(14,2)
,`remise_montant` double(14,2)
,`total_ht_apres_remise` double(14,2)
,`total_ttc_apres_remise` double(14,2)
,`noms` varchar(60)
,`prenoms` varchar(60)
,`nom_commercial` varchar(45)
,`raison_sociale` varchar(45)
,`magasin_uid` int(10) unsigned
,`magasin_name` varchar(45)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_clients`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_clients` (
`uid` int(10) unsigned
,`type_personnality_uid` int(10) unsigned
,`adress` varchar(45)
,`nif` varchar(45)
,`stat` varchar(45)
,`rcs` varchar(12)
,`phone1` varchar(15)
,`phone2` varchar(15)
,`mail1` varchar(45)
,`mail2` varchar(45)
,`active_tiers` tinyint(3) unsigned
,`note` text
,`type_vente` tinyint(3) unsigned
,`encours` double(14,2)
,`nb_jour` int(10) unsigned
,`evaluation` tinyint(3) unsigned
,`declarable` tinyint(3) unsigned
,`commissionable` tinyint(3) unsigned
,`noms` varchar(60)
,`prenoms` varchar(60)
,`cin` varchar(12)
,`cin_date` varchar(10)
,`cin_lieu` varchar(45)
,`naissance_date` varchar(10)
,`naissance_lieu` varchar(45)
,`nom_commercial` varchar(45)
,`raison_sociale` varchar(45)
,`active_client` tinyint(3) unsigned
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_commandes_details`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_commandes_details` (
`uid` int(10) unsigned
,`commande_uid` int(10) unsigned
,`item_uid` varchar(20)
,`stockable` tinyint(3) unsigned
,`identifiable` tinyint(3) unsigned
,`prix_variable` tinyint(4)
,`active` tinyint(4)
,`description_item` text
,`num_serie` varchar(100)
,`quantity` double(14,2)
,`prix_unitaire` double(14,2)
,`prix_total` double(14,2)
,`commande_initial_uid` int(10) unsigned
,`item_name` varchar(45)
,`type_avoir` decimal(3,0)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_commandes_details_v3`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_commandes_details_v3` (
`uid` int(10) unsigned
,`commande_uid` int(10) unsigned
,`item_uid` varchar(20)
,`stockable` tinyint(3) unsigned
,`identifiable` tinyint(3) unsigned
,`prix_variable` tinyint(4)
,`active` tinyint(4)
,`description_item` tinytext
,`num_serie` varchar(100)
,`quantity` double(14,2)
,`prix_unitaire` double(14,2) unsigned
,`prix_total` double(14,2)
,`commande_initial_uid` int(10) unsigned
,`item_name` varchar(45)
,`type_avoir` tinyint(3) unsigned
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_commandes_headers`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_commandes_headers` (
`uid` int(10) unsigned
,`client_uid` int(10) unsigned
,`date` date
,`magasin_uid` int(10) unsigned
,`libelle` varchar(45)
,`state` tinyint(3) unsigned
,`user_uid` int(10) unsigned
,`user_name` varchar(45)
,`datetime` timestamp
,`total_ht_avant_remise` double(14,2)
,`total_ttc_avant_remise` double(14,2)
,`remise_taux` double(14,2)
,`remise_montant` double(14,2)
,`total_ht_apres_remise` double(14,2)
,`total_ttc_apres_remise` double(14,2)
,`noms` varchar(60)
,`prenoms` varchar(60)
,`nom_commercial` varchar(45)
,`raison_sociale` varchar(45)
,`magasin_name` varchar(45)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_factures_client_headers`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_factures_client_headers` (
`num_facture` int(5) unsigned zerofill
,`commande_uid` int(10) unsigned
,`datetime` timestamp
,`user_uid` int(10) unsigned
,`user_name` varchar(45)
,`payment` tinyint(3) unsigned
,`client_uid` int(10) unsigned
,`libelle` varchar(45)
,`state` tinyint(3) unsigned
,`total_ht_avant_remise` double(14,2)
,`total_ttc_avant_remise` double(14,2)
,`remise_taux` double(14,2)
,`remise_montant` double(14,2)
,`total_ht_apres_remise` double(14,2)
,`total_ttc_apres_remise` double(14,2)
,`noms` varchar(60)
,`prenoms` varchar(60)
,`nom_commercial` varchar(45)
,`raison_sociale` varchar(45)
,`magasin_uid` int(10) unsigned
,`magasin_name` varchar(45)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_factures_fournisseur_details`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_factures_fournisseur_details` (
`uid` int(10) unsigned
,`facture_uid` int(10) unsigned
,`item_uid` varchar(20)
,`stockable` tinyint(3) unsigned
,`identifiable` tinyint(3) unsigned
,`prix_variable` tinyint(4)
,`active` tinyint(4)
,`description_item` tinytext
,`num_serie` varchar(100)
,`quantity` double(14,2)
,`prix_unitaire` double(14,2) unsigned
,`prix_total` double(14,2)
,`item_name` varchar(45)
,`return_item` tinyint(4)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_factures_fournisseur_headers`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_factures_fournisseur_headers` (
`uid` int(10) unsigned
,`fournisseur_uid` int(10) unsigned
,`num_facture` varchar(20)
,`date` date
,`libelle` varchar(45)
,`state` tinyint(3) unsigned
,`magasin_uid` int(10) unsigned
,`magasin_name` varchar(45)
,`user_uid` int(10) unsigned
,`user_name` varchar(45)
,`tva_flag` tinyint(1)
,`datetime` timestamp
,`total_ht_avant_remise` double(14,2)
,`total_ttc_avant_remise` double(14,2)
,`remise_taux` double(14,2)
,`remise_montant` double(14,2)
,`total_ht_apres_remise` double(14,2)
,`total_ttc_apres_remise` double(14,2)
,`tva_apres_remise` double(14,2)
,`noms` varchar(60)
,`prenoms` varchar(60)
,`nom_commercial` varchar(45)
,`raison_sociale` varchar(45)
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_fournisseurs`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_fournisseurs` (
`uid` int(10) unsigned
,`type_personnality_uid` int(10) unsigned
,`adress` varchar(45)
,`nif` varchar(45)
,`stat` varchar(45)
,`rcs` varchar(12)
,`phone1` varchar(15)
,`phone2` varchar(15)
,`mail1` varchar(45)
,`mail2` varchar(45)
,`active_tiers` tinyint(3) unsigned
,`note` text
,`encours` double(14,2)
,`nb_jour` int(10) unsigned
,`evaluation` tinyint(3) unsigned
,`declarable` tinyint(3) unsigned
,`noms` varchar(60)
,`prenoms` varchar(60)
,`cin` varchar(12)
,`cin_date` varchar(10)
,`cin_lieu` varchar(45)
,`naissance_date` varchar(10)
,`naissance_lieu` varchar(45)
,`nom_commercial` varchar(45)
,`raison_sociale` varchar(45)
,`active_fournisseur` tinyint(3) unsigned
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_items`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_items` (
`uid` int(10) unsigned
,`code` varchar(20)
,`active` tinyint(4)
,`declarable` tinyint(3) unsigned
,`name` varchar(45)
,`type_item` tinyint(3) unsigned
,`famille_uid` int(10) unsigned
,`famille` varchar(45)
,`categorie_uid` int(10) unsigned
,`categorie` varchar(45)
,`unite_mesure_uid` int(10) unsigned
,`stockable` tinyint(3) unsigned
,`identifiable` tinyint(3) unsigned
,`prix_vente` double(14,2) unsigned
,`prix_achat_mp` double(14,2) unsigned
,`note` tinytext
,`prix_variable` tinyint(4)
,`stock` double(14,2) unsigned
,`pour_achat` tinyint(3) unsigned
,`pour_vente` tinyint(3) unsigned
);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `view_all_items-old`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `view_all_items-old` (
`uid` int(10) unsigned
,`code` varchar(20)
,`active` tinyint(4)
,`declarable` tinyint(3) unsigned
,`name` varchar(45)
,`type_item` tinyint(3) unsigned
,`famille_uid` int(10) unsigned
,`famille` varchar(45)
,`categorie_uid` int(10) unsigned
,`categorie` varchar(45)
,`unite_mesure_uid` int(10) unsigned
,`stockable` tinyint(3) unsigned
,`identifiable` tinyint(3) unsigned
,`prix_vente` double(14,2) unsigned
,`prix_achat_mp` double(14,2) unsigned
,`note` tinytext
);

-- --------------------------------------------------------

--
-- Structure de la table `wallets_electonic`
--

CREATE TABLE `wallets_electonic` (
  `uid` int(10) UNSIGNED NOT NULL,
  `mail` varchar(45) NOT NULL,
  `url` varchar(45) NOT NULL,
  `account_id` varchar(45) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_avoirs_client_headers`
--
DROP TABLE IF EXISTS `view_all_avoirs_client_headers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_avoirs_client_headers`  AS SELECT `avoirs_client`.`num_avoir` AS `num_avoir`, `avoirs_client`.`commande_uid` AS `commande_uid`, `avoirs_client`.`datetime` AS `datetime`, `avoirs_client`.`facture_client_uid` AS `facture_client_uid`, `avoirs_client`.`type` AS `type`, `avoirs_client`.`user_uid` AS `user_uid`, `users`.`login` AS `user_name`, `view_all_commandes_headers`.`client_uid` AS `client_uid`, `view_all_commandes_headers`.`libelle` AS `libelle`, `view_all_commandes_headers`.`state` AS `state`, `view_all_commandes_headers`.`total_ht_avant_remise` AS `total_ht_avant_remise`, `view_all_commandes_headers`.`total_ttc_avant_remise` AS `total_ttc_avant_remise`, `view_all_commandes_headers`.`remise_taux` AS `remise_taux`, `view_all_commandes_headers`.`remise_montant` AS `remise_montant`, `view_all_commandes_headers`.`total_ht_apres_remise` AS `total_ht_apres_remise`, `view_all_commandes_headers`.`total_ttc_apres_remise` AS `total_ttc_apres_remise`, `view_all_commandes_headers`.`noms` AS `noms`, `view_all_commandes_headers`.`prenoms` AS `prenoms`, `view_all_commandes_headers`.`nom_commercial` AS `nom_commercial`, `view_all_commandes_headers`.`raison_sociale` AS `raison_sociale`, `view_all_commandes_headers`.`magasin_uid` AS `magasin_uid`, `view_all_commandes_headers`.`magasin_name` AS `magasin_name` FROM ((`avoirs_client` join `view_all_commandes_headers` on(`avoirs_client`.`commande_uid` = `view_all_commandes_headers`.`uid`)) join `users` on(`users`.`uid` = `avoirs_client`.`user_uid`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_clients`
--
DROP TABLE IF EXISTS `view_all_clients`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_clients`  AS SELECT `sub`.`uid` AS `uid`, `sub`.`type_personnality_uid` AS `type_personnality_uid`, `sub`.`adress` AS `adress`, `sub`.`nif` AS `nif`, `sub`.`stat` AS `stat`, `sub`.`rcs` AS `rcs`, `sub`.`phone1` AS `phone1`, `sub`.`phone2` AS `phone2`, `sub`.`mail1` AS `mail1`, `sub`.`mail2` AS `mail2`, `sub`.`active_tiers` AS `active_tiers`, `sub`.`note` AS `note`, `sub`.`type_vente` AS `type_vente`, `sub`.`encours` AS `encours`, `sub`.`nb_jour` AS `nb_jour`, `sub`.`evaluation` AS `evaluation`, `sub`.`declarable` AS `declarable`, `sub`.`commissionable` AS `commissionable`, `sub`.`noms` AS `noms`, `sub`.`prenoms` AS `prenoms`, `sub`.`cin` AS `cin`, `sub`.`cin_date` AS `cin_date`, `sub`.`cin_lieu` AS `cin_lieu`, `sub`.`naissance_date` AS `naissance_date`, `sub`.`naissance_lieu` AS `naissance_lieu`, `sub`.`nom_commercial` AS `nom_commercial`, `sub`.`raison_sociale` AS `raison_sociale`, `sub`.`active_client` AS `active_client` FROM (select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`clients`.`type_vente` AS `type_vente`,`clients`.`encours` AS `encours`,`clients`.`nb_jour` AS `nb_jour`,`clients`.`evaluation` AS `evaluation`,`clients`.`declarable` AS `declarable`,`clients`.`commissionable` AS `commissionable`,`humans`.`noms` AS `noms`,`humans`.`prenoms` AS `prenoms`,`humans`.`cin` AS `cin`,`humans`.`cin_date` AS `cin_date`,`humans`.`cin_lieu` AS `cin_lieu`,`humans`.`naissance_date` AS `naissance_date`,`humans`.`naissance_lieu` AS `naissance_lieu`,'' AS `nom_commercial`,'' AS `raison_sociale`,`clients`.`active_client` AS `active_client` from ((`tiers` join `humans` on(`tiers`.`uid` = `humans`.`uid`)) join `clients` on(`tiers`.`uid` = `clients`.`uid`)) union select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`clients`.`type_vente` AS `type_vente`,`clients`.`encours` AS `encours`,`clients`.`nb_jour` AS `nb_jour`,`clients`.`evaluation` AS `evaluation`,`clients`.`declarable` AS `declarable`,`clients`.`commissionable` AS `commissionable`,'' AS `noms`,'' AS `prenoms`,'' AS `cin`,'' AS `cin_date`,'' AS `cin_lieu`,'' AS `naissance_date`,'' AS `naissance_lieu`,`companies`.`nom_commercial` AS `nom_commercial`,`companies`.`raison_sociale` AS `raison_sociale`,`clients`.`active_client` AS `active_client` from ((`tiers` join `companies` on(`tiers`.`uid` = `companies`.`uid`)) join `clients` on(`tiers`.`uid` = `clients`.`uid`))) AS `sub` ORDER BY `sub`.`uid` ASC ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_commandes_details`
--
DROP TABLE IF EXISTS `view_all_commandes_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_commandes_details`  AS SELECT `commandes_details`.`uid` AS `uid`, `commandes_details`.`commande_uid` AS `commande_uid`, `commandes_details`.`item_uid` AS `item_uid`, `items`.`stockable` AS `stockable`, `items`.`identifiable` AS `identifiable`, `items`.`prix_variable` AS `prix_variable`, `items`.`active` AS `active`, `commandes_details`.`description_item` AS `description_item`, `commandes_details`.`num_serie` AS `num_serie`, `commandes_details`.`quantity` AS `quantity`, `commandes_details`.`prix_unitaire` AS `prix_unitaire`, `commandes_details`.`prix_total` AS `prix_total`, `commandes_details`.`commande_initial_uid` AS `commande_initial_uid`, `items`.`name` AS `item_name`, NULL AS `type_avoir` FROM ((`commandes_details` join `items` on(`commandes_details`.`item_uid` = `items`.`code`)) join `commandes` on(`commandes_details`.`commande_uid` = `commandes`.`uid`)) WHERE `commandes`.`state` UNION SELECT `commandes_details`.`uid` AS `uid`,`commandes_details`.`commande_uid` AS `commande_uid`,`commandes_details`.`item_uid` AS `item_uid`,`items`.`stockable` AS `stockable`,`items`.`identifiable` AS `identifiable`,`items`.`prix_variable` AS `prix_variable`,`items`.`active` AS `active`,`commandes_details`.`description_item` AS `description_item`,`commandes_details`.`num_serie` AS `num_serie`,`commandes_details`.`quantity` AS `quantity`,`commandes_details`.`prix_unitaire` AS `prix_unitaire`,`commandes_details`.`prix_total` AS `prix_total`,`commandes_details`.`commande_initial_uid` AS `commande_initial_uid`,`items`.`name` AS `item_name`,`avoirs_client`.`type` AS `type_avoir` from ((`commandes_details` join `avoirs_client` on(`commandes_details`.`commande_uid` = `avoirs_client`.`commande_uid`)) join `items` on(`commandes_details`.`item_uid` = `items`.`code`)) order by `uid`  ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_commandes_details_v3`
--
DROP TABLE IF EXISTS `view_all_commandes_details_v3`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_commandes_details_v3`  AS SELECT `commandes_details`.`uid` AS `uid`, `commandes_details`.`commande_uid` AS `commande_uid`, `commandes_details`.`item_uid` AS `item_uid`, `items`.`stockable` AS `stockable`, `items`.`identifiable` AS `identifiable`, `items`.`prix_variable` AS `prix_variable`, `items`.`active` AS `active`, `commandes_details`.`description_item` AS `description_item`, `commandes_details`.`num_serie` AS `num_serie`, `commandes_details`.`quantity` AS `quantity`, `commandes_details`.`prix_unitaire` AS `prix_unitaire`, `commandes_details`.`prix_total` AS `prix_total`, `commandes_details`.`commande_initial_uid` AS `commande_initial_uid`, `items`.`name` AS `item_name`, `avoirs_client`.`type` AS `type_avoir` FROM ((`commandes_details` join `items` on(`commandes_details`.`item_uid` = `items`.`code`)) join `avoirs_client` on(`commandes_details`.`commande_uid` = `avoirs_client`.`commande_uid`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_commandes_headers`
--
DROP TABLE IF EXISTS `view_all_commandes_headers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_commandes_headers`  AS SELECT `commandes`.`uid` AS `uid`, `commandes`.`client_uid` AS `client_uid`, `commandes`.`date` AS `date`, `commandes`.`magasin_uid` AS `magasin_uid`, `commandes`.`libelle` AS `libelle`, `commandes`.`state` AS `state`, `commandes`.`user_uid` AS `user_uid`, `users`.`login` AS `user_name`, `commandes`.`datetime` AS `datetime`, `commandes`.`total_ht_avant_remise` AS `total_ht_avant_remise`, `commandes`.`total_ttc_avant_remise` AS `total_ttc_avant_remise`, `commandes`.`remise_taux` AS `remise_taux`, `commandes`.`remise_montant` AS `remise_montant`, `commandes`.`total_ht_apres_remise` AS `total_ht_apres_remise`, `commandes`.`total_ttc_apres_remise` AS `total_ttc_apres_remise`, `view_all_clients`.`noms` AS `noms`, `view_all_clients`.`prenoms` AS `prenoms`, `view_all_clients`.`nom_commercial` AS `nom_commercial`, `view_all_clients`.`raison_sociale` AS `raison_sociale`, `magasins`.`name` AS `magasin_name` FROM (((`commandes` join `view_all_clients` on(`view_all_clients`.`uid` = `commandes`.`client_uid`)) join `magasins` on(`magasins`.`uid` = `commandes`.`magasin_uid`)) join `users` on(`users`.`uid` = `commandes`.`user_uid`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_factures_client_headers`
--
DROP TABLE IF EXISTS `view_all_factures_client_headers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_factures_client_headers`  AS SELECT `factures_client`.`num_facture` AS `num_facture`, `factures_client`.`commande_uid` AS `commande_uid`, `factures_client`.`datetime` AS `datetime`, `factures_client`.`user_uid` AS `user_uid`, `users`.`login` AS `user_name`, `factures_client`.`payment` AS `payment`, `view_all_commandes_headers`.`client_uid` AS `client_uid`, `view_all_commandes_headers`.`libelle` AS `libelle`, `view_all_commandes_headers`.`state` AS `state`, `view_all_commandes_headers`.`total_ht_avant_remise` AS `total_ht_avant_remise`, `view_all_commandes_headers`.`total_ttc_avant_remise` AS `total_ttc_avant_remise`, `view_all_commandes_headers`.`remise_taux` AS `remise_taux`, `view_all_commandes_headers`.`remise_montant` AS `remise_montant`, `view_all_commandes_headers`.`total_ht_apres_remise` AS `total_ht_apres_remise`, `view_all_commandes_headers`.`total_ttc_apres_remise` AS `total_ttc_apres_remise`, `view_all_commandes_headers`.`noms` AS `noms`, `view_all_commandes_headers`.`prenoms` AS `prenoms`, `view_all_commandes_headers`.`nom_commercial` AS `nom_commercial`, `view_all_commandes_headers`.`raison_sociale` AS `raison_sociale`, `view_all_commandes_headers`.`magasin_uid` AS `magasin_uid`, `view_all_commandes_headers`.`magasin_name` AS `magasin_name` FROM ((`factures_client` join `view_all_commandes_headers` on(`factures_client`.`commande_uid` = `view_all_commandes_headers`.`uid`)) join `users` on(`users`.`uid` = `factures_client`.`user_uid`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_factures_fournisseur_details`
--
DROP TABLE IF EXISTS `view_all_factures_fournisseur_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_factures_fournisseur_details`  AS SELECT `factures_fournisseur_details`.`uid` AS `uid`, `factures_fournisseur_details`.`facture_uid` AS `facture_uid`, `factures_fournisseur_details`.`item_uid` AS `item_uid`, `items`.`stockable` AS `stockable`, `items`.`identifiable` AS `identifiable`, `items`.`prix_variable` AS `prix_variable`, `items`.`active` AS `active`, `factures_fournisseur_details`.`description_item` AS `description_item`, `factures_fournisseur_details`.`num_serie` AS `num_serie`, `factures_fournisseur_details`.`quantity` AS `quantity`, `factures_fournisseur_details`.`prix_unitaire` AS `prix_unitaire`, `factures_fournisseur_details`.`prix_total` AS `prix_total`, `items`.`name` AS `item_name`, `factures_fournisseur_details`.`return_item` AS `return_item` FROM (`factures_fournisseur_details` join `items` on(`factures_fournisseur_details`.`item_uid` = `items`.`code`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_factures_fournisseur_headers`
--
DROP TABLE IF EXISTS `view_all_factures_fournisseur_headers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_factures_fournisseur_headers`  AS SELECT `factures_fournisseur`.`uid` AS `uid`, `factures_fournisseur`.`fournisseur_uid` AS `fournisseur_uid`, `factures_fournisseur`.`num_facture` AS `num_facture`, `factures_fournisseur`.`date` AS `date`, `factures_fournisseur`.`libelle` AS `libelle`, `factures_fournisseur`.`state` AS `state`, `factures_fournisseur`.`magasin_uid` AS `magasin_uid`, `magasins`.`name` AS `magasin_name`, `factures_fournisseur`.`user_uid` AS `user_uid`, `users`.`login` AS `user_name`, `factures_fournisseur`.`tva_flag` AS `tva_flag`, `factures_fournisseur`.`datetime` AS `datetime`, `factures_fournisseur`.`total_ht_avant_remise` AS `total_ht_avant_remise`, `factures_fournisseur`.`total_ttc_avant_remise` AS `total_ttc_avant_remise`, `factures_fournisseur`.`remise_taux` AS `remise_taux`, `factures_fournisseur`.`remise_montant` AS `remise_montant`, `factures_fournisseur`.`total_ht_apres_remise` AS `total_ht_apres_remise`, `factures_fournisseur`.`total_ttc_apres_remise` AS `total_ttc_apres_remise`, `factures_fournisseur`.`tva_apres_remise` AS `tva_apres_remise`, `view_all_fournisseurs`.`noms` AS `noms`, `view_all_fournisseurs`.`prenoms` AS `prenoms`, `view_all_fournisseurs`.`nom_commercial` AS `nom_commercial`, `view_all_fournisseurs`.`raison_sociale` AS `raison_sociale` FROM (((`factures_fournisseur` join `view_all_fournisseurs` on(`factures_fournisseur`.`fournisseur_uid` = `view_all_fournisseurs`.`uid`)) join `users` on(`users`.`uid` = `factures_fournisseur`.`user_uid`)) join `magasins` on(`magasins`.`uid` = `factures_fournisseur`.`magasin_uid`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_fournisseurs`
--
DROP TABLE IF EXISTS `view_all_fournisseurs`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_fournisseurs`  AS SELECT `sub`.`uid` AS `uid`, `sub`.`type_personnality_uid` AS `type_personnality_uid`, `sub`.`adress` AS `adress`, `sub`.`nif` AS `nif`, `sub`.`stat` AS `stat`, `sub`.`rcs` AS `rcs`, `sub`.`phone1` AS `phone1`, `sub`.`phone2` AS `phone2`, `sub`.`mail1` AS `mail1`, `sub`.`mail2` AS `mail2`, `sub`.`active_tiers` AS `active_tiers`, `sub`.`note` AS `note`, `sub`.`encours` AS `encours`, `sub`.`nb_jour` AS `nb_jour`, `sub`.`evaluation` AS `evaluation`, `sub`.`declarable` AS `declarable`, `sub`.`noms` AS `noms`, `sub`.`prenoms` AS `prenoms`, `sub`.`cin` AS `cin`, `sub`.`cin_date` AS `cin_date`, `sub`.`cin_lieu` AS `cin_lieu`, `sub`.`naissance_date` AS `naissance_date`, `sub`.`naissance_lieu` AS `naissance_lieu`, `sub`.`nom_commercial` AS `nom_commercial`, `sub`.`raison_sociale` AS `raison_sociale`, `sub`.`active_fournisseur` AS `active_fournisseur` FROM (select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`fournisseurs`.`encours` AS `encours`,`fournisseurs`.`nb_jour` AS `nb_jour`,`fournisseurs`.`evaluation` AS `evaluation`,`fournisseurs`.`declarable` AS `declarable`,`humans`.`noms` AS `noms`,`humans`.`prenoms` AS `prenoms`,`humans`.`cin` AS `cin`,`humans`.`cin_date` AS `cin_date`,`humans`.`cin_lieu` AS `cin_lieu`,`humans`.`naissance_date` AS `naissance_date`,`humans`.`naissance_lieu` AS `naissance_lieu`,'' AS `nom_commercial`,'' AS `raison_sociale`,`fournisseurs`.`active_fournisseur` AS `active_fournisseur` from ((`tiers` join `humans` on(`tiers`.`uid` = `humans`.`uid`)) join `fournisseurs` on(`tiers`.`uid` = `fournisseurs`.`uid`)) union select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`fournisseurs`.`encours` AS `encours`,`fournisseurs`.`nb_jour` AS `nb_jour`,`fournisseurs`.`evaluation` AS `evaluation`,`fournisseurs`.`declarable` AS `declarable`,'' AS `noms`,'' AS `prenoms`,'' AS `cin`,'' AS `cin_date`,'' AS `cin_lieu`,'' AS `naissance_date`,'' AS `naissance_lieu`,`companies`.`nom_commercial` AS `nom_commercial`,`companies`.`raison_sociale` AS `raison_sociale`,`fournisseurs`.`active_fournisseur` AS `active_fournisseur` from ((`tiers` join `companies` on(`tiers`.`uid` = `companies`.`uid`)) join `fournisseurs` on(`tiers`.`uid` = `fournisseurs`.`uid`))) AS `sub` ORDER BY `sub`.`uid` ASC ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_items`
--
DROP TABLE IF EXISTS `view_all_items`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_items`  AS SELECT `items`.`uid` AS `uid`, `items`.`code` AS `code`, `items`.`active` AS `active`, `items`.`declarable` AS `declarable`, `items`.`name` AS `name`, `items`.`type_item` AS `type_item`, `items`.`family_uid` AS `famille_uid`, `familles`.`name` AS `famille`, `items`.`category_uid` AS `categorie_uid`, `categories`.`name` AS `categorie`, `items`.`unite_mesure_uid` AS `unite_mesure_uid`, `items`.`stockable` AS `stockable`, `items`.`identifiable` AS `identifiable`, `items`.`prix_vente` AS `prix_vente`, `items`.`prix_achat_mp` AS `prix_achat_mp`, `items`.`note` AS `note`, `items`.`prix_variable` AS `prix_variable`, `items`.`stock` AS `stock`, `items`.`pour_achat` AS `pour_achat`, `items`.`pour_vente` AS `pour_vente` FROM ((`items` join `familles` on(`familles`.`uid` = `items`.`family_uid`)) join `categories` on(`categories`.`uid` = `items`.`category_uid`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_items-old`
--
DROP TABLE IF EXISTS `view_all_items-old`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_items-old`  AS SELECT `items`.`uid` AS `uid`, `items`.`code` AS `code`, `items`.`active` AS `active`, `items`.`declarable` AS `declarable`, `items`.`name` AS `name`, `items`.`type_item` AS `type_item`, `items`.`family_uid` AS `famille_uid`, `familles`.`name` AS `famille`, `items`.`category_uid` AS `categorie_uid`, `categories`.`name` AS `categorie`, `items`.`unite_mesure_uid` AS `unite_mesure_uid`, `items`.`stockable` AS `stockable`, `items`.`identifiable` AS `identifiable`, `items`.`prix_vente` AS `prix_vente`, `items`.`prix_achat_mp` AS `prix_achat_mp`, `items`.`note` AS `note` FROM ((`items` join `familles` on(`familles`.`uid` = `items`.`family_uid`)) join `categories` on(`categories`.`uid` = `items`.`category_uid`)) ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `affectations_achat`
--
ALTER TABLE `affectations_achat`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_affectations_achat_facture_fournisseur_uid_idx` (`facture_fournisseur_uid`),
  ADD KEY `fk_affectations_achat_facture_commande_uid_idx` (`commande_uid`);

--
-- Index pour la table `arretes_banque`
--
ALTER TABLE `arretes_banque`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_arretes_banque_banque_uid_idx` (`banque_uid`),
  ADD KEY `fk_arretes_banque_user_uid_idx` (`user_uid`);

--
-- Index pour la table `arretes_caisse`
--
ALTER TABLE `arretes_caisse`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_arretes_caisse_caisse_uid_idx` (`caisse_uid`),
  ADD KEY `fk_arretes_caisse_user_uid_idx` (`user_uid`);

--
-- Index pour la table `arretes_mobile_money`
--
ALTER TABLE `arretes_mobile_money`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_arretes_mobile_money_operateur_uid_idx` (`operateur_uid`),
  ADD KEY `fk_arretes_mobile_money_user_uid_idx` (`user_uid`);

--
-- Index pour la table `arretes_stock`
--
ALTER TABLE `arretes_stock`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_arretes_stock_item_uid_idx` (`item_uid`),
  ADD KEY `fk_arrete_stock_magasin_uid_idx` (`magasin_uid`),
  ADD KEY `fk_arretes_stock_user_uid_idx` (`user_uid`);

--
-- Index pour la table `arretes_wallet_electronic`
--
ALTER TABLE `arretes_wallet_electronic`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_arretes_wallet_electronic_wallet_electronic_uid_idx` (`wallet_electronic_uid`),
  ADD KEY `fk_arretes_wallet_electronic_user_uid_idx` (`user_uid`);

--
-- Index pour la table `avoirs_client`
--
ALTER TABLE `avoirs_client`
  ADD PRIMARY KEY (`num_avoir`),
  ADD KEY `fk_avoir_client_facture_client_uid_idx` (`facture_client_uid`);

--
-- Index pour la table `avoirs_client_details`
--
ALTER TABLE `avoirs_client_details`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `banques`
--
ALTER TABLE `banques`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_banques_devise_uid_idx` (`devise_uid`);

--
-- Index pour la table `bons_entree`
--
ALTER TABLE `bons_entree`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_bons_entree_tier_uid_idx` (`sender_uid`),
  ADD KEY `fk_bons_entree_magasin_uid_idx` (`magasin_uid`);

--
-- Index pour la table `bons_sortie`
--
ALTER TABLE `bons_sortie`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_bons_sortie_tier_uid_idx` (`receiver_uid`),
  ADD KEY `fk_bons_sortie_magasin_uid_idx` (`magasin_uid`);

--
-- Index pour la table `caisses`
--
ALTER TABLE `caisses`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `idcaisses_UNIQUE` (`uid`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_commandes_user_uid_idx` (`user_uid`),
  ADD KEY `fk_commandes_magasin_uid` (`magasin_uid`),
  ADD KEY `fk_commandes_client_uid` (`client_uid`);

--
-- Index pour la table `commandes_details`
--
ALTER TABLE `commandes_details`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_commandes_details_commande_uid_idx` (`commande_uid`),
  ADD KEY `fk_commandes_details_item_code` (`item_uid`),
  ADD KEY `fk_commandes_details_commande_initial_uid` (`commande_initial_uid`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `credits`
--
ALTER TABLE `credits`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `devis`
--
ALTER TABLE `devis`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_devis_user_uid_idx` (`user_uid`);

--
-- Index pour la table `devises`
--
ALTER TABLE `devises`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `iso_UNIQUE` (`iso`),
  ADD UNIQUE KEY `sigle_UNIQUE` (`sigle`);

--
-- Index pour la table `devis_détails`
--
ALTER TABLE `devis_détails`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_devis_details_commande_uid_idx` (`devis_uid`),
  ADD KEY `fk_devis_details_item_uid_idx` (`item_uid`);

--
-- Index pour la table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `matricule_UNIQUE` (`matricule`),
  ADD KEY `fk_employees_magasin_uid_idx` (`principal_magasin_uid`);

--
-- Index pour la table `employees_avantages`
--
ALTER TABLE `employees_avantages`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_employees_avantages_employees_uid_idx` (`employee_uid`),
  ADD KEY `fk_employees_avantages_types_uid_idx` (`avantage_type`);

--
-- Index pour la table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_entries_user_uid_idx` (`user_uid`);

--
-- Index pour la table `factures_client`
--
ALTER TABLE `factures_client`
  ADD PRIMARY KEY (`num_facture`),
  ADD KEY `fk_factures_client_commande_uid_idx` (`commande_uid`),
  ADD KEY `fk_factures_client_user_uid` (`user_uid`);

--
-- Index pour la table `factures_fournisseur`
--
ALTER TABLE `factures_fournisseur`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `fk_fact_frnsr_frnsr_uid` (`fournisseur_uid`),
  ADD KEY `fk_fact_frnsr_magasin_uid` (`magasin_uid`);

--
-- Index pour la table `factures_fournisseur_details`
--
ALTER TABLE `factures_fournisseur_details`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_factures_fournisseur_details_factures_fournisseur_uid_idx` (`facture_uid`),
  ADD KEY `fk_factures_fournisseur_details_item_code` (`item_uid`);

--
-- Index pour la table `factures_fournisseur_old`
--
ALTER TABLE `factures_fournisseur_old`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_factures_fournisseur_fournisseur_uid_idx` (`fournisseur_uid`),
  ADD KEY `fk_factures_fournisseur_commande_uid_idx` (`commande_uid`),
  ADD KEY `fk_factures_fournisseur_magasin_uid_idx` (`magasin_uid`);

--
-- Index pour la table `familles`
--
ALTER TABLE `familles`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `fiche_de_paie`
--
ALTER TABLE `fiche_de_paie`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_fiche_de_paie_employee_uid_idx` (`employee_uid`);

--
-- Index pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `humans`
--
ALTER TABLE `humans`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `identifiables`
--
ALTER TABLE `identifiables`
  ADD PRIMARY KEY (`item_code`,`num_serie`),
  ADD KEY `fk_identifiables_magasin_uid` (`magasin_uid`);

--
-- Index pour la table `insides`
--
ALTER TABLE `insides`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_insides_user_uid_idx` (`user_uid`);

--
-- Index pour la table `inside_details`
--
ALTER TABLE `inside_details`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_outsides_uid_idx` (`outside_uid`),
  ADD KEY `fk_inside_uid_idx` (`inside_uid`);

--
-- Index pour la table `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_institutions_type_institution_uid_idx` (`type_uid`);

--
-- Index pour la table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`code`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `uid_ai` (`uid`) USING BTREE,
  ADD KEY `fk_items_famille_uid_idx` (`family_uid`),
  ADD KEY `fk_items_category_uid_idx` (`category_uid`),
  ADD KEY `fk_items_unite_mesure_uid_idx` (`unite_mesure_uid`);

--
-- Index pour la table `magasins`
--
ALTER TABLE `magasins`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `fk_magasins_user_uid_idx` (`user_uid`);

--
-- Index pour la table `mes_banques`
--
ALTER TABLE `mes_banques`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_mes_banques_banques_uid_idx` (`banque_uid`);

--
-- Index pour la table `mode_pmt_bank`
--
ALTER TABLE `mode_pmt_bank`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `movements`
--
ALTER TABLE `movements`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_movements_item_uid_idx` (`item_uid`);

--
-- Index pour la table `mvts_bank`
--
ALTER TABLE `mvts_bank`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_mvts_bank_mode_pmt_uid_idx` (`mode_uid`),
  ADD KEY `fk_mvts_bank_ma_banque_uid_idx` (`ma_banque_uid`);

--
-- Index pour la table `mvts_caisse`
--
ALTER TABLE `mvts_caisse`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_mvt_caisse_uid_idx` (`caisse_uid`),
  ADD KEY `fk_mvts_caisse_tier_uid_idx` (`porteur_uid`);

--
-- Index pour la table `mvts_credit_client`
--
ALTER TABLE `mvts_credit_client`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_mvts_credit_client_credit_uid_idx` (`treso_uid`);

--
-- Index pour la table `mvts_credit_fournisseur`
--
ALTER TABLE `mvts_credit_fournisseur`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_mvts_credit_fournisseur_credit_uid_idx` (`treso_uid`);

--
-- Index pour la table `mvts_internes`
--
ALTER TABLE `mvts_internes`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_mvts_internes_origine_uid_idx` (`origin_uid`),
  ADD KEY `fk_mvts_internes_destination_uid_idx` (`destination_uid`);

--
-- Index pour la table `mvts_mobile_money`
--
ALTER TABLE `mvts_mobile_money`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_mvts_mobile_money_operateur_uid_idx` (`operateur_uid`);

--
-- Index pour la table `mvts_wallet_electronic`
--
ALTER TABLE `mvts_wallet_electronic`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD KEY `fk_mvts_wallet_electronic_wallet_electronic_uid_idx` (`wallet_electronic_uid`);

--
-- Index pour la table `nd_client`
--
ALTER TABLE `nd_client`
  ADD PRIMARY KEY (`num_nd`),
  ADD KEY `fk_nd_client_uid_idx` (`client_uid`),
  ADD KEY `fk_nd_outside_uid_idx` (`outside_uid`),
  ADD KEY `fk_nd_commercial_uid_idx` (`commercial_uid`);

--
-- Index pour la table `operateurs`
--
ALTER TABLE `operateurs`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD UNIQUE KEY `phone_number_UNIQUE` (`phone_number`);

--
-- Index pour la table `outsides`
--
ALTER TABLE `outsides`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_outsides_types_idx` (`type_uid`);

--
-- Index pour la table `params`
--
ALTER TABLE `params`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_params_tier_uid_idx` (`tiers_uid`),
  ADD KEY `fk_params_devise_uid_idx` (`devise_int`);

--
-- Index pour la table `sme`
--
ALTER TABLE `sme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `smie`
--
ALTER TABLE `smie`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `the_compamy`
--
ALTER TABLE `the_compamy`
  ADD PRIMARY KEY (`raison_sociale`);

--
-- Index pour la table `tiers`
--
ALTER TABLE `tiers`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_tiers_type_personality_uid_idx` (`type_personnality_uid`);

--
-- Index pour la table `transferts_internes`
--
ALTER TABLE `transferts_internes`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_transferts_internes_treso_source_uid_idx` (`source_uid`),
  ADD KEY `fk_transferts_internes_treso_destination_uid_idx` (`destination_uid`);

--
-- Index pour la table `tresos`
--
ALTER TABLE `tresos`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD KEY `fkt_tresos_type_treso_uid_idx` (`type_treso_uid`),
  ADD KEY `fkt_tresos_type_devise_uid_idx` (`devise_uid`);

--
-- Index pour la table `types_avantage`
--
ALTER TABLE `types_avantage`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `types_institutions`
--
ALTER TABLE `types_institutions`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `types_obligations`
--
ALTER TABLE `types_obligations`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `types_outsides`
--
ALTER TABLE `types_outsides`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`);

--
-- Index pour la table `types_personality`
--
ALTER TABLE `types_personality`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `types_tiers`
--
ALTER TABLE `types_tiers`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `types_treso`
--
ALTER TABLE `types_treso`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `unites_mesure`
--
ALTER TABLE `unites_mesure`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- Index pour la table `wallets_electonic`
--
ALTER TABLE `wallets_electonic`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `uid_UNIQUE` (`uid`),
  ADD UNIQUE KEY `url_UNIQUE` (`url`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `affectations_achat`
--
ALTER TABLE `affectations_achat`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `arretes_banque`
--
ALTER TABLE `arretes_banque`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `arretes_caisse`
--
ALTER TABLE `arretes_caisse`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `arretes_mobile_money`
--
ALTER TABLE `arretes_mobile_money`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `arretes_stock`
--
ALTER TABLE `arretes_stock`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `arretes_wallet_electronic`
--
ALTER TABLE `arretes_wallet_electronic`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `avoirs_client`
--
ALTER TABLE `avoirs_client`
  MODIFY `num_avoir` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `avoirs_client_details`
--
ALTER TABLE `avoirs_client_details`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=271;

--
-- AUTO_INCREMENT pour la table `commandes_details`
--
ALTER TABLE `commandes_details`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=309;

--
-- AUTO_INCREMENT pour la table `credits`
--
ALTER TABLE `credits`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `devis`
--
ALTER TABLE `devis`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `devises`
--
ALTER TABLE `devises`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `devis_détails`
--
ALTER TABLE `devis_détails`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `employees_avantages`
--
ALTER TABLE `employees_avantages`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `entries`
--
ALTER TABLE `entries`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `factures_client`
--
ALTER TABLE `factures_client`
  MODIFY `num_facture` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `factures_fournisseur`
--
ALTER TABLE `factures_fournisseur`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `factures_fournisseur_details`
--
ALTER TABLE `factures_fournisseur_details`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `familles`
--
ALTER TABLE `familles`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `insides`
--
ALTER TABLE `insides`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `inside_details`
--
ALTER TABLE `inside_details`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `items`
--
ALTER TABLE `items`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `magasins`
--
ALTER TABLE `magasins`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `mode_pmt_bank`
--
ALTER TABLE `mode_pmt_bank`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `operateurs`
--
ALTER TABLE `operateurs`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `outsides`
--
ALTER TABLE `outsides`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sme`
--
ALTER TABLE `sme`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `tiers`
--
ALTER TABLE `tiers`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT pour la table `tresos`
--
ALTER TABLE `tresos`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `types_avantage`
--
ALTER TABLE `types_avantage`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `types_institutions`
--
ALTER TABLE `types_institutions`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `types_personality`
--
ALTER TABLE `types_personality`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `types_tiers`
--
ALTER TABLE `types_tiers`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `types_treso`
--
ALTER TABLE `types_treso`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `unites_mesure`
--
ALTER TABLE `unites_mesure`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `wallets_electonic`
--
ALTER TABLE `wallets_electonic`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affectations_achat`
--
ALTER TABLE `affectations_achat`
  ADD CONSTRAINT `fk_affectations_achat_facture_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  ADD CONSTRAINT `fk_affectations_achat_facture_fournisseur_uid` FOREIGN KEY (`facture_fournisseur_uid`) REFERENCES `factures_fournisseur_old` (`uid`);

--
-- Contraintes pour la table `arretes_banque`
--
ALTER TABLE `arretes_banque`
  ADD CONSTRAINT `fk_arretes_banque_banque_uid` FOREIGN KEY (`banque_uid`) REFERENCES `mes_banques` (`uid`),
  ADD CONSTRAINT `fk_arretes_banque_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `arretes_caisse`
--
ALTER TABLE `arretes_caisse`
  ADD CONSTRAINT `fk_arretes_caisse_caisse_uid` FOREIGN KEY (`caisse_uid`) REFERENCES `caisses` (`uid`),
  ADD CONSTRAINT `fk_arretes_caisse_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `arretes_mobile_money`
--
ALTER TABLE `arretes_mobile_money`
  ADD CONSTRAINT `fk_arretes_mobile_money_operateur_uid` FOREIGN KEY (`operateur_uid`) REFERENCES `operateurs` (`uid`),
  ADD CONSTRAINT `fk_arretes_mobile_money_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `arretes_stock`
--
ALTER TABLE `arretes_stock`
  ADD CONSTRAINT `fk_arrete_stock_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_arretes_stock_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `arretes_wallet_electronic`
--
ALTER TABLE `arretes_wallet_electronic`
  ADD CONSTRAINT `fk_arretes_wallet_electronic_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `fk_arretes_wallet_electronic_wallet_electronic_uid` FOREIGN KEY (`wallet_electronic_uid`) REFERENCES `wallets_electonic` (`uid`);

--
-- Contraintes pour la table `avoirs_client`
--
ALTER TABLE `avoirs_client`
  ADD CONSTRAINT `fk_avoir_client_facture_client_uid` FOREIGN KEY (`facture_client_uid`) REFERENCES `factures_client` (`num_facture`);

--
-- Contraintes pour la table `banques`
--
ALTER TABLE `banques`
  ADD CONSTRAINT `fk_banques_devise_uid` FOREIGN KEY (`devise_uid`) REFERENCES `devises` (`uid`),
  ADD CONSTRAINT `fk_banques_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `bons_entree`
--
ALTER TABLE `bons_entree`
  ADD CONSTRAINT `fk_bons_entree_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_bons_entree_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`),
  ADD CONSTRAINT `fk_bons_entree_tier_uid` FOREIGN KEY (`sender_uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `bons_sortie`
--
ALTER TABLE `bons_sortie`
  ADD CONSTRAINT `fk_bons_sortie_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_bons_sortie_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`),
  ADD CONSTRAINT `fk_bons_sortie_tier_uid` FOREIGN KEY (`receiver_uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `caisses`
--
ALTER TABLE `caisses`
  ADD CONSTRAINT `fk_caisses_treso_uid` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`);

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `fk_clients_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `fk_commandes_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  ADD CONSTRAINT `fk_commandes_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_commandes_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `commandes_details`
--
ALTER TABLE `commandes_details`
  ADD CONSTRAINT `fk_commandes_details_commande_initial_uid` FOREIGN KEY (`commande_initial_uid`) REFERENCES `commandes` (`uid`),
  ADD CONSTRAINT `fk_commandes_details_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  ADD CONSTRAINT `fk_commandes_details_item_code` FOREIGN KEY (`item_uid`) REFERENCES `items` (`code`);

--
-- Contraintes pour la table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `fk_companies_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `credits`
--
ALTER TABLE `credits`
  ADD CONSTRAINT `fk_credits_tresos` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`);

--
-- Contraintes pour la table `devis`
--
ALTER TABLE `devis`
  ADD CONSTRAINT `fk_devis_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `devis_détails`
--
ALTER TABLE `devis_détails`
  ADD CONSTRAINT `fk_devis_details_commande_uid` FOREIGN KEY (`devis_uid`) REFERENCES `devis` (`uid`);

--
-- Contraintes pour la table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `fk_employees_magasin_uid` FOREIGN KEY (`principal_magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_employees_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `employees_avantages`
--
ALTER TABLE `employees_avantages`
  ADD CONSTRAINT `fk_employees_avantages_employees_uid` FOREIGN KEY (`employee_uid`) REFERENCES `employees` (`uid`),
  ADD CONSTRAINT `fk_employees_avantages_types_uid` FOREIGN KEY (`avantage_type`) REFERENCES `types_avantage` (`uid`);

--
-- Contraintes pour la table `entries`
--
ALTER TABLE `entries`
  ADD CONSTRAINT `fk_entries_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `factures_client`
--
ALTER TABLE `factures_client`
  ADD CONSTRAINT `fk_factures_client_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  ADD CONSTRAINT `fk_factures_client_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `factures_fournisseur`
--
ALTER TABLE `factures_fournisseur`
  ADD CONSTRAINT `fk_fact_frnsr_frnsr_uid` FOREIGN KEY (`fournisseur_uid`) REFERENCES `fournisseurs` (`uid`),
  ADD CONSTRAINT `fk_fact_frnsr_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`);

--
-- Contraintes pour la table `factures_fournisseur_details`
--
ALTER TABLE `factures_fournisseur_details`
  ADD CONSTRAINT `fk_factures_fournisseur_details_item_code` FOREIGN KEY (`item_uid`) REFERENCES `items` (`code`),
  ADD CONSTRAINT `fk_factures_fournisseur_factures_fournisseur_uid_idx` FOREIGN KEY (`facture_uid`) REFERENCES `factures_fournisseur` (`uid`);

--
-- Contraintes pour la table `factures_fournisseur_old`
--
ALTER TABLE `factures_fournisseur_old`
  ADD CONSTRAINT `fk_factures_fournisseur_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  ADD CONSTRAINT `fk_factures_fournisseur_fournisseur_uid` FOREIGN KEY (`fournisseur_uid`) REFERENCES `fournisseurs` (`uid`),
  ADD CONSTRAINT `fk_factures_fournisseur_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_factures_fournisseur_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `fiche_de_paie`
--
ALTER TABLE `fiche_de_paie`
  ADD CONSTRAINT `fk_fiche_de_paie_employee_uid` FOREIGN KEY (`employee_uid`) REFERENCES `employees` (`uid`),
  ADD CONSTRAINT `fk_fiche_de_paie_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD CONSTRAINT `fk_fournisseurs_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `humans`
--
ALTER TABLE `humans`
  ADD CONSTRAINT `fk_humans_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `identifiables`
--
ALTER TABLE `identifiables`
  ADD CONSTRAINT `fk_identifiables_item_code` FOREIGN KEY (`item_code`) REFERENCES `items` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_identifiables_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `insides`
--
ALTER TABLE `insides`
  ADD CONSTRAINT `fk_insides_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `inside_details`
--
ALTER TABLE `inside_details`
  ADD CONSTRAINT `fk_inside_uid` FOREIGN KEY (`inside_uid`) REFERENCES `insides` (`uid`),
  ADD CONSTRAINT `fk_outside_uid` FOREIGN KEY (`outside_uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `institutions`
--
ALTER TABLE `institutions`
  ADD CONSTRAINT `fk_institutions_tier_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`),
  ADD CONSTRAINT `fk_institutions_type_institution_uid` FOREIGN KEY (`type_uid`) REFERENCES `types_institutions` (`uid`);

--
-- Contraintes pour la table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk_items_category_uid` FOREIGN KEY (`category_uid`) REFERENCES `categories` (`uid`),
  ADD CONSTRAINT `fk_items_famille_uid` FOREIGN KEY (`family_uid`) REFERENCES `familles` (`uid`),
  ADD CONSTRAINT `fk_items_unite_mesure_uid` FOREIGN KEY (`unite_mesure_uid`) REFERENCES `unites_mesure` (`uid`);

--
-- Contraintes pour la table `magasins`
--
ALTER TABLE `magasins`
  ADD CONSTRAINT `fk_magasins_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `mes_banques`
--
ALTER TABLE `mes_banques`
  ADD CONSTRAINT `fk_mes_banques_banques_uid` FOREIGN KEY (`banque_uid`) REFERENCES `banques` (`uid`),
  ADD CONSTRAINT `fk_mes_banques_treso_uid` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`);

--
-- Contraintes pour la table `movements`
--
ALTER TABLE `movements`
  ADD CONSTRAINT `fk_movements_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `mvts_bank`
--
ALTER TABLE `mvts_bank`
  ADD CONSTRAINT `fk_mvts_bank_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  ADD CONSTRAINT `fk_mvts_bank_ma_banque_uid` FOREIGN KEY (`ma_banque_uid`) REFERENCES `mes_banques` (`uid`),
  ADD CONSTRAINT `fk_mvts_bank_mode_pmt_uid` FOREIGN KEY (`mode_uid`) REFERENCES `mode_pmt_bank` (`uid`);

--
-- Contraintes pour la table `mvts_caisse`
--
ALTER TABLE `mvts_caisse`
  ADD CONSTRAINT `fk_mvts_caisse_caisse_uid` FOREIGN KEY (`caisse_uid`) REFERENCES `caisses` (`uid`),
  ADD CONSTRAINT `fk_mvts_caisse_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  ADD CONSTRAINT `fk_mvts_caisse_tier_uid` FOREIGN KEY (`porteur_uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `mvts_credit_client`
--
ALTER TABLE `mvts_credit_client`
  ADD CONSTRAINT `fk_mvts_credit_client_credit_uid` FOREIGN KEY (`treso_uid`) REFERENCES `credits` (`uid`),
  ADD CONSTRAINT `fk_mvts_credit_client_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`);

--
-- Contraintes pour la table `mvts_credit_fournisseur`
--
ALTER TABLE `mvts_credit_fournisseur`
  ADD CONSTRAINT `fk_mvts_credit_fournisseur_credit_uid` FOREIGN KEY (`treso_uid`) REFERENCES `credits` (`uid`),
  ADD CONSTRAINT `fk_mvts_credit_fournisseur_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`);

--
-- Contraintes pour la table `mvts_internes`
--
ALTER TABLE `mvts_internes`
  ADD CONSTRAINT `fk_mvts_internes_destination_uid` FOREIGN KEY (`destination_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_mvts_internes_origine_uid` FOREIGN KEY (`origin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_mvts_internes_outsides_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `mvts_mobile_money`
--
ALTER TABLE `mvts_mobile_money`
  ADD CONSTRAINT `fk_mvts_mobile_money_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  ADD CONSTRAINT `fk_mvts_mobile_money_operateur_uid` FOREIGN KEY (`operateur_uid`) REFERENCES `operateurs` (`uid`);

--
-- Contraintes pour la table `mvts_wallet_electronic`
--
ALTER TABLE `mvts_wallet_electronic`
  ADD CONSTRAINT `fk_mvts_wallet_electronic_inside_uid` FOREIGN KEY (`uid`) REFERENCES `insides` (`uid`),
  ADD CONSTRAINT `fk_mvts_wallet_electronic_wallet_electronic_uid` FOREIGN KEY (`wallet_electronic_uid`) REFERENCES `wallets_electonic` (`uid`);

--
-- Contraintes pour la table `nd_client`
--
ALTER TABLE `nd_client`
  ADD CONSTRAINT `fk_nd_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  ADD CONSTRAINT `fk_nd_commercial_uid` FOREIGN KEY (`commercial_uid`) REFERENCES `employees` (`uid`),
  ADD CONSTRAINT `fk_nd_outside_uid` FOREIGN KEY (`outside_uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `outsides`
--
ALTER TABLE `outsides`
  ADD CONSTRAINT `fk_outsides_types` FOREIGN KEY (`type_uid`) REFERENCES `types_outsides` (`uid`);

--
-- Contraintes pour la table `params`
--
ALTER TABLE `params`
  ADD CONSTRAINT `fk_params_devise_uid` FOREIGN KEY (`devise_int`) REFERENCES `devises` (`uid`),
  ADD CONSTRAINT `fk_params_tier_uid` FOREIGN KEY (`tiers_uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `smie`
--
ALTER TABLE `smie`
  ADD CONSTRAINT `fk_smie_institutions_uid` FOREIGN KEY (`uid`) REFERENCES `institutions` (`uid`);

--
-- Contraintes pour la table `tiers`
--
ALTER TABLE `tiers`
  ADD CONSTRAINT `fk_tiers_type_personality_uid` FOREIGN KEY (`type_personnality_uid`) REFERENCES `types_personality` (`uid`);

--
-- Contraintes pour la table `transferts_internes`
--
ALTER TABLE `transferts_internes`
  ADD CONSTRAINT `fk_transferts_internes_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`),
  ADD CONSTRAINT `fk_transferts_internes_treso_destination_uid` FOREIGN KEY (`destination_uid`) REFERENCES `tresos` (`uid`),
  ADD CONSTRAINT `fk_transferts_internes_treso_source_uid` FOREIGN KEY (`source_uid`) REFERENCES `tresos` (`uid`);

--
-- Contraintes pour la table `tresos`
--
ALTER TABLE `tresos`
  ADD CONSTRAINT `fkt_tresos_type_devise_uid` FOREIGN KEY (`devise_uid`) REFERENCES `devises` (`uid`),
  ADD CONSTRAINT `fkt_tresos_type_treso_uid` FOREIGN KEY (`type_treso_uid`) REFERENCES `types_treso` (`uid`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_tiers_uid` FOREIGN KEY (`uid`) REFERENCES `tiers` (`uid`);

--
-- Contraintes pour la table `wallets_electonic`
--
ALTER TABLE `wallets_electonic`
  ADD CONSTRAINT `tk_wallets_electronic_treso_uid` FOREIGN KEY (`uid`) REFERENCES `tresos` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
