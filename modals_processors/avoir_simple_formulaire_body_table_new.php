<?php
// TODO grab role of user
// TODO : authorization
$base = __DIR__ . "/../elements/avoirs_clt/avoir_clt_based_table_details_base.html";

$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXPath($dom);


// // disable all input
// $inputs = $xpath->query(".//*[contains(@class,'input')]");
// foreach ($inputs as $input_) {
//     $input_->setAttribute("disabled", true);
// }

//remove item row
$row_001 = $dom->getElementById("row-001");
$row_001->parentNode->removeChild($row_001);

// disable all btn
$buttons = $xpath->query(".//button");
foreach ($buttons as $button_) {
    $button_->setAttribute("disabled", true);
}
// echo utf8_decode($dom->saveHTML($dom->documentElement));
echo $dom->saveHTML($dom->documentElement->childNodes[1]);
