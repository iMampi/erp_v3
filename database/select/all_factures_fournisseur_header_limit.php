<?php

use Database\Queries;
use Database\DbHandler;

new DbHandler();

$Query = new Queries("select_all_factures_fournisseur_header_limit");
$all_factures_fournisseur_header_limit = DbHandler::select_query($Query->query, MYSQLI_ASSOC);
//return $all_commandes_header_limit;
