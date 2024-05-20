<?php

namespace Session;

use Authorizations\UserAuthorizations;

require_once __DIR__ . "/../../vendor/autoload.php";

function is_logged()
{
    // FIXME : double usage. get rid of "logged" and just use "user"-> active
    // if ((!isset($_SESSION["logged"])) || ($_SESSION["logged"] != "logged")) {
    if ((!isset($_SESSION["logged"]))
        || (!isset($_SESSION["user"]))
        || ($_SESSION["user"]->authorizations->active != 1)
    ) {
        $dir = __DIR__;
        header("Location: {$dir}/../../index.php");
        exit;
    }
}

function can_visit($cycle)
{
    if ((!isset($_SESSION["logged"])) || (!isset($_SESSION["user"])) || ($_SESSION["user"]->authorizations->$cycle->read != 1)) {
        return \false;
    }
    return \true;
}

function can_create($cycle)
{
    if ((!isset($_SESSION["logged"])) || (!isset($_SESSION["user"])) || ($_SESSION["user"]->authorizations->$cycle->create != 1)) {
        return \false;
    }
    return \true;
}

function can_update($cycle)
{
    // TODO refactor
    if ((!isset($_SESSION["logged"])) || (!isset($_SESSION["user"])) || ($_SESSION["user"]->authorizations->$cycle->update != 1)) {
        return \false;
    }
    return \true;
}
function can_delete($cycle)
{
    // TODO refactor
    if ((!isset($_SESSION["logged"])) || (!isset($_SESSION["user"])) || ($_SESSION["user"]->authorizations->$cycle->delete != 1)) {
        return \false;
    }
    return \true;
}
