-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 15 mai 2023 à 20:39
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
-- Base de données : `erpv2`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `all_clients` ()   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `all_clients_active_only` ()   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `all_clients_name` ()   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `all_fournisseurs` ()   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `all_fournisseurs_name` ()   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `new_client` (OUT `myuid` INT, IN `type_personnality_uid` INT, IN `adress` VARCHAR(45), IN `nif` VARCHAR(45), IN `stat` VARCHAR(45), IN `rcs` VARCHAR(12), IN `phone1` VARCHAR(15), IN `phone2` VARCHAR(15), IN `mail1` VARCHAR(45), IN `mail2` VARCHAR(45), IN `active_` TINYINT, IN `note` TINYTEXT, IN `nom_commercial` VARCHAR(45), IN `raison_social` VARCHAR(45), IN `noms` VARCHAR(45), IN `prenoms` VARCHAR(45), IN `cin` VARCHAR(12), IN `cin_date` DATE, IN `cin_lieu` VARCHAR(45), IN `naissance_date` DATE, IN `naissance_lieu` VARCHAR(45), IN `type_vente` TINYINT, IN `encours` DOUBLE(14,2), IN `nb_jour` INT, IN `evaluation` TINYINT, IN `declarable` TINYINT, IN `commissionable` TINYINT)   BEGIN

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
    

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `new_tiers` (OUT `myuid` INT, IN `type_personnality_uid` INT, IN `adress` VARCHAR(45), IN `nif` VARCHAR(45), IN `stat` VARCHAR(45), IN `rcs` VARCHAR(12), IN `phone1` VARCHAR(15), IN `phone2` VARCHAR(15), IN `mail1` VARCHAR(45), IN `mail2` VARCHAR(45), IN `active_` TINYINT, IN `note` TINYTEXT, IN `nom_commercial` VARCHAR(45), IN `raison_social` VARCHAR(45), IN `noms` VARCHAR(45), IN `prenoms` VARCHAR(45), IN `cin` VARCHAR(12), IN `cin_date` DATE, IN `cin_lieu` VARCHAR(45), IN `naissance_date` DATE, IN `naissance_lieu` VARCHAR(45))   BEGIN
	insert into `tiers` values(null,type_personnality_uid,adress,nif,stat,rcs,phone1,phone2,mail1,mail2,active_,note);
    set @myuid=last_insert_id();
    #select @final;
    case type_personnality_uid
    when 1 then
    insert into `humans` values( myuid,noms,prenoms,cin,cin_date,cin_lieu,naissance_date,naissance_lieu);
    when 2 then
    insert into `companies` values(myuid,nom_commercial,raison_social);
    end case;
    

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `one_client_details` (IN `myuid` INT)   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `one_fournisseur_details` (IN `myuid` INT)   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `testclient1` (IN `my_uid` INT, IN `my_type_personnality_uid` INT, IN `my_adress` VARCHAR(45), IN `my_nif` VARCHAR(45), IN `my_stat` VARCHAR(45), IN `my_rcs` VARCHAR(12), IN `my_phone1` VARCHAR(15), IN `my_phone2` VARCHAR(15), IN `my_mail1` VARCHAR(45), IN `my_mail2` VARCHAR(45), IN `my_active_` TINYINT, IN `my_note` TINYTEXT, IN `my_nom_commercial` VARCHAR(45), IN `my_raison_sociale` VARCHAR(45), IN `my_noms` VARCHAR(45), IN `my_prenoms` VARCHAR(45), IN `my_cin` VARCHAR(12), IN `my_cin_date` DATE, IN `my_cin_lieu` VARCHAR(45), IN `my_naissance_date` DATE, IN `my_naissance_lieu` VARCHAR(45), IN `my_type_vente` TINYINT, IN `my_encours` DOUBLE(14,2), IN `my_nb_jour` INT, IN `my_evaluation` TINYINT, IN `my_declarable` TINYINT, IN `my_commissionable` TINYINT)   BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `testclient2` (IN `my_uid` INT, IN `my_type_personnality_uid` INT, IN `my_adress` VARCHAR(45), IN `my_nif` VARCHAR(45), IN `my_stat` VARCHAR(45), IN `my_rcs` VARCHAR(12), IN `my_phone1` VARCHAR(15), IN `my_phone2` VARCHAR(15), IN `my_mail1` VARCHAR(45), IN `my_mail2` VARCHAR(45), IN `my_active_` TINYINT, IN `my_note` TINYTEXT, IN `my_nom_commercial` VARCHAR(45), IN `my_raison_sociale` VARCHAR(45), IN `my_noms` VARCHAR(45), IN `my_prenoms` VARCHAR(45), IN `my_cin` VARCHAR(12), IN `my_cin_date` DATE, IN `my_cin_lieu` VARCHAR(45), IN `my_naissance_date` DATE, IN `my_naissance_lieu` VARCHAR(45), IN `my_type_vente` TINYINT, IN `my_encours` DOUBLE(14,2), IN `my_nb_jour` INT, IN `my_evaluation` TINYINT, IN `my_declarable` TINYINT, IN `my_commissionable` TINYINT)   BEGIN
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
    
    
    
