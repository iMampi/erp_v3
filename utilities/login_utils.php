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

function generate_logged_header($name, ?string $tag_id = null)
{
    $txt = "<h4>Bienvenue $name</h4>";
    $base = $_SERVER["DOCUMENT_ROOT"] . "/elements/header.html";
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
    $name_container = $dom->getElementById("title-container");
    $new_el = $dom->createElement("small");
    $text = $dom->createTextNode("Bonjour $name");
    $new_el->setAttribute("class", "text-capitalize");
    $new_el->appendChild($text);
    $name_container->appendChild($new_el);

    if ($tag_id) {
        $link = $dom->getElementById($tag_id);
        $classes = $link->getAttribute("class");
        $classes .= " active";
        $link->setAttribute("class", $classes);
    }
    return utf8_decode($dom->saveHTML($dom->documentElement));
}
