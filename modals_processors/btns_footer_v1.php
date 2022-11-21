<?php


$base = __DIR__ . "/../elements/modals/btns_modal_footer_v1.html";
$dom = new DOMDocument();

//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXPath($dom);

// print_r($_SESSION);
// print_r($_SESSION["user"]->authorizations);
$btns = $xpath->query(".//*[contains(@class,'btn')]");
//it works
//TODO : include algo for what btns appears or not according to roles
foreach ($btns as $btn) {
    if (($btn->getAttribute("id") == "modify") && (!$_SESSION["user"]->authorizations->client->update)) {
        $btn->setAttribute("disabled", '');
    } else if (($btn->getAttribute("id") == "delete") && (!$_SESSION["user"]->authorizations->client->update)) {
        $btn->setAttribute("disabled", '');
    };
}


echo utf8_decode($dom->saveHTML($dom->documentElement));
