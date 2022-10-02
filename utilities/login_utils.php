<?php
function Destroysession()
{
    $_SESSION = array();

    if (session_id() != "" || isset($_COOKIE[session_name()])) {
        setcookie(session_name(), "", time() - 2592000, "/");

        session_destroy();
    }
    return false;
}
