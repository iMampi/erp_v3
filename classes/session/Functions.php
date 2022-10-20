<?php

namespace Session;



function is_logged()
{
    // FIXME : double usage. get rid of "logged" and just use "user"-> active
    // if ((!isset($_SESSION["logged"])) || ($_SESSION["logged"] != "logged")) {
    if ((!isset($_SESSION["logged"]))
        || (!isset($_SESSION["user"]))
        || ($_SESSION["user"]->authorizations->active != 1)
    ) {

        $host  = $_SERVER['HTTP_HOST'];
        header("Location: http://$host/index.php");
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
