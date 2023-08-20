<?php


$base = __DIR__ . "/../elements/modals/buttons_modal_footer_facture_client.html";
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
    if ((in_array($btn->getAttribute("id"), ["btn-payment", "btn-create-avoir"])) && (!$_SESSION["user"]->authorizations->facture_client->update)) {
        // if(true){
        $btn->parentNode->removeChild($btn);
    }
}

// echo "buttons bom";
echo utf8_decode($dom->saveHTML($dom->documentElement));