END$$

--
-- Fonctions
--
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

CREATE DEFINER=`root`@`localhost` FUNCTION `new_commande` (`myclientuid` INT, `mydate` DATE, `mymagasin_uid` INT, `mylibelle` VARCHAR(45), `mystate` TINYINT UNSIGNED, `myuser_uid` INT, `mytotalhtavantremise` DOUBLE(14,2) UNSIGNED, `mytotalttcavantremise` DOUBLE(14,2) UNSIGNED, `myremisetaux` DOUBLE(14,2) UNSIGNED, `myremisemontant` DOUBLE(14,2) UNSIGNED, `mytotalhtapresremise` DOUBLE(14,2) UNSIGNED, `mytotalttcapresremise` DOUBLE(14,2) UNSIGNED) RETURNS INT(11) DETERMINISTIC BEGIN
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

CREATE DEFINER=`root`@`localhost` FUNCTION `new_item` (`myuid` INT UNSIGNED, `mycode` VARCHAR(20) CHARSET utf8mb4, `myname` VARCHAR(45) CHARSET utf8mb4, `mytype` TINYINT UNSIGNED, `mydeclarable` TINYINT UNSIGNED, `mycategoryuid` TINYINT UNSIGNED, `myfamilyuid` TINYINT UNSIGNED, `mypv` DOUBLE(14,2) UNSIGNED, `mypamp` DOUBLE(14,2), `mystockable` TINYINT UNSIGNED, `myidentifiable` TINYINT UNSIGNED, `myuniteuid` INT UNSIGNED, `myactive` TINYINT UNSIGNED, `mynote` TINYTEXT CHARSET utf8mb4) RETURNS INT(10) UNSIGNED DETERMINISTIC BEGIN
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
mynote
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
-- Structure de la table `avoir_client`
--

