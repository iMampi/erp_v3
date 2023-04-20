<?php
// TODO grab role of user
$base = __DIR__ . "/../elements/tiers/fournisseurs/fournisseur_formulaire_base.html";

$dom = new DOMDocument("1.0", "utf-8");
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXPath($dom);

$inputs = $xpath->query(".//*[contains(@class,'input')]");

foreach ($inputs as $input) {
    $input->setAttribute("disabled", '');
}

$btn_save = $xpath->query(".//*[@class='btn-save')]");
// $btn_save->setAttribute("disabled", '');
// echo "<br>";
// echo "TEST";
// echo "<br>";

// echo utf8_decode($dom->saveHTML($dom->documentElement));
echo $dom->saveHTML($dom->documentElement);
