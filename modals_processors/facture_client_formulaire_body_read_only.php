<?php  
// TODO grab role of user
$base = __DIR__ . "/../elements/facts_clt/facture_clt_header_base.html";

$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXPath($dom);

$inputs = $xpath->query(".//*[contains(@class,'input')]");

foreach ($inputs as $input) {
    $input->setAttribute("disabled", '');
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
?>