CREATE TABLE `avoir_client` (
  `num_avoir` int(4) UNSIGNED ZEROFILL NOT NULL,
  `outside_uid` int(10) UNSIGNED NOT NULL,
  `client_uid` int(10) UNSIGNED NOT NULL,
  `facture_client_uid` int(10) UNSIGNED NOT NULL,
  `event` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0 null\n1 credit\n2 remb',
  `state` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0 to credit\n1 credited'
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
(8, 'test001', 1),
(9, 'test002', 1);

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
(58, 0, 0.00, 0, 2, 1, 0, 1);

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
  `state` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
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
(8, 7, '2023-04-23', 1, NULL, 1, 1, '2023-04-23 17:35:36', 446.00, 535.00, 0.97, 5200.00, 0.00, 0.00),
(9, 7, '2023-04-23', 1, NULL, 1, 1, '2023-04-23 17:36:24', 396.00, 475.00, 0.97, 4609.44, 0.00, 0.00),
(14, 7, '2023-04-23', 1, 'test 100', 1, 1, '2023-04-23 18:30:36', 693.00, 831.00, 0.97, 8066.52, 0.00, 0.00),
(15, 7, '2023-04-23', 1, 'test 101 all', 1, 1, '2023-04-23 18:34:32', 718.00, 861.00, 5.00, 43080.00, 0.00, 0.00),
(16, 13, '2023-04-23', 1, 'test 103 all', 1, 1, '2023-04-23 18:39:38', 718.00, 861.00, 5.00, 43080.00, 0.00, 0.00),
(20, 13, '2023-04-23', 1, 'test 106 all', 1, 1, '2023-04-23 18:56:21', 396.00, 475.00, 5.00, 23790.00, 0.00, 0.00),
(21, 17, '2023-04-24', 1, 'test update', 1, 1, '2023-04-24 18:53:31', 100.00, 120.00, 10.00, 12000.00, 0.00, 0.00),
(22, 17, '2023-04-24', 1, 'update 2', 1, 1, '2023-04-24 18:55:00', 495.00, 594.00, 12.00, 71280.00, 435.00, 522.00),
(23, 55, '2023-04-24', 1, 'rerere', 1, 1, '2023-04-24 19:04:38', 125.00, 150.00, 0.00, 0.00, 125.00, 150.00),
(24, 31, '2023-04-24', 1, 'update up', 1, 1, '2023-04-24 19:14:42', 198.00, 237.00, 5.00, 11880.00, 188.00, 225.00),
(25, 41, '2023-04-24', 1, 'soso', 1, 1, '2023-04-24 19:20:29', 175.00, 210.00, 50.00, 105000.00, 87.00, 105.00),
(26, 41, '2023-04-24', 1, 'so2', 1, 1, '2023-04-24 19:22:34', 50.00, 60.00, 0.00, 0.00, 50.00, 60.00),
(27, 40, '2023-05-01', 1, 're', 1, 1, '2023-05-01 11:33:08', 990.00, 1.00, 15.82, 188000.00, 833.00, 1.00),
(28, 40, '2023-05-01', 1, 'rere', 1, 1, '2023-05-01 11:33:48', 693.00, 831.00, 0.00, 0.00, 693.00, 831.00),
(29, 41, '2023-05-01', 1, 'tree', 1, 1, '2023-05-01 11:34:33', 396.00, 475.00, 0.00, 0.00, 396.00, 475.00),
(30, 11, '2023-05-01', 1, 'yy', 1, 1, '2023-05-01 11:36:46', 224.00, 268.00, 0.00, 0.00, 224.00, 268.00),
(31, 11, '2023-05-01', 1, 'reer', 1, 1, '2023-05-01 11:38:07', 125.00, 150.00, 0.00, 0.00, 125.00, 150.00),
(32, 40, '2023-05-01', 1, 'sdf', 1, 1, '2023-05-01 11:39:55', 198.00, 237.00, 0.00, 0.00, 198.00, 237.00);

-- --------------------------------------------------------

--
-- Structure de la table `commandes_details`
--

CREATE TABLE `commandes_details` (
  `uid` int(10) UNSIGNED NOT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `item_uid` varchar(20) NOT NULL,
  `description_item` tinytext DEFAULT NULL,
  `quantity` double(14,2) UNSIGNED NOT NULL,
  `prix_unitaire` double(14,2) UNSIGNED NOT NULL,
  `prix_total` double(14,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commandes_details`
--

INSERT INTO `commandes_details` (`uid`, `commande_uid`, `item_uid`, `description_item`, `quantity`, `prix_unitaire`, `prix_total`) VALUES
(9, 16, 'vet056', NULL, 50.00, 10000.00, 500000.00),
(11, 20, 'vet056', 'test 106 all', 4.00, 99.00, 396.00),
(12, 20, 'styetisth459', 'test 106 all', 1.00, 500.00, 500.00),
(13, 21, '0654ste8', '', 4.00, 25.00, 100.00),
(14, 22, 'vet056', '', 5.00, 99.00, 495.00),
(15, 23, '0654ste8', 'reste', 5.00, 25.00, 125.00),
(16, 24, 'vet056', 'upup', 2.00, 99.00, 198.00),
(17, 25, '0654ste8', 'sophie', 7.00, 25.00, 175.00),
(18, 26, '0654ste8', 'soso', 2.00, 25.00, 50.00),
(19, 27, 'vet056', '', 10.00, 99.00, 990.00),
(20, 28, 'vet056', 'reer', 7.00, 99.00, 693.00),
(21, 29, 'vet056', 'tree', 4.00, 99.00, 396.00),
(22, 30, '0654ste8', 'yy', 5.00, 25.00, 125.00),
(23, 30, 'vet056', 'yyy', 1.00, 99.00, 99.00),
(24, 31, '0654ste8', 'gzertt', 5.00, 25.00, 125.00),
(25, 32, 'vet056', 'sdf', 2.00, 99.00, 198.00);

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `uid` int(10) UNSIGNED NOT NULL,
  `nom_commercial` varchar(45) NOT NULL,
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
(73, 'harasaka', 'arasaka ltd');

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
  `uid` int(10) UNSIGNED NOT NULL,
  `client_uid` int(10) UNSIGNED NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `commande_uid` int(10) UNSIGNED NOT NULL,
  `commercial_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `factures_fournisseur`
--

CREATE TABLE `factures_fournisseur` (
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
(3, 'inconnus', 1),
(4, 'boisson', 1),
(5, 'vetement', 1),
(7, 'test001', 1),
(8, 'test002', 1);

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
(64, 0.00, 2, 0, 1, 1),
(65, 0.00, 2, 0, 1, 1),
(66, 0.00, 2, 0, 1, 1),
(67, 0.00, 2, 0, 1, 1),
(68, 0.00, 2, 0, 1, 1),
(69, 0.00, 2, 0, 1, 1),
(70, 0.00, 2, 0, 1, 1),
(71, 0.00, 2, 0, 1, 1),
(72, 0.00, 2, 0, 1, 1),
(73, 0.00, 2, 0, 1, 1);

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
(72, 'rembalaya', ' ishin', '12130', '2022-03-30', '', '2009-01-05', '');

-- --------------------------------------------------------

--
-- Structure de la table `identifiables`
--

CREATE TABLE `identifiables` (
  `num_serie` varchar(45) NOT NULL,
  `item_uid` int(10) UNSIGNED NOT NULL,
  `in_outside_uid` int(10) UNSIGNED NOT NULL,
  `out_outside_uid` int(10) UNSIGNED DEFAULT NULL,
  `in_stock` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `magasin_uid` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `note` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `items`
--

INSERT INTO `items` (`uid`, `code`, `name`, `type_item`, `declarable`, `category_uid`, `family_uid`, `prix_vente`, `prix_achat_mp`, `stockable`, `identifiable`, `unite_mesure_uid`, `active`, `note`) VALUES
(3, '0654ste8', 'jean lacoste', 1, 1, 3, 5, 25000.00, 0.00, 1, 0, 1, 1, NULL),
(2, 'styetisth459', 'yaourt 50g', 1, 1, 3, 2, 500.00, 0.00, 1, 0, 1, 1, 'le prix est monté'),
(4, 'vet056', 'chocolat ferrero rocher 250g', 1, 1, 6, 2, 99000.00, 0.00, 1, 0, 1, 1, 'cher pour rien');

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
(2, 'antaninarenina', 'somewhere in antaninarenina', '26545', 1, NULL, 1, '2023-04-22 10:48:37');

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
(56, 2, '', '', '', '', '', '', '', '', 1, ''),
(57, 2, '', '', '', '', '', '', '', '', 1, ''),
(58, 2, '', '', '', '', '', '', '', '', 1, ''),
(59, 2, 'mada', '', '', '', '', '', '', '', 1, ''),
(60, 2, 'ss', '', '', '', '', '', '', '', 1, ''),
(61, 2, 'somewher only they know', '', '', '', '', '', '', '', 1, ''),
(62, 2, 'andresfan', '', '', '', '', '', '', '', 1, ''),
(63, 2, '', '', '', '', '', '', '', '', 1, ''),
(64, 2, '', '', '', '', '', '', '', '', 1, ''),
(65, 2, '', '', '', '', '', '', '', '', 1, ''),
(66, 2, '', '', '', '', '', '', '', '', 1, ''),
(67, 2, '', '', '', '', '', '', '', '', 1, ''),
(68, 2, '', '', '', '', '', '', '', '', 1, ''),
(69, 2, '', '', '', '', '', '', '', '', 1, ''),
(70, 1, '', '', '', '', '', '', '', '', 1, ''),
(71, 1, '', '', '', '', '', '', '', '', 1, ''),
(72, 1, '', '', '', '', '', '', '', '', 1, ''),
(73, 2, '', '', '', '', '', '', '', '', 1, '');

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
(1, 'mampi', '123456', 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0),
(2, 'user1', '123456', 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

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
,`CODE` varchar(20)
,`active` tinyint(4)
,`declarable` tinyint(3) unsigned
,`NAME` varchar(45)
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
-- Structure de la vue `view_all_clients`
--
DROP TABLE IF EXISTS `view_all_clients`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_clients`  AS SELECT `sub`.`uid` AS `uid`, `sub`.`type_personnality_uid` AS `type_personnality_uid`, `sub`.`adress` AS `adress`, `sub`.`nif` AS `nif`, `sub`.`stat` AS `stat`, `sub`.`rcs` AS `rcs`, `sub`.`phone1` AS `phone1`, `sub`.`phone2` AS `phone2`, `sub`.`mail1` AS `mail1`, `sub`.`mail2` AS `mail2`, `sub`.`active_tiers` AS `active_tiers`, `sub`.`note` AS `note`, `sub`.`type_vente` AS `type_vente`, `sub`.`encours` AS `encours`, `sub`.`nb_jour` AS `nb_jour`, `sub`.`evaluation` AS `evaluation`, `sub`.`declarable` AS `declarable`, `sub`.`commissionable` AS `commissionable`, `sub`.`noms` AS `noms`, `sub`.`prenoms` AS `prenoms`, `sub`.`cin` AS `cin`, `sub`.`cin_date` AS `cin_date`, `sub`.`cin_lieu` AS `cin_lieu`, `sub`.`naissance_date` AS `naissance_date`, `sub`.`naissance_lieu` AS `naissance_lieu`, `sub`.`nom_commercial` AS `nom_commercial`, `sub`.`raison_sociale` AS `raison_sociale`, `sub`.`active_client` AS `active_client` FROM (select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`clients`.`type_vente` AS `type_vente`,`clients`.`encours` AS `encours`,`clients`.`nb_jour` AS `nb_jour`,`clients`.`evaluation` AS `evaluation`,`clients`.`declarable` AS `declarable`,`clients`.`commissionable` AS `commissionable`,`humans`.`noms` AS `noms`,`humans`.`prenoms` AS `prenoms`,`humans`.`cin` AS `cin`,`humans`.`cin_date` AS `cin_date`,`humans`.`cin_lieu` AS `cin_lieu`,`humans`.`naissance_date` AS `naissance_date`,`humans`.`naissance_lieu` AS `naissance_lieu`,'' AS `nom_commercial`,'' AS `raison_sociale`,`clients`.`active_client` AS `active_client` from ((`tiers` join `humans` on(`tiers`.`uid` = `humans`.`uid`)) join `clients` on(`tiers`.`uid` = `clients`.`uid`)) union select `tiers`.`uid` AS `uid`,`tiers`.`type_personnality_uid` AS `type_personnality_uid`,`tiers`.`adress` AS `adress`,`tiers`.`nif` AS `nif`,`tiers`.`stat` AS `stat`,`tiers`.`rcs` AS `rcs`,`tiers`.`phone1` AS `phone1`,`tiers`.`phone2` AS `phone2`,`tiers`.`mail1` AS `mail1`,`tiers`.`mail2` AS `mail2`,`tiers`.`active_tiers` AS `active_tiers`,`tiers`.`note` AS `note`,`clients`.`type_vente` AS `type_vente`,`clients`.`encours` AS `encours`,`clients`.`nb_jour` AS `nb_jour`,`clients`.`evaluation` AS `evaluation`,`clients`.`declarable` AS `declarable`,`clients`.`commissionable` AS `commissionable`,'' AS `noms`,'' AS `prenoms`,'' AS `cin`,'' AS `cin_date`,'' AS `cin_lieu`,'' AS `naissance_date`,'' AS `naissance_lieu`,`companies`.`nom_commercial` AS `nom_commercial`,`companies`.`raison_sociale` AS `raison_sociale`,`clients`.`active_client` AS `active_client` from ((`tiers` join `companies` on(`tiers`.`uid` = `companies`.`uid`)) join `clients` on(`tiers`.`uid` = `clients`.`uid`))) AS `sub` ORDER BY `sub`.`uid` ASC ;

-- --------------------------------------------------------

--
-- Structure de la vue `view_all_commandes_headers`
--
DROP TABLE IF EXISTS `view_all_commandes_headers`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_commandes_headers`  AS SELECT `commandes`.`uid` AS `uid`, `commandes`.`client_uid` AS `client_uid`, `commandes`.`date` AS `date`, `commandes`.`magasin_uid` AS `magasin_uid`, `commandes`.`libelle` AS `libelle`, `commandes`.`state` AS `state`, `commandes`.`user_uid` AS `user_uid`, `users`.`login` AS `user_name`, `commandes`.`datetime` AS `datetime`, `commandes`.`total_ht_avant_remise` AS `total_ht_avant_remise`, `commandes`.`total_ttc_avant_remise` AS `total_ttc_avant_remise`, `commandes`.`remise_taux` AS `remise_taux`, `commandes`.`remise_montant` AS `remise_montant`, `commandes`.`total_ht_apres_remise` AS `total_ht_apres_remise`, `commandes`.`total_ttc_apres_remise` AS `total_ttc_apres_remise`, `view_all_clients`.`noms` AS `noms`, `view_all_clients`.`prenoms` AS `prenoms`, `view_all_clients`.`nom_commercial` AS `nom_commercial`, `view_all_clients`.`raison_sociale` AS `raison_sociale`, `magasins`.`name` AS `magasin_name` FROM (((`commandes` join `view_all_clients` on(`view_all_clients`.`uid` = `commandes`.`uid`)) join `magasins` on(`magasins`.`uid` = `commandes`.`magasin_uid`)) join `users` on(`users`.`uid` = `commandes`.`user_uid`)) ;

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

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_all_items`  AS SELECT `items`.`uid` AS `uid`, `items`.`code` AS `CODE`, `items`.`active` AS `active`, `items`.`declarable` AS `declarable`, `items`.`name` AS `NAME`, `items`.`type_item` AS `type_item`, `items`.`family_uid` AS `famille_uid`, `familles`.`name` AS `famille`, `items`.`category_uid` AS `categorie_uid`, `categories`.`name` AS `categorie`, `items`.`unite_mesure_uid` AS `unite_mesure_uid`, `items`.`stockable` AS `stockable`, `items`.`identifiable` AS `identifiable`, `items`.`prix_vente` AS `prix_vente`, `items`.`prix_achat_mp` AS `prix_achat_mp`, `items`.`note` AS `note` FROM ((`items` join `familles` on(`familles`.`uid` = `items`.`family_uid`)) join `categories` on(`categories`.`uid` = `items`.`category_uid`)) ;

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
-- Index pour la table `avoir_client`
--
ALTER TABLE `avoir_client`
  ADD PRIMARY KEY (`num_avoir`),
  ADD KEY `fk_avoir_client_client_uid_idx` (`client_uid`),
  ADD KEY `fk_avoir_client_outside_uid_idx` (`outside_uid`),
  ADD KEY `fk_avoir_client_facture_client_uid_idx` (`facture_client_uid`);

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
  ADD KEY `fk_commandes_magasin_uid` (`magasin_uid`);

--
-- Index pour la table `commandes_details`
--
ALTER TABLE `commandes_details`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `fk_commandes_details_commande_uid_idx` (`commande_uid`),
  ADD KEY `fk_commandes_details_item_code` (`item_uid`);

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
  ADD KEY `fk_factures_client_outside_uid_idx` (`uid`),
  ADD KEY `fk_factures_client_client_uid_idx` (`client_uid`),
  ADD KEY `fk_factures_client_commande_uid_idx` (`commande_uid`),
  ADD KEY `fk_factures_client_commercial_uid_idx` (`commercial_uid`);

--
-- Index pour la table `factures_fournisseur`
--
ALTER TABLE `factures_fournisseur`
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
  ADD PRIMARY KEY (`num_serie`,`item_uid`,`in_outside_uid`),
  ADD KEY `fk_identifiables_item_uid_idx` (`item_uid`),
  ADD KEY `fk_identifiables_in_outside_uid_idx` (`in_outside_uid`),
  ADD KEY `fk_identifiables_out_outside_uid_idx` (`out_outside_uid`),
  ADD KEY `fk_identifiables_magasin_uid_idx` (`magasin_uid`);

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
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `commandes_details`
--
ALTER TABLE `commandes_details`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
  MODIFY `num_facture` int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `familles`
--
ALTER TABLE `familles`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `magasins`
--
ALTER TABLE `magasins`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

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
  ADD CONSTRAINT `fk_affectations_achat_facture_fournisseur_uid` FOREIGN KEY (`facture_fournisseur_uid`) REFERENCES `factures_fournisseur` (`uid`);

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
-- Contraintes pour la table `avoir_client`
--
ALTER TABLE `avoir_client`
  ADD CONSTRAINT `fk_avoir_client_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  ADD CONSTRAINT `fk_avoir_client_facture_client_uid` FOREIGN KEY (`facture_client_uid`) REFERENCES `factures_client` (`num_facture`),
  ADD CONSTRAINT `fk_avoir_client_outside_uid` FOREIGN KEY (`outside_uid`) REFERENCES `outsides` (`uid`);

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
  ADD CONSTRAINT `fk_commandes_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_commandes_user_uid` FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

--
-- Contraintes pour la table `commandes_details`
--
ALTER TABLE `commandes_details`
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
  ADD CONSTRAINT `fk_factures_client_client_uid` FOREIGN KEY (`client_uid`) REFERENCES `clients` (`uid`),
  ADD CONSTRAINT `fk_factures_client_commande_uid` FOREIGN KEY (`commande_uid`) REFERENCES `commandes` (`uid`),
  ADD CONSTRAINT `fk_factures_client_commercial_uid` FOREIGN KEY (`commercial_uid`) REFERENCES `employees` (`uid`),
  ADD CONSTRAINT `fk_factures_client_outside_uid` FOREIGN KEY (`uid`) REFERENCES `outsides` (`uid`);

--
-- Contraintes pour la table `factures_fournisseur`
--
ALTER TABLE `factures_fournisseur`
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
  ADD CONSTRAINT `fk_identifiables_in_outside_uid` FOREIGN KEY (`in_outside_uid`) REFERENCES `outsides` (`uid`),
  ADD CONSTRAINT `fk_identifiables_item_uid` FOREIGN KEY (`item_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_identifiables_magasin_uid` FOREIGN KEY (`magasin_uid`) REFERENCES `magasins` (`uid`),
  ADD CONSTRAINT `fk_identifiables_out_outside_uid` FOREIGN KEY (`out_outside_uid`) REFERENCES `outsides` (`uid`);

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
