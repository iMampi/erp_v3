<?php


$base = __DIR__ . "/../elements/modals/btns_modal_footer_view_commande.html";
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
    if ((in_array($btn->getAttribute("id"), ["btn-modify", "btn-save", "btn-validate"])) && (!$_SESSION["user"]->authorizations->commande->update)) {
        // if(true){
        $btn->parentNode->removeChild($btn);
    }
}

// echo "buttons bom";
echo utf8_decode($dom->saveHTML($dom->documentElement));